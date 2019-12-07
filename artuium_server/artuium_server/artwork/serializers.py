from rest_framework import serializers

from . import models

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Artist
        fields = ['id', 'name']


class ArtworkSerializer(serializers.ModelSerializer):
    author = ArtistSerializer()
    class Meta:
        model = models.Artwork
        fields = ['id', 'name', 'image', 'author', 'created', 'material', 'content']