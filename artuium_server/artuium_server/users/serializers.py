from rest_framework import serializers
from django.contrib.auth import get_user_model

from . import models
from artuium_server.statics import models as statics_models

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    is_me = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    class Meta:
        model = models.User
        fields = ['id', 'nickname', 'profile_image', 'background_image', 'following_count', 'follower_count', 'is_me', 'is_following']
    

    def get_is_me(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            if request.user.id == obj.id:
                return True
            else:
                return False
        return False

    def get_is_following(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            follow = statics_models.Follow.objects.filter(following = request.user, follower = obj)
            if follow.count() > 0:
                return True
            else:
                return False
        return False