from typing import Any

from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings
from django.http import HttpRequest


class AccountAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)

    def save_user(self, request, user, form, commit=True):
        user = super().save_user(request, user, form, False)
        nickname = request.data.get('nickname', False)
        profile_image = request.data.get('profile_image', False)

        user.nickname = nickname
        user.profile_image = profile_image
        user.save()
        return user

class SocialAccountAdapter(DefaultSocialAccountAdapter):
    def is_open_for_signup(self, request: HttpRequest, sociallogin: Any):
        return getattr(settings, "ACCOUNT_ALLOW_REGISTRATION", True)

    # def save_user(self, request, sociallogin, form, commit=True):
    #     user = super(SocialAccountAdapter, self).save_user(request, sociallogin, form)
    #     nickname = request.data.get('nickname', False)
    #     profile_image = request.data.get('profile_image', False)

    #     print(nickname, profile_image)

    #     user.nickname = nickname
    #     user.profile_image = profile_image
    #     user.save()
    #     return user
    #리퀘스트에서 데이터라는 게 없다는 오류뜸