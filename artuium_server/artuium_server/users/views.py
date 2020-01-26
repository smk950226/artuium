from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.db.models import Q
from allauth.socialaccount.providers.kakao.views import KakaoOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from fcm_django.fcm import fcm_send_message

import jwt
import requests
from datetime import timedelta
from django.conf import settings
from django.utils import timezone


from . import models, serializers
from artuium_server.statics import models as statics_models
from artuium_server.statics import serializers as statics_serializers
from artuium_server.artwork import models as artwork_models
from artuium_server.artwork import serializers as artwork_serializers
from artuium_server.exhibition import models as exhibition_models
from artuium_server.exhibition import serializers as exhibition_serializers
from artuium_server.common.pagination import MainPageNumberPagination

User = get_user_model()

class Follow(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        user = request.user

        user_id = request.data.get('userId', None)
        if user_id:
            try:
                follow_user = User.objects.get(id = user_id)
                blocking_user = statics_models.Blocking.objects.filter(user = user, to_user = follow_user)
                if blocking_user.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '숨김한 회원입니다.'})
                else:
                    follow = statics_models.Follow.objects.filter(following = user, follower = follow_user)
                    if follow.count() > 0:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 팔로잉하는 회원입니다.'})
                    else:
                        follow = statics_models.Follow.objects.create(following = user, follower = follow_user)
                        follow.save()

                        if user.id != follow_user.id:
                            notification = statics_models.Notification.objects.create(
                                from_user = user,
                                to_user = follow_user,
                                type = 'following'
                            )
                            notification.save()
                            if follow_user.push_token:
                                text = ''
                                text += user.nickname
                                text += ' 님이 회원님을 팔로우합니다.'
                                fcm_send_message(registration_id = follow_user.push_token, title='팔로우 알림', body=text, android_channel_id = 'artuium', icon='ic_notification')
                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '회원이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '회원을 선택해주세요.'})
    
    def delete(self, request, format = None):
        user = request.user

        user_id = request.data.get('userId', None)
        if user_id:
            try:
                follow_user = User.objects.get(id = user_id)
                follow = statics_models.Follow.objects.filter(following = user, follower = follow_user)
                if follow.count() > 0:
                    follow.delete()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                else:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '팔로잉하지 않는 회원입니다.'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '회원이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '회원을 선택해주세요.'})


class Search(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        q = request.query_params.get('q', None)
        if q:
            q_artwork_name = Q(name__icontains = q)
            q_artwork_author_name = Q(author__name__icontains = q)
            q_artwork_material = Q(material__icontains = q)

            q_exhibition_name = Q(name__icontains = q)
            q_exhibition_content = Q(content__icontains = q)
            q_exhibition_region = Q(gallery__region__name__icontains = q)
            q_exhibition_address = Q(gallery__address__icontains = q)
            q_exhibition_scale = Q(gallery__scale__icontains = q)
            q_exhibition_gallery_name = Q(gallery__name__icontains = q)
            q_exhibition_gallery_location = Q(gallery__location__icontains = q)
            q_exhibition_artist_name = Q(artists__name__icontains = q)
            q_exhibition_artwork_name = Q(artworks__name__icontains = q)

            artworks = artwork_models.Artwork.objects.filter(q_artwork_name | q_artwork_author_name | q_artwork_material).distinct()[:10]
            exhibitions = exhibition_models.Exhibition.objects.filter(q_exhibition_name | q_exhibition_content | q_exhibition_region | q_exhibition_address | q_exhibition_scale | q_exhibition_gallery_name | q_exhibition_gallery_location | q_exhibition_artist_name | q_exhibition_artwork_name).distinct()[:10]

            artwork_serializer = artwork_serializers.ArtworkSerializer(artworks, many = True, context = {'request': request})
            exhibition_serializer = exhibition_serializers.ExhibitionSerializer(exhibitions, many = True, context = {'request': request})

            return Response(status = status.HTTP_200_OK, data = {
                'artworks': artwork_serializer.data,
                'exhibitions': exhibition_serializer.data
            })
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)


