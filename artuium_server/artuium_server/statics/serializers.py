from rest_framework import serializers

from . import models
from artuium_server.users import serializers as users_serializers
from artuium_server.artwork import serializers as artwork_serializers
from artuium_server.exhibition import serializers as exhibition_serializers

class ReviewSerializer(serializers.ModelSerializer):
    author = users_serializers.ProfileSerializer()
    exhibition = exhibition_serializers.ExhibitionSerializer()
    artwork = artwork_serializers.ArtworkSerializer()
    is_liked = serializers.SerializerMethodField()
    class Meta:
        model = models.Review
        fields = ['id', 'author', 'time', 'content', 'exhibition', 'artwork', 'rate', 'expression', 'recommended', 'reply_count', 'like_count', 'is_liked']
    
    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            user = request.user
            like_check = models.Like.objects.filter(user = user, review = obj)
            if like_check.count() > 0:
                return True
            else:
                return False
        return False


class NoticeSerializer(serializers.ModelSerializer):
    is_new = serializers.SerializerMethodField()
    class Meta:
        model = models.Notice
        fields = ['id', 'title', 'date', 'content', 'image', 'is_banner', 'is_new']
    
    def get_is_new(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            user = request.user
            if obj.date >= user.date_joined:
                notice_check = models.NoticeCheck.objects.filter(user = user, notice = obj)
                if notice_check.count() > 0:
                    return False
                else:
                    return True
            else:
                return False
        return False


class ReplySerializer(serializers.ModelSerializer):
    author = users_serializers.ProfileSerializer()
    reply_count = serializers.SerializerMethodField()
    initial_replies = serializers.SerializerMethodField()
    
    class Meta:
        model = models.Reply
        fields = ['id', 'review', 'author', 'time', 'content', 'reply_count', 'initial_replies']
    
    def get_reply_count(self, obj):
        return obj.replies.count()
    
    def get_initial_replies(self, obj):
        replies =  obj.replies.order_by('time')[:3]
        replies_list = []
        for reply in replies:
            replies_list.append({
                'id': reply.id,
                'time': reply.time,
                'content': reply.content,
                'author': reply.author.nickname
            })
        return replies_list


class LikeSerializer(serializers.ModelSerializer):
    user = users_serializers.ProfileSerializer()
    review = ReviewSerializer()
    artwork = artwork_serializers.ArtworkSerializer()
    exhibition = exhibition_serializers.ExhibitionSerializer()
    class Meta:
        model = models.Like
        fields = ['id', 'user', 'review', 'artwork', 'exhibition', 'time']


class NotificationSerializer(serializers.ModelSerializer):
    from_user = users_serializers.ProfileSerializer()
    to_user = users_serializers.ProfileSerializer()
    is_new = serializers.SerializerMethodField()
    review = ReviewSerializer()
    reply = ReplySerializer()
    class Meta:
        model = models.Notification
        fields = ['id', 'from_user', 'to_user', 'type', 'review', 'reply', 'date', 'is_new']
    
    def get_is_new(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            user = request.user
            if obj.date >= user.date_joined:
                notification_check = models.NotificationCheck.objects.filter(user = user, notification = obj)
                if notification_check.count() > 0:
                    return False
                else:
                    return True
            else:
                return False
        return False