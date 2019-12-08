from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from . import models, serializers
from artuium_server.common.pagination import MainPageNumberPagination

class InitialReview(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user

        following = user.following.values_list('id', flat = True)

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
        notice = models.Notice.objects.all().order_by('-date')

        paginator = MainPageNumberPagination()
        result_page = paginator.paginate_queryset(notice, request)
        serializer = serializers.NoticeSerializer(result_page, many = True, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)


class NoticeCheck(APIView):
    permission_classes = [IsAuthenticated]
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
                return Response(status = status.HTTP_200_OK)
        except:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)