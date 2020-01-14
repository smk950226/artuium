from rest_framework import serializers

from . import models
from artuium_server.artwork import serializers as artwork_serializers
from artuium_server.statics import models as statics_models


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Gallery
        fields = ['id', 'name', 'location']


class ExhibitionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ExhibitionImage
        fields = ['id', 'image', 'size']


class ExhibitionSerializer(serializers.ModelSerializer):
    artists = artwork_serializers.ArtistSerializer(many = True)
    artworks = artwork_serializers.ArtworkSerializer(many = True)
    gallery = GallerySerializer()
    images = ExhibitionImageSerializer(many = True)
    is_liked = serializers.SerializerMethodField()
    is_reviewed = serializers.SerializerMethodField()
    class Meta:
        model = models.Exhibition
        fields = ['id', 'name', 'content', 'open_date', 'close_date', 'open_time', 'close_time', 'notopendate', 'region', 'address', 'scale', 'fee', 'artists', 'artworks', 'gallery', 'images', 'review_count', 'like_count', 'is_liked', 'total_rate', 'is_reviewed']

    def get_is_liked(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            user = request.user
            like_check = statics_models.Like.objects.filter(user = user, exhibition = obj)
            if like_check.count() > 0:
                return True
            else:
                return False
        return False
    
    def get_is_reviewed(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            user = request.user
            review_check = statics_models.Review.objects.filter(author = user, exhibition = obj)
            if review_check.count() > 0:
                return True
            else:
                return False
        return False