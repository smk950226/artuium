from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.db.models import Q
from fcm_django.fcm import fcm_send_message

from . import models, serializers
from artuium_server.common.pagination import MainPageNumberPagination
from artuium_server.users import serializers as users_serializers
from artuium_server.exhibition import models as exhibition_models
from artuium_server.exhibition import serializers as exhibition_serializers
from artuium_server.artwork import models as artwork_models
from artuium_server.artwork import serializers as artwork_serializers

User = get_user_model()

class InitialReview(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user

        following = models.Follow.objects.filter(following = user).values_list('follower__id', flat = True)
        blocking_review = models.Blocking.objects.filter(user = user, review__isnull = False).values_list('review__id', flat = True)
        blocking_user = models.Blocking.objects.filter(user = user, to_user__isnull = False).values_list('to_user__id', flat = True)

        reviews = models.Review.objects.filter(Q(deleted = False) & ~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')

        new_reviews = reviews.order_by('-time')[:5]
        recommended_reviews = reviews.filter(recommended = True).order_by('index')[:5]
        following_reviews = reviews.filter(author__id__in = following).order_by('index')[:5]

        banners = models.Notice.objects.filter(is_banner = True).order_by('index')

        return Response(status = status.HTTP_200_OK, data = {
            'status': 'ok',
            'new_reviews': serializers.ReviewSerializer(new_reviews, many = True, context = {'request': request}).data,
            'recommended_reviews': serializers.ReviewSerializer(recommended_reviews, many = True, context = {'request': request}).data,
            'following_reviews': serializers.ReviewSerializer(following_reviews, many = True, context = {'request': request}).data,
            'banners': serializers.NoticeSerializer(banners, many = True, context = {'request': request}).data
        })


class RecommendedReview(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user

        following = models.Follow.objects.filter(following = user).values_list('follower__id', flat = True)
        blocking_review = models.Blocking.objects.filter(user = user, review__isnull = False).values_list('review__id', flat = True)
        blocking_user = models.Blocking.objects.filter(user = user, to_user__isnull = False).values_list('to_user__id', flat = True)

        reviews = models.Review.objects.filter(Q(deleted = False) & ~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')

        new_reviews = reviews.order_by('-time')[:5]
        recommended_reviews = reviews.filter(recommended = True).order_by('index')[:5]
        following_reviews = reviews.filter(author__id__in = following).order_by('index')[:5]


        return Response(status = status.HTTP_200_OK, data = {
            'status': 'ok',
            'new_reviews': serializers.ReviewSerializer(new_reviews, many = True, context = {'request': request}).data,
            'recommended_reviews': serializers.ReviewSerializer(recommended_reviews, many = True, context = {'request': request}).data,
            'following_reviews': serializers.ReviewSerializer(following_reviews, many = True, context = {'request': request}).data,
        })


class NewReview(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user

        following = models.Follow.objects.filter(following = user).values_list('follower__id', flat = True)
        blocking_review = models.Blocking.objects.filter(user = user, review__isnull = False).values_list('review__id', flat = True)
        blocking_user = models.Blocking.objects.filter(user = user, to_user__isnull = False).values_list('to_user__id', flat = True)

        reviews = models.Review.objects.filter(Q(deleted = False) & ~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')

        new_reviews = reviews.order_by('-time')[:5]
        recommended_reviews = reviews.filter(recommended = True).order_by('index')[:5]
        following_reviews = reviews.filter(author__id__in = following).order_by('index')[:5]


        return Response(status = status.HTTP_200_OK, data = {
            'status': 'ok',
            'new_reviews': serializers.ReviewSerializer(new_reviews, many = True, context = {'request': request}).data,
            'recommended_reviews': serializers.ReviewSerializer(recommended_reviews, many = True, context = {'request': request}).data,
            'following_reviews': serializers.ReviewSerializer(following_reviews, many = True, context = {'request': request}).data,
        })



class FollowingReview(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user

        following = models.Follow.objects.filter(following = user).values_list('follower__id', flat = True)
        blocking_review = models.Blocking.objects.filter(user = user, review__isnull = False).values_list('review__id', flat = True)
        blocking_user = models.Blocking.objects.filter(user = user, to_user__isnull = False).values_list('to_user__id', flat = True)

        reviews = models.Review.objects.filter(Q(deleted = False) & ~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')

        new_reviews = reviews.order_by('-time')[:5]
        recommended_reviews = reviews.filter(recommended = True).order_by('index')[:5]
        following_reviews = reviews.filter(author__id__in = following).order_by('index')[:5]


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
        blocking_review = models.Blocking.objects.filter(user = user, review__isnull = False).values_list('review__id', flat = True)
        blocking_user = models.Blocking.objects.filter(user = user, to_user__isnull = False).values_list('to_user__id', flat = True)

        reviews = []

        if list_type:
            if list_type == 'all':
                reviews = models.Review.objects.filter(Q(deleted = False) & ~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')
            elif list_type == 'recommended':
                reviews = models.Review.objects.filter(Q(deleted = False) & Q(recommended = True) & ~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')
            elif list_type == 'friend':
                following = models.Follow.objects.filter(following = user).values_list('follower__id', flat = True)
                reviews = models.Review.objects.filter(Q(author__id__in = following) & Q(deleted = False) & ~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')
            elif list_type == 'exhibition':
                reviews = models.Review.objects.filter(Q(exhibition__isnull = False) & Q(deleted = False) & ~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')
            else:
                reviews = models.Review.objects.filter(Q(deleted = False) & ~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')
        else:
            reviews = models.Review.objects.all(Q(deleted = False) & ~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')

        if filter_type:
            if filter_type == 'new':
                reviews = reviews.order_by('-time')
            elif filter_type == 'like':
                reviews = sorted(reviews, key=lambda t: t.like_count, reverse=True)
            elif filter_type == 'comment':
                reviews = sorted(reviews, key=lambda t: t.reply_count, reverse=True)
            elif filter_type == 'rate':
                reviews = reviews.order_by('-rate')
        
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
            after_notice = models.Notice.objects.filter(date__gte = user.date_joined).order_by('-date')
            if notice_check.count() == after_notice.count():
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
        notice = models.Notice.objects.filter(date__gte = user.date_joined).count()

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
                if models.Notice.objects.filter(date__gte = user.date_joined).count() == models.NoticeCheck.objects.filter(user = user).count():
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
    def get(self, request, user_id, format = None):
        likes = models.Like.objects.filter(user = user_id, review__isnull = False)
        paginator = MainPageNumberPagination()
        result_page = paginator.paginate_queryset(likes, request)
        serializer = serializers.LikeSerializer(result_page, many = True, context = {'request': request})
        return Response(status = status.HTTP_200_OK, data = serializer.data)


class LikeReviewOnly(APIView):
    permission_classes = [IsAuthenticated]
    def post(self ,request, format = None):
        review_id = request.data.get('reviewId', None)
        user = request.user
        if review_id:
            try:
                review = models.Review.objects.get(id = review_id, deleted = False)
                pre = models.Like.objects.filter(user = user, review = review)
                if pre.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 좋아하는 감상입니다.'})
                else:
                    like = models.Like.objects.create(user = user, review = review)
                    like.save()
                    if user.id != review.author.id:
                        notification = models.Notification.objects.create(
                            from_user = user,
                            to_user = review.author,
                            type = 'like_review',
                            review = review
                        )
                        notification.save()
                        if review.author.push_token:

                            text = ''
                            text += user.nickname
                            text += ' 님이 회원님의 '
                            if review.artwork:
                                text += "'" + review.artwork.name + "'"
                            elif review.exhibition:
                                text += "'" + review.exhibition.name + "'" + '전시 '
                            text += '감상을 좋아합니다.'
                            fcm_send_message(registration_id = review.author.push_token, title='좋아요 알림', body=text, android_channel_id = 'artuium', icon='ic_notification')

                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상을 선택해주세요.'})
    
    def delete(self, request, format = None):
        review_id = request.data.get('reviewId', None)
        user = request.user
        if review_id:
            try:
                review = models.Review.objects.get(id = review_id, deleted = False)
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
    def get(self, request, user_id, format = None):
        user = request.user
        likes = models.Like.objects.filter(user = user_id, exhibition__isnull = False)
        paginator = MainPageNumberPagination()
        result_page = paginator.paginate_queryset(likes, request)
        serializer = serializers.LikeSerializer(result_page, many = True, context = {'request': request})
        return Response(status = status.HTTP_200_OK, data = serializer.data)


class LikeExhibitionOnly(APIView):
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


class LikeArtwork(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, user_id, format = None):
        likes = models.Like.objects.filter(user = user_id, artwork__isnull = False)
        paginator = MainPageNumberPagination()
        result_page = paginator.paginate_queryset(likes, request)
        serializer = serializers.LikeSerializer(result_page, many = True, context = {'request': request})
        return Response(status = status.HTTP_200_OK, data = serializer.data)


class LikeArtworkOnly(APIView):
    permission_classes = [IsAuthenticated]
    def post(self ,request, format = None):
        artwork_id = request.data.get('artworkId', None)
        user = request.user
        if artwork_id:
            try:
                artwork = artwork_models.Artwork.objects.get(id = artwork_id)
                pre = models.Like.objects.filter(user = user, artwork = artwork)
                if pre.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 좋아하는 아트워크입니다.'})
                else:
                    like = models.Like.objects.create(user = user, artwork = artwork)
                    like.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시가 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시를 선택해주세요.'})
    
    def delete(self ,request, format = None):
        artwork_id = request.data.get('artworkId', None)
        user = request.user
        if artwork_id:
            try:
                artwork = artwork_models.Artwork.objects.get(id = artwork_id)
                pre = models.Like.objects.filter(user = user, artwork = artwork)
                if pre.count() == 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '좋아하는 아트워크가 아닙니다.'})
                else:
                    pre.delete()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시가 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시를 선택해주세요.'})


class ExhibitionReview(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        exhibition_id = request.query_params.get('exhibitionId', None)
        page = request.query_params.get('page', None)
        filter_type = request.query_params.get('filter', None)
        user = request.user
        blocking_review = models.Blocking.objects.filter(user = user, review__isnull = False).values_list('review__id', flat = True)
        blocking_user = models.Blocking.objects.filter(user = user, to_user__isnull = False).values_list('to_user__id', flat = True)

        if exhibition_id:
            try:
                exhibition = exhibition_models.Exhibition.objects.get(id = exhibition_id)
                reviews = exhibition.reviews.filter(~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')
                reviews_count = exhibition.reviews.all().order_by('index')

                if filter_type:
                    if filter_type == 'new':
                        reviews = reviews.order_by('-time')
                    elif filter_type == 'like':
                        reviews = sorted(reviews, key=lambda t: t.like_count, reverse=True)
                    elif filter_type == 'comment':
                        reviews = sorted(reviews, key=lambda t: t.reply_count, reverse=True)
                    elif filter_type == 'rate':
                        reviews = reviews.order_by('-rate')

                paginator = MainPageNumberPagination()
                result_page = paginator.paginate_queryset(reviews, request)
                serializer = serializers.ReviewSerializer(result_page, many = True, context = {'request': request})

                if page == '1':
                    my_review = exhibition.reviews.filter(author = request.user).order_by('index')
                    if reviews_count.count() > 0:
                        thumb = reviews_count.filter(expression = 'thumb').count()/reviews_count.count()
                        good = reviews_count.filter(expression = 'good').count()/reviews_count.count()
                        soso = reviews_count.filter(expression = 'soso').count()/reviews_count.count()
                        sad = reviews_count.filter(expression = 'sad').count()/reviews_count.count()
                        surprise = reviews_count.filter(expression = 'surprise').count()/reviews_count.count()

                        return Response(status = status.HTTP_200_OK, data = {
                            'status': 'ok', 
                            'reviews': serializer.data, 
                            'my_review': serializers.ReviewSerializer(my_review, many = True, context = {'request': request}).data,
                            'thumb': thumb,
                            'good': good,
                            'soso': soso,
                            'sad': sad,
                            'surprise': surprise
                        })
                    else:
                        return Response(status = status.HTTP_200_OK, data = {
                            'status': 'ok', 
                            'reviews': serializer.data, 
                            'my_review': serializers.ReviewSerializer(my_review, many = True, context = {'request': request}).data,
                            'thumb': 0,
                            'good': 0,
                            'soso': 0,
                            'sad': 0,
                            'surprise': 0
                        })
                else:
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'reviews': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시가 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시를 선택해주세요.'})
    
    def post(self, request, format = None):
        exhibition_id = request.data.get('exhibitionId', None)
        rate = request.data.get('rating', None)
        expression = request.data.get('expression', None)
        content = request.data.get('content', None)
        user = request.user
        if exhibition_id and (rate or expression or content):
            try:
                exhibition = exhibition_models.Exhibition.objects.get(id = exhibition_id)
                review = models.Review.objects.create(author = user, exhibition = exhibition, rate = rate, content = content, expression = expression)
                review.save()
                serializer = serializers.ReviewSerializer(review, context = {'request': request})
                exhibition = exhibition_models.Exhibition.objects.get(id = exhibition_id)
                total_rate = exhibition.total_rate
                reviews = exhibition.reviews
                if reviews.count() > 0:
                    thumb = reviews.filter(expression = 'thumb').count()/reviews.count()
                    good = reviews.filter(expression = 'good').count()/reviews.count()
                    soso = reviews.filter(expression = 'soso').count()/reviews.count()
                    sad = reviews.filter(expression = 'sad').count()/reviews.count()
                    surprise = reviews.filter(expression = 'surprise').count()/reviews.count()

                    return Response(status = status.HTTP_200_OK, data = {
                        'status': 'ok', 
                        'review': serializer.data,
                        'thumb': thumb,
                        'good': good,
                        'soso': soso,
                        'sad': sad,
                        'surprise': surprise,
                        'total_rate': total_rate
                    })
                else:
                    return Response(status = status.HTTP_200_OK, data = {
                        'status': 'ok', 
                        'review': serializer.data,
                        'thumb': 0,
                        'good': 0,
                        'soso': 0,
                        'sad': 0,
                        'surprise': 0,
                        'total_rate': total_rate
                    })
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시가 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시를 선택해주세요.'})
    
    def put(self, request, format = None):
        review_id = request.data.get('reviewId', None)
        exhibition_id = request.data.get('exhibitionId', None)
        rate = request.data.get('rating', None)
        expression = request.data.get('expression', None)
        content = request.data.get('content', None)
        user = request.user
        if review_id and exhibition_id and (rate or expression or content):
            try:
                review = models.Review.objects.get(id = review_id)
                review.rate = rate
                review.expression = expression
                review.content = content
                review.save()
                serializer = serializers.ReviewSerializer(review, context = {'request': request})
                exhibition = exhibition_models.Exhibition.objects.get(id = exhibition_id)
                total_rate = exhibition.total_rate
                reviews = exhibition.reviews
                if reviews.count() > 0:
                    thumb = reviews.filter(expression = 'thumb').count()/reviews.count()
                    good = reviews.filter(expression = 'good').count()/reviews.count()
                    soso = reviews.filter(expression = 'soso').count()/reviews.count()
                    sad = reviews.filter(expression = 'sad').count()/reviews.count()
                    surprise = reviews.filter(expression = 'surprise').count()/reviews.count()

                    return Response(status = status.HTTP_200_OK, data = {
                        'status': 'ok', 
                        'review': serializer.data,
                        'thumb': thumb,
                        'good': good,
                        'soso': soso,
                        'sad': sad,
                        'surprise': surprise,
                        'total_rate': total_rate
                    })
                else:
                    return Response(status = status.HTTP_200_OK, data = {
                        'status': 'ok', 
                        'review': serializer.data,
                        'thumb': 0,
                        'good': 0,
                        'soso': 0,
                        'sad': 0,
                        'surprise': 0,
                        'total_rate': total_rate
                    })
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상을 선택해주세요.'})
    

    def delete(self, request, format = None):
        review_id = request.data.get('reviewId', None)
        exhibition_id = request.data.get('exhibitionId', None)
        user = request.user
        if review_id and exhibition_id:
            try:
                review = models.Review.objects.get(id = review_id)
                review.delete()
                exhibition = exhibition_models.Exhibition.objects.get(id = exhibition_id)
                total_rate = exhibition.total_rate
                reviews = exhibition.reviews
                if reviews.count() > 0:
                    thumb = reviews.filter(expression = 'thumb').count()/reviews.count()
                    good = reviews.filter(expression = 'good').count()/reviews.count()
                    soso = reviews.filter(expression = 'soso').count()/reviews.count()
                    sad = reviews.filter(expression = 'sad').count()/reviews.count()
                    surprise = reviews.filter(expression = 'surprise').count()/reviews.count()

                    return Response(status = status.HTTP_200_OK, data = {
                        'status': 'ok', 
                        'thumb': thumb,
                        'good': good,
                        'soso': soso,
                        'sad': sad,
                        'surprise': surprise,
                        'total_rate': total_rate
                    })
                else:
                    return Response(status = status.HTTP_200_OK, data = {
                        'status': 'ok', 
                        'thumb': 0,
                        'good': 0,
                        'soso': 0,
                        'sad': 0,
                        'surprise': 0,
                        'total_rate': total_rate
                    })
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상을 선택해주세요.'})


class ArtworkReview(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        artwork_id = request.query_params.get('artworkId', None)
        filter_type = request.query_params.get('filter', None)
        page = request.query_params.get('page', None)
        user = request.user
        blocking_review = models.Blocking.objects.filter(user = user, review__isnull = False).values_list('review__id', flat = True)
        blocking_user = models.Blocking.objects.filter(user = user, to_user__isnull = False).values_list('to_user__id', flat = True)
        if artwork_id:
            try:
                artwork = artwork_models.Artwork.objects.get(id = artwork_id)
                reviews = artwork.reviews.filter(~Q(content = "") & ~Q(id__in = blocking_review) & ~Q(author__id__in = blocking_user)).order_by('index')
                reviews_count = artwork.reviews.all().order_by('index')
                if filter_type:
                    if filter_type == 'new':
                        reviews = reviews.order_by('-time')
                    elif filter_type == 'like':
                        reviews = sorted(reviews, key=lambda t: t.like_count, reverse=True)
                    elif filter_type == 'comment':
                        reviews = sorted(reviews, key=lambda t: t.reply_count, reverse=True)
                    elif filter_type == 'rate':
                        reviews = reviews.order_by('-rate')

                paginator = MainPageNumberPagination()
                result_page = paginator.paginate_queryset(reviews, request)
                serializer = serializers.ReviewSerializer(result_page, many = True, context = {'request': request})

                if page == '1':
                    my_review = artwork.reviews.filter(author = request.user).order_by('index')
                    if reviews_count.count() > 0:
                        thumb = reviews_count.filter(expression = 'thumb').count()/reviews_count.count()
                        good = reviews_count.filter(expression = 'good').count()/reviews_count.count()
                        soso = reviews_count.filter(expression = 'soso').count()/reviews_count.count()
                        sad = reviews_count.filter(expression = 'sad').count()/reviews_count.count()
                        surprise = reviews_count.filter(expression = 'surprise').count()/reviews_count.count()

                        return Response(status = status.HTTP_200_OK, data = {
                            'status': 'ok', 
                            'reviews': serializer.data, 
                            'my_review': serializers.ReviewSerializer(my_review, many = True, context = {'request': request}).data,
                            'thumb': thumb,
                            'good': good,
                            'soso': soso,
                            'sad': sad,
                            'surprise': surprise
                        })
                    else:
                        return Response(status = status.HTTP_200_OK, data = {
                            'status': 'ok', 
                            'reviews': serializer.data, 
                            'my_review': serializers.ReviewSerializer(my_review, many = True, context = {'request': request}).data,
                            'thumb': 0,
                            'good': 0,
                            'soso': 0,
                            'sad': 0,
                            'surprise': 0
                        })
                else:
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'reviews': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시가 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시를 선택해주세요.'})
    
    def post(self, request, format = None):
        artwork_id = request.data.get('artworkId', None)
        rate = request.data.get('rating', None)
        expression = request.data.get('expression', None)
        content = request.data.get('content', None)
        user = request.user
        if artwork_id and (rate or expression or content):
            try:
                artwork = artwork_models.Artwork.objects.get(id = artwork_id)
                review = models.Review.objects.create(author = user, artwork = artwork, rate = rate, content = content, expression = expression)
                review.save()
                serializer = serializers.ReviewSerializer(review, context = {'request': request})
                artwork = artwork_models.Artwork.objects.get(id = artwork_id)
                total_rate = artwork.total_rate
                reviews = artwork.reviews
                if reviews.count() > 0:
                    thumb = reviews.filter(expression = 'thumb').count()/reviews.count()
                    good = reviews.filter(expression = 'good').count()/reviews.count()
                    soso = reviews.filter(expression = 'soso').count()/reviews.count()
                    sad = reviews.filter(expression = 'sad').count()/reviews.count()
                    surprise = reviews.filter(expression = 'surprise').count()/reviews.count()

                    return Response(status = status.HTTP_200_OK, data = {
                        'status': 'ok', 
                        'review': serializer.data,
                        'thumb': thumb,
                        'good': good,
                        'soso': soso,
                        'sad': sad,
                        'surprise': surprise,
                        'total_rate': total_rate
                    })
                else:
                    return Response(status = status.HTTP_200_OK, data = {
                        'status': 'ok', 
                        'review': serializer.data,
                        'thumb': 0,
                        'good': 0,
                        'soso': 0,
                        'sad': 0,
                        'surprise': 0,
                        'total_rate': total_rate
                    })
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시가 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '전시를 선택해주세요.'})
    
    def put(self, request, format = None):
        review_id = request.data.get('reviewId', None)
        artwork_id = request.data.get('artworkId', None)
        rate = request.data.get('rating', None)
        expression = request.data.get('expression', None)
        content = request.data.get('content', None)
        user = request.user
        if review_id and artwork_id and (rate or expression or content):
            try:
                review = models.Review.objects.get(id = review_id)
                review.rate = rate
                review.expression = expression
                review.content = content
                review.save()
                serializer = serializers.ReviewSerializer(review, context = {'request': request})
                artwork = artwork_models.Artwork.objects.get(id = artwork_id)
                total_rate = artwork.total_rate
                reviews = artwork.reviews
                if reviews.count() > 0:
                    thumb = reviews.filter(expression = 'thumb').count()/reviews.count()
                    good = reviews.filter(expression = 'good').count()/reviews.count()
                    soso = reviews.filter(expression = 'soso').count()/reviews.count()
                    sad = reviews.filter(expression = 'sad').count()/reviews.count()
                    surprise = reviews.filter(expression = 'surprise').count()/reviews.count()

                    return Response(status = status.HTTP_200_OK, data = {
                        'status': 'ok', 
                        'review': serializer.data,
                        'thumb': thumb,
                        'good': good,
                        'soso': soso,
                        'sad': sad,
                        'surprise': surprise,
                        'total_rate': total_rate
                    })
                else:
                    return Response(status = status.HTTP_200_OK, data = {
                        'status': 'ok', 
                        'review': serializer.data,
                        'thumb': 0,
                        'good': 0,
                        'soso': 0,
                        'sad': 0,
                        'surprise': 0,
                        'total_rate': total_rate
                    })
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '작품이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '작품을 선택해주세요.'})
    
    def delete(self, request, format = None):
        review_id = request.data.get('reviewId', None)
        artwork_id = request.data.get('artworkId', None)
        user = request.user
        if review_id and artwork_id:
            try:
                review = models.Review.objects.get(id = review_id)
                review.delete()
                artwork = artwork_models.Artwork.objects.get(id = artwork_id)
                total_rate = artwork.total_rate
                reviews = artwork.reviews
                if reviews.count() > 0:
                    thumb = reviews.filter(expression = 'thumb').count()/reviews.count()
                    good = reviews.filter(expression = 'good').count()/reviews.count()
                    soso = reviews.filter(expression = 'soso').count()/reviews.count()
                    sad = reviews.filter(expression = 'sad').count()/reviews.count()
                    surprise = reviews.filter(expression = 'surprise').count()/reviews.count()

                    return Response(status = status.HTTP_200_OK, data = {
                        'status': 'ok', 
                        'thumb': thumb,
                        'good': good,
                        'soso': soso,
                        'sad': sad,
                        'surprise': surprise,
                        'total_rate': total_rate
                    })
                else:
                    return Response(status = status.HTTP_200_OK, data = {
                        'status': 'ok', 
                        'thumb': 0,
                        'good': 0,
                        'soso': 0,
                        'sad': 0,
                        'surprise': 0,
                        'total_rate': 0
                    })
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상을 선택해주세요.'})


class Notification(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user
        notification = models.Notification.objects.filter(to_user = user).order_by('-date')
        if notification.count() > 0:
            notification_check = models.NotificationCheck.objects.filter(user = user)
            if notification_check.count() == notification.count():
                paginator = MainPageNumberPagination()
                result_page = paginator.paginate_queryset(notification, request)
                serializer = serializers.NotificationSerializer(result_page, many = True, context = {'request': request})

                return Response(status = status.HTTP_200_OK, data = {'is_new': False, 'notification': serializer.data})
            else:
                paginator = MainPageNumberPagination()
                result_page = paginator.paginate_queryset(notification, request)
                serializer = serializers.NotificationSerializer(result_page, many = True, context = {'request': request})

                return Response(status = status.HTTP_200_OK, data = {'is_new': True, 'notification': serializer.data})
        else:
            paginator = MainPageNumberPagination()
            result_page = paginator.paginate_queryset(notification, request)
            serializer = serializers.NotificationSerializer(result_page, many = True, context = {'request': request})

            return Response(status = status.HTTP_200_OK, data = {'is_new': False, 'notification': serializer.data})


class NotificationCheck(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user = request.user
        notification_check = models.NotificationCheck.objects.filter(user = user).count()
        notification = models.Notification.objects.filter(to_user = user).count()

        if notification_check == notification:
            return Response(status = status.HTTP_200_OK, data = {'is_new': False})
        else:
            return Response(status = status.HTTP_200_OK, data = {'is_new': True})

    def post(self, request, format = None):
        user = request.user
        notification_id = request.data.get('notificationId', None)
        
        try:
            notification = models.Notification.objects.get(id = notification_id)
            pre = models.NotificationCheck.objects.filter(user = user, notification = notification)
            if pre.count() > 0:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)
            else:
                notification_check = models.NotificationCheck.objects.create(user = user, notification = notification)
                notification_check.save()
                if models.Notification.objects.filter(to_user = user).count() == models.NotificationCheck.objects.filter(user = user).count():
                    return Response(status = status.HTTP_201_CREATED)
                else:
                    return Response(status = status.HTTP_200_OK)
        except:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)


class Reply(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        review_id = request.query_params.get('reviewId', None)
        filter_type = request.query_params.get('filter', None)

        user = request.user
        blocking_reply = models.Blocking.objects.filter(user = user, reply__isnull = False).values_list('reply__id', flat = True)
        blocking_user = models.Blocking.objects.filter(user = user, to_user__isnull = False).values_list('to_user__id', flat = True)
        if review_id:
            review = models.Review.objects.get(id = review_id, deleted = False)
            replies = review.replies.filter(Q(deleted = False) & ~Q(id__in = blocking_reply) & ~Q(author__id__in = blocking_user)).order_by('time')

            if filter_type:
                if filter_type == 'new':
                    replies = replies.order_by('-time')
                elif filter_type == 'comment':
                    replies = sorted(replies, key=lambda t: t.reply_count, reverse=True)
                else:
                    replies = replies.order_by('-time')

            paginator = MainPageNumberPagination()
            result_page = paginator.paginate_queryset(replies, request)
            serializer = serializers.ReplySerializer(result_page, many = True, context = {'request': request})

            return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'replies': serializer.data})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})
    
    def post(self, request, format = None):
        review_id = request.data.get('reviewId', None)
        user = request.user
        content = request.data.get('content', None)

        if review_id and content:
            try:
                review = models.Review.objects.get(id = review_id, deleted = False)

                reply = models.Reply.objects.create(
                    review = review,
                    author = user,
                    content = content
                )

                reply.save()

                if user.id != review.author.id:
                    notification = models.Notification.objects.create(
                        from_user = user,
                        to_user = review.author,
                        type = 'comment_review',
                        review = review,
                        reply = reply
                    )
                    notification.save()
                    if review.author.push_token:
                        text = ''
                        text += user.nickname
                        text += ' 님이 회원님의 '
                        if review.artwork:
                            text += "'" + review.artwork.name + "'"
                        elif review.exhibition:
                            text += "'" + review.exhibition.name + "'" + '전시 '
                        text += '감상에 댓글을 달았습니다.'
                        fcm_send_message(registration_id = review.author.push_token, title='댓글 알림', body=text, android_channel_id = 'artuium', icon='ic_notification')

                serializer = serializers.ReplySerializer(reply, context = {'request': request})

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'reply': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})
    
    def put(self, request, format = None):
        reply_id = request.data.get('replyId', None)
        user = request.user
        content = request.data.get('content', None)

        if reply_id and content:
            try:
                reply = models.Reply.objects.get(id = reply_id, deleted = False)

                reply.content = content
                reply.save()

                serializer = serializers.ReplySerializer(reply, context = {'request': request})

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'reply': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})
    
    def delete(self, request, format = None):
        reply_id = request.data.get('replyId', None)
        user = request.user
        if reply_id:
            try:
                reply = models.Reply.objects.get(id = reply_id, deleted = False)
                if reply.author == user:
                    reply.delete()

                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
                else:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '본인의 댓글이 아닙니다.'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})


class Replies(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        reply_id = request.query_params.get('replyId', None)
        page = int(request.query_params.get('page', None))
        user = request.user
        blocking_reply = models.Blocking.objects.filter(user = user, reply__isnull = False).values_list('reply__id', flat = True)
        blocking_user = models.Blocking.objects.filter(user = user, to_user__isnull = False).values_list('to_user__id', flat = True)
        if reply_id and page:
            reply = models.Reply.objects.get(id = reply_id)
            replies = reply.replies.filter(Q(deleted = False) & ~Q(id__in = blocking_reply) & ~Q(author__id__in = blocking_user)).order_by('time')

            total_count = replies.count()
            start = 3 + (12*(page-1))
            end = 3 + (12*(page))

            if total_count > end:
                replies = replies[start:end]
                serializer = serializers.ReplySerializer(replies, many = True, context = {'request': request})
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'has_next_page': True, 'replies': serializer.data})
            else:
                replies = replies[start:]
                serializer = serializers.ReplySerializer(replies, many = True, context = {'request': request})
                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'has_next_page': False, 'replies': serializer.data})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})
    
    def post(self, request, format = None):
        reply_id = request.data.get('replyId', None)
        user = request.user
        content = request.data.get('content', None)

        if reply_id and content:
            try:
                reply = models.Reply.objects.get(id = reply_id)

                new_reply = models.Reply.objects.create(
                    author = user,
                    content = content
                )

                new_reply.save()

                new_reply.replies.add(reply)
                new_reply.save()
                if user.id != reply.author.id:
                    notification = models.Notification.objects.create(
                        from_user = user,
                        to_user = reply.author,
                        type = 'comment_reply',
                        review = reply.review,
                        reply = new_reply
                    )
                    notification.save()
                    if reply.author.push_token:
                        text = ''
                        text += user.nickname
                        text += ' 님이 회원님의 '
                        if reply.review.artwork:
                            text += "'" + reply.review.artwork.name + "'"
                        elif reply.review.exhibition:
                            text += "'" + reply.review.exhibition.name + "'" + '전시 '
                        text += '감상의 댓글에 대댓글을 달았습니다.'
                        fcm_send_message(registration_id = reply.author.push_token, title='댓글 알림', body=text, android_channel_id = 'artuium', icon='ic_notification')

                serializer = serializers.ReplySerializer(new_reply, context = {'request': request})

                return Response(status = status.HTTP_200_OK, data = {'status': 'ok', 'reply': serializer.data})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})


