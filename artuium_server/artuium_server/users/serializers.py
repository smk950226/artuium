from rest_framework import serializers
from django.contrib.auth import get_user_model

from . import models
from artuium_server.statics import models as statics_models

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    is_me = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    following_friends_count = serializers.SerializerMethodField()
    class Meta:
        model = models.User
        fields = ['id', 'nickname', 'profile_image', 'background_image', 'following_count', 'follower_count', 'is_me', 'is_following', 'following_friends_count']
    

    def get_is_me(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            if request.user.id == obj.id:
                return True
            else:
                return False
        else:
            return False

    def get_is_following(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            follow = statics_models.Follow.objects.filter(following = request.user, follower = obj)
            if follow.count() > 0:
                return True
            else:
                return False
        else:
            return False


    def get_following_friends_count(self, obj):
        if 'request' in self.context:
            request = self.context['request']
            user = request.user
            following = statics_models.Follow.objects.filter(following = user).values_list('follower__id', flat = True)
            follow = statics_models.Follow.objects.filter(follower = obj, following__id__in = following)
            return follow.count()
        else:
            return 0