from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from . import models, serializers

class InitialReview(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user

        following = user.following.values_list('id', flat = True)

        reviews = models.Review.objects.all()

        new_reviews = reviews.order_by('-time')[:5]
        recommended_reviews = reviews.filter(recommended = True)[:5]
        following_reviews = reviews.filter(author__id__in = following)

        return Response(status = status.HTTP_200_OK, data = {
            'status': 'ok',
            'new_reviews': serializers.ReviewSerializer(new_reviews, many = True, context = {'request': request}).data,
            'recommended_reviews': serializers.ReviewSerializer(recommended_reviews, many = True, context = {'request': request}).data,
            'following_reviews': serializers.ReviewSerializer(following_reviews, many = True, context = {'request': request}).data,
        })
