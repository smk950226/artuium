from rest_framework import serializers

from . import models
from artuium_server.artwork import serializers as artwork_serializers

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Gallery
        fields = ['id', 'name', 'location']


class ExhibitionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ExhibitionImage
        fields = ['id', 'image']


class ExhibitionSerializer(serializers.ModelSerializer):
    artists = artwork_serializers.ArtistSerializer(many = True)
    artworks = artwork_serializers.ArtworkSerializer(many = True)
    gallery = GallerySerializer()
    images = ExhibitionImageSerializer(many = True)
    class Meta:
        model = models.Exhibition
        fields = ['id', 'name', 'content', 'open_date', 'close_date', 'open_time', 'close_time', 'notopendate', 'region', 'address', 'scale', 'fee', 'artists', 'artworks', 'gallery', 'images']