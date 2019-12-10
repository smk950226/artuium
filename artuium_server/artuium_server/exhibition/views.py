from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.utils import timezone
import datetime

from . import models, serializers
from artuium_server.common.pagination import MainPageNumberPagination
from artuium_server.users import serializers as users_serializers

User = get_user_model()

class InitialExhibition(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user

        now = timezone.localtime()
        today = datetime.date(now.year, now.month, now.day)

        exhibitions = models.Exhibition.objects.all()

        new_exhibitions = exhibitions.filter(open_date__lte = today).order_by('-open_date')[:5]
        recommended_exhibitions = exhibitions.filter(recommended = True)[:5]
        hot_exhibitions = sorted(exhibitions, key=lambda t: t.like_count + t.review_count, reverse=True)
        past_exhibitions = exhibitions.filter(close_date__lte = today)[:5]

        return Response(status = status.HTTP_200_OK, data = {
            'status': 'ok',
            'new_exhibitions': serializers.ExhibitionSerializer(new_exhibitions, many = True, context = {'request': request}).data,
            'recommended_exhibitions': serializers.ExhibitionSerializer(recommended_exhibitions, many = True, context = {'request': request}).data,
            'hot_exhibitions': serializers.ExhibitionSerializer(hot_exhibitions, many = True, context = {'request': request}).data,
            'past_exhibitions': serializers.ExhibitionSerializer(past_exhibitions, many = True, context = {'request': request}).data,
        })