class Recommended(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user
        blocking_review = statics_models.Blocking.objects.filter(user = user, review__isnull = False).values_list('review__id', flat = True)
        blocking_user = statics_models.Blocking.objects.filter(user = user, to_user__isnull = False).values_list('to_user__id', flat = True)

        recommended_reviews = statics_models.Review.objects.filter(Q(recommended = True) & Q(deleted = False) & ~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')
        artwork_list = recommended_reviews.filter(artwork__isnull = False)
        exhibition_list = recommended_reviews.filter(exhibition__isnull = False)
        user_list = User.objects.filter(Q(recommended = True) & ~Q(id__in = blocking_user))[:5]

        return Response(status = status.HTTP_200_OK, data = {
            'users': serializers.ProfileSerializer(user_list, many = True, context = {'request': request}).data,
            'artworks': statics_serializers.ReviewSerializer(artwork_list, many  = True, context = {'request': request}).data,
            'exhibitions': statics_serializers.ReviewSerializer(exhibition_list, many = True, context = {'request': request}).data
        })


class Profile(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, foramt = None):
        user = request.user
        serializer = serializers.ProfileSerializer(user, context = {'request': request})
        return Response(status = status.HTTP_200_OK, data = serializer.data)


class CheckEmail(APIView):
    def get(self, request, format = None):
        email = request.query_params.get('email', None)
        if email:
            if User.objects.filter(Q(email = email) | Q(username = email)).count() > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 사용중인 이메일입니다.'})
            else:
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이메일을 입력하세요.'})

class CheckNickname(APIView):
    def get(self, request, format = None):
        nickname = request.query_params.get('nickname')
        if nickname:
            if len(User.objects.filter(nickname = nickname)) > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 사용중인 닉네임입니다.'})
            else:
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '닉네임을 입력하세요.'})


class CheckUsername(APIView):
    def get(self, request, format = None):
        username = request.query_params.get('username')
        if username:
            if len(User.objects.filter(username = username)) > 0:
                return Response(status = status.HTTP_200_OK, data = {'type': 'login'})
            else:
                return Response(status = status.HTTP_200_OK, data = {'type': 'signup'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'type': 'error'})
            

class ReviewList(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, user_id, format = None):
        user = request.user
        blocking_review = statics_models.Blocking.objects.filter(user = user, review__isnull = False).values_list('review__id', flat = True)
        blocking_user = statics_models.Blocking.objects.filter(user = user, to_user__isnull = False).values_list('to_user__id', flat = True)

        reviews = statics_models.Review.objects.filter(Q(author__id = user_id) & Q(deleted = False) & ~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')
        paginator = MainPageNumberPagination()
        result_page = paginator.paginate_queryset(reviews, request)
        serializer = statics_serializers.ReviewSerializer(result_page, many = True, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)

class ChangeProfileImg(APIView):
    def put(self, request, format = None):
        profile_image = request.data.get('profileImg', None)

        user = request.user
        user.profile_image = profile_image

        user.save()

        serializer = serializers.ProfileSerializer(user, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)

class ChangeBackgroundImg(APIView):
    def put(self, request, format = None):
        background_image = request.data.get('backgroundImg', None)

        user = request.user
        user.background_image = background_image

        user.save()

        serializer = serializers.ProfileSerializer(user, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)

class ChangeNickname(APIView):
    def put(self, request, format = None):
        nickname = request.data.get('nickname', None)

        user = request.user
        user.nickname = nickname

        user.save()

        serializer = serializers.ProfileSerializer(user, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)

class ChangeProfile(APIView):
    def put(self, request, format = None):
        nickname = request.data.get('nickname', None)
        background_image = request.data.get('backgroundImg', None)
        profile_image = request.data.get('profileImg', None)

        user = request.user
        user.nickname = nickname
        if background_image:
            user.background_image = background_image
        if profile_image:
            user.profile_image = profile_image
        user.save()

        serializer = serializers.ProfileSerializer(user, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)

class AddInfo(APIView):
    def put(self, request, format = None):
        profile_image = request.data.get('profileImg', None)
        nickname = request.data.get('nickname', None)

        user = request.user
        user.profile_image = profile_image
        user.nickname = nickname

        user.save()

        serializer = serializers.ProfileSerializer(user, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)


class PushToken(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        user = request.user
        push_token = request.data.get('pushToken', None)
        user.push_token = push_token
        user.save()
        return Response(status = status.HTTP_200_OK)


class Initial(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, format = None):
        user = request.user
        initial = request.data.get('initial', None)
        user.initial = initial
        user.save()
        return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})


class KakaoLogin(SocialLoginView):
    adapter_class = KakaoOAuth2Adapter

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
