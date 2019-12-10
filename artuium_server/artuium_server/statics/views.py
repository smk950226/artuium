from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

from . import models, serializers
from artuium_server.common.pagination import MainPageNumberPagination
from artuium_server.users import serializers as users_serializers
from artuium_server.exhibition import models as exhibition_models

User = get_user_model()

class InitialReview(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user

        following = models.Follow.objects.filter(following = user).values_list('follower__id', flat = True)

        reviews = models.Review.objects.all()

        new_reviews = reviews.order_by('-time')[:5]
        recommended_reviews = reviews.filter(recommended = True)[:5]
        following_reviews = reviews.filter(author__id__in = following)[:5]

        return Response(status = status.HTTP_200_OK, data = {
            'status': 'ok',
            'new_reviews': serializers.ReviewSerializer(new_reviews, many = True, context = {'request': request}).data,
            'recommended_reviews': serializers.ReviewSerializer(recommended_reviews, many = True, context = {'request': request}).data,
            'following_reviews': serializers.ReviewSerializer(following_reviews, many = True, context = {'request': request}).data,
        })


class Review(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        list_type = request.query_params.get('type', None)
        filter_type = request.query_params.get('filter', None)
        user = request.user

        reviews = []

        if list_type:
            if list_type == 'all':
                reviews = models.Review.objects.all()
            elif list_type == 'recommended':
                reviews = models.Review.objects.filter(recommended = True)
            elif list_type == 'friend':
                following = models.Follow.objects.filter(following = user).values_list('follower__id', flat = True)
                reviews = models.Review.objects.filter(author__id__in = following)
            else:
                reviews = models.Review.objects.all()
        else:
            reviews = models.Review.objects.all()

        if filter_type:
            if filter_type == 'new':
                reviews = reviews.order_by('-time')
            elif filter_type == 'like':
                reviews = sorted(reviews, key=lambda t: t.like_count, reverse=True)
            elif filter_type == 'comment':
                reviews = sorted(reviews, key=lambda t: t.reply_count, reverse=True)
            elif filter_type == 'rate':
                reviews = reviews.order_by('-rate')
            else:
                reviews = reviews.order_by('-time')
        else:
            reviews = reviews.order_by('-time')
        
        paginator = MainPageNumberPagination()
        result_page = paginator.paginate_queryset(reviews, request)
        serializer = serializers.ReviewSerializer(result_page, many = True, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)


class Notice(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user
        notice = models.Notice.objects.all().order_by('-date')
        if notice.count() > 0:
            notice_check = models.NoticeCheck.objects.filter(user = user)
            if notice_check.count() == notice.count():
                paginator = MainPageNumberPagination()
                result_page = paginator.paginate_queryset(notice, request)
                serializer = serializers.NoticeSerializer(result_page, many = True, context = {'request': request})

                return Response(status = status.HTTP_200_OK, data = {'is_new': False, 'notice': serializer.data})
            else:
                paginator = MainPageNumberPagination()
                result_page = paginator.paginate_queryset(notice, request)
                serializer = serializers.NoticeSerializer(result_page, many = True, context = {'request': request})

                return Response(status = status.HTTP_200_OK, data = {'is_new': True, 'notice': serializer.data})
        else:
            paginator = MainPageNumberPagination()
            result_page = paginator.paginate_queryset(notice, request)
            serializer = serializers.NoticeSerializer(result_page, many = True, context = {'request': request})

            return Response(status = status.HTTP_200_OK, data = {'is_new': False, 'notice': serializer.data})


class NoticeCheck(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user
        notice_check = models.NoticeCheck.objects.filter(user = user).count()
        notice = models.Notice.objects.all().count()

        if notice_check == notice:
            return Response(status = status.HTTP_200_OK, data = {'is_new': False})
        else:
            return Response(status = status.HTTP_200_OK, data = {'is_new': True})

    def post(self, request, format = None):
        user = request.user
        notice_id = request.data.get('noticeId', None)
        
        try:
            notice = models.Notice.objects.get(id = notice_id)
            pre = models.NoticeCheck.objects.filter(user = user, notice = notice)
            if pre.count() > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
            else:
                notice_check = models.NoticeCheck.objects.create(user = user, notice = notice)
                notice_check.save()
                if models.Notice.objects.all().count() == models.NoticeCheck.objects.filter(user = user).count():
                    return Response(status = status.HTTP_201_CREATED)
                else:
                    return Response(status = status.HTTP_200_OK)
        except:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)


class Follower(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user_id = request.query_params.get('userId', None)
        if user_id:
            try:
                user = User.objects.get(id = user_id)
                following = models.Follow.objects.filter(follower = user).values_list('following__id', flat = True)
                user_list = User.objects.filter(id__in = following)

                paginator = MainPageNumberPagination()
                result_page = paginator.paginate_queryset(user_list, request)
                serializer = users_serializers.ProfileSerializer(result_page, many = True, context = {'request': request})

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'user_list': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '회원이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '회원을 선택해주세요.'})


class Following(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user_id = request.query_params.get('userId', None)
        if user_id:
            try:
                user = User.objects.get(id = user_id)
                follower = models.Follow.objects.filter(following = user).values_list('follower__id', flat = True)
                user_list = User.objects.filter(id__in = follower)

                paginator = MainPageNumberPagination()
                result_page = paginator.paginate_queryset(user_list, request)
                serializer = users_serializers.ProfileSerializer(result_page, many = True, context = {'request': request})

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'user_list': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '회원이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '회원을 선택해주세요.'})


class LikeReview(APIView):
    permission_classes = [IsAuthenticated]
    def post(self ,request, format = None):
        review_id = request.data.get('reviewId', None)
        user = request.user
        if review_id:
            try:
                review = models.Review.objects.get(id = review_id)
                pre = models.Like.objects.filter(user = user, review = review)
                if pre.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 좋아하는 감상입니다.'})
                else:
                    like = models.Like.objects.create(user = user, review = review)
                    like.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상을 선택해주세요.'})
    
    def delete(self ,request, format = None):
        review_id = request.data.get('reviewId', None)
        user = request.user
        if review_id:
            try:
                review = models.Review.objects.get(id = review_id)
                pre = models.Like.objects.filter(user = user, review = review)
                if pre.count() == 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '좋아하는 감상이 아닙니다.'})
                else:
                    pre.delete()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상을 선택해주세요.'})


class LikeExhibition(APIView):
    permission_classes = [IsAuthenticated]
    def post(self ,request, format = None):
        exhibition_id = request.data.get('exhibitionId', None)
        user = request.user
        if exhibition_id:
            try:
                exhibition = exhibition_models.Exhibition.objects.get(id = exhibition_id)
                pre = models.Like.objects.filter(user = user, exhibition = exhibition)
                if pre.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 좋아하는 전시입니다.'})
                else:
                    like = models.Like.objects.create(user = user, exhibition = exhibition)
                    like.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시가 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시를 선택해주세요.'})
    
    def delete(self ,request, format = None):
        exhibition_id = request.data.get('exhibitionId', None)
        user = request.user
        if exhibition_id:
            try:
                exhibition = exhibition_models.Exhibition.objects.get(id = exhibition_id)
                pre = models.Like.objects.filter(user = user, exhibition = exhibition)
                if pre.count() == 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '좋아하는 전시가 아닙니다.'})
                else:
                    pre.delete()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시가 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시를 선택해주세요.'})