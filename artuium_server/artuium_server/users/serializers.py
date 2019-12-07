from rest_framework import serializers

from . import models

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'nickname', 'profile_image', 'background_image']