class ReportReview(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        review_id = request.query_params.get('reviewId', None)
        user = request.user
        if review_id:
            try:
                review = models.Review.objects.get(id = review_id)
                pre = models.Reporting.objects.filter(user = user, review = review)
                if pre.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 신고되었습니다.'})
                else:
                    reporting = models.Reporting.objects.create(user = user, review = review)
                    reporting.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})


class ReportUser(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user_id = request.query_params.get('userId', None)
        user = request.user
        if user_id:
            try:
                to_user = User.objects.get(id = user_id)
                pre = models.Reporting.objects.filter(user = user, to_user = to_user)
                if pre.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 신고되었습니다.'})
                else:
                    reporting = models.Reporting.objects.create(user = user, to_user = to_user)
                    reporting.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '유저가 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})


class ReportReply(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        reply_id = request.query_params.get('replyId', None)
        user = request.user
        if reply_id:
            try:
                reply = models.Reply.objects.get(id = reply_id)
                pre = models.Reporting.objects.filter(user = user, reply = reply)
                if pre.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 신고되었습니다.'})
                else:
                    reporting = models.Reporting.objects.create(user = user, reply = reply)
                    reporting.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})
    

class BlockReview(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        review_id = request.query_params.get('reviewId', None)
        user = request.user
        if review_id:
            try:
                review = models.Review.objects.get(id = review_id)
                pre = models.Blocking.objects.filter(user = user, review = review)
                if pre.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 숨김되었습니다.'})
                else:
                    blocking = models.Blocking.objects.create(user = user, review = review)
                    blocking.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})


class BlockUser(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        user_id = request.query_params.get('userId', None)
        user = request.user
        if user_id:
            try:
                to_user = User.objects.get(id = user_id)
                pre = models.Blocking.objects.filter(user = user, to_user = to_user)
                if pre.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 숨김되었습니다.'})
                else:
                    blocking = models.Blocking.objects.create(user = user, to_user = to_user)
                    blocking.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '유저가 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})


class BlockReply(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format = None):
        reply_id = request.query_params.get('replyId', None)
        user = request.user
        if reply_id:
            try:
                reply = models.Reply.objects.get(id = reply_id)
                pre = models.Blocking.objects.filter(user = user, reply = reply)
                if pre.count() > 0:
                    return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '이미 숨김되었습니다.'})
                else:
                    blocking = models.Blocking.objects.create(user = user, reply = reply)
                    blocking.save()
                    return Response(status = status.HTTP_200_OK, data = {'status': 'ok'})
            except:
                return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '감상이 존재하지 않습니다.'})
        else:
            return Response(status = status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, data = {'error': '잘못된 요청입니다.'})