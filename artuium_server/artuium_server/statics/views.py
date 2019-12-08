from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

from . import models, serializers
from artuium_server.common.pagination import MainPageNumberPagination
from artuium_server.users import serializers as users_serializers

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