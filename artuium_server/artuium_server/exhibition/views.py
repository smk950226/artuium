from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.db.models import Q
import datetime

from . import models, serializers
from artuium_server.common.pagination import MainPageNumberPagination
from artuium_server.users import serializers as users_serializers
from artuium_server.artwork import models as artwork_models

User = get_user_model()

class InitialExhibition(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user

        now = timezone.localtime()
        today = datetime.date(now.year, now.month, now.day)

        exhibitions = models.Exhibition.objects.all().order_by('index')

        new_exhibitions = exhibitions.filter(open_date__lte = today).order_by('-open_date')[:5]
        recommended_exhibitions = exhibitions.filter(recommended = True)[:5]
        hot_exhibitions = sorted(exhibitions, key=lambda t: t.like_count + t.review_count, reverse=True)

        views = models.ExhibitionView.objects.filter(user = user).order_by('-viewed_at').values_list('exhibition', flat = True)[:5]
        past_exhibitions = models.Exhibition.objects.filter(id__in = views).order_by('index')
        # past_exhibitions = exhibitions.filter(close_date__lte = today)[:5]

        return Response(status = status.HTTP_200_OK, data = {
            'status': 'ok',
            'new_exhibitions': serializers.ExhibitionSerializer(new_exhibitions, many = True, context = {'request': request}).data,
            'recommended_exhibitions': serializers.ExhibitionSerializer(recommended_exhibitions, many = True, context = {'request': request}).data,
            'hot_exhibitions': serializers.ExhibitionSerializer(hot_exhibitions, many = True, context = {'request': request}).data,
            'past_exhibitions': serializers.ExhibitionSerializer(past_exhibitions, many = True, context = {'request': request}).data,
        })


class Exhibition(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        list_type = request.query_params.get('type', None)
        filter_type = request.query_params.get('filter', None)
        period = request.query_params.get('period', None)
        scale = request.query_params.get('scale', None)
        region = request.query_params.get('region', None)
        user = request.user

        now = timezone.localtime()
        today = datetime.date(now.year, now.month, now.day)

        exhibitions = []

        if list_type:
            if list_type == 'all':
                exhibitions = models.Exhibition.objects.all().order_by('index')
            else:
                exhibitions = models.Exhibition.objects.all().order_by('index')
        else:
            exhibitions = models.Exhibition.objects.all().order_by('index')
        
        if period:
            if period == 'past':
                exhibitions = exhibitions.filter(close_date__lte = today)
            elif period == 'now':
                exhibitions = exhibitions.filter(open_date__lte = today, close_date__gte = today)
            elif period == 'upcomming':
                exhibitions = exhibitions.filter(open_date__gt = today)
        
        if scale:
            if scale == '중대형':
                exhibitions = exhibitions.filter(gallery__scale = '중대형')
            elif scale == '소형':
                exhibitions = exhibitions.filter(gallery__scale = '소형')
        
        if region:
            if region != 'else':
                region_list = region.split('/')
                q_regions = Q()
                for region in region_list:
                    q_regions |= Q(gallery__region__name__contains = region)
                
                exhibitions = exhibitions.filter(q_regions)


        if filter_type:
            if filter_type == 'new':
                exhibitions = exhibitions.order_by('-open_date')
            elif filter_type == 'like':
                exhibitions = sorted(exhibitions, key=lambda t: t.like_count, reverse=True)
            elif filter_type == 'comment':
                exhibitions = sorted(exhibitions, key=lambda t: t.review_count, reverse=True)
            elif filter_type == 'rate':
                exhibitions = sorted(exhibitions, key=lambda t: t.total_rate, reverse=True)
            else:
                exhibitions = exhibitions.order_by('-open_date')
        else:
            exhibitions = exhibitions.order_by('-open_date')
        
        paginator = MainPageNumberPagination()
        result_page = paginator.paginate_queryset(exhibitions, request)
        serializer = serializers.ExhibitionSerializer(result_page, many = True, context = {'request': request})

        return Response(status = status.HTTP_200_OK, data = serializer.data)


class ExhibitionDetailByArtwork(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        artwork_id = request.query_params.get('artworkId', None)
        if artwork_id:
            try:
                artwork = artwork_models.Artwork.objects.get(id = artwork_id)
                try:
                    exhibition = artwork.exhibitions.order_by('-open_date').first()
                    if exhibition:
                        serializer = serializers.ExhibitionSerializer(exhibition, context = {'request': request})
                        return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'exhibition': serializer.data})
                    else:
                        return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})
                except:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})


class ExhibitionView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, format = None):
        exhibition_id = request.data.get('exhibitionId', None)
        user = request.user
        if exhibition_id:
            try:
                exhibition = models.Exhibition.objects.get(id = exhibition_id)
                pre = models.ExhibitionView.objects.filter(user = user, exhibition = exhibition)
                if pre.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
                else:
                    view = models.ExhibitionView.objects.create(user = user, exhibition = exhibition)
                    view.save()
                    return Response(status = status.HTTP_200_OK)
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시가 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})