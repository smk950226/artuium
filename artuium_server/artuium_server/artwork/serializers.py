from rest_framework import serializers

from . import models
from artuium_server.statics import models as statics_models

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Artist
        fields = ['id', 'name']


class ArtworkSerializer(serializers.ModelSerializer):
    author = ArtistSerializer()
    is_liked = serializers.SerializerMethodField()
    class Meta:
        model = models.Artwork
        fields = ['id', 'name', 'image', 'author', 'created', 'material', 'content', 'review_count', 'like_count', 'is_liked']
    
    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            user = request.user
            like_check = statics_models.Like.objects.filter(user = user, artwork = obj)
            if like_check.count() > 0:
                return True
            else:
                return False
        return False