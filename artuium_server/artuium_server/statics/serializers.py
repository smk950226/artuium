from rest_framework import serializers

from . import models
from artuium_server.users import serializers as users_serializers
from artuium_server.artwork import serializers as artwork_serializers
from artuium_server.exhibition import serializers as exhibition_serializers

class ReviewSerializer(serializers.ModelSerializer):
    author = users_serializers.ProfileSerializer()
    exhibition = exhibition_serializers.ExhibitionSerializer()
    artwork = artwork_serializers.ArtworkSerializer()
    class Meta:
        model = models.Review
        fields = ['id', 'author', 'time', 'content', 'exhibition', 'artwork', 'rate', 'expression', 'recommended', 'reply_count', 'like_count']


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notice
        fields = ['id', 'title', 'date', 'content', 'image', 'is_banner']


class ReplySerializer(serializers.ModelSerializer):
    review = ReviewSerializer()
    author = users_serializers.ProfileSerializer()
    class Meta:
        model = models.Reply
        fields = ['id', 'review', 'author', 'time', 'content']


class LikeSerializer(serializers.ModelSerializer):
    user = users_serializers.ProfileSerializer()
    review = ReplySerializer()
    artwork = artwork_serializers.ArtworkSerializer()
    exhibition = exhibition_serializers.ExhibitionSerializer()
    class Meta:
        model = models.Like
        fields = ['id', 'user', 'review', 'artwork', 'exhibition', 'time']