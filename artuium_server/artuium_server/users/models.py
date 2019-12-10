from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    nickname = CharField('닉네임', max_length = 255)
    profile_image = models.ImageField('Profile Image', upload_to = 'user/profile/', blank = True, null = True)
    background_image = models.ImageField('Profile Image', upload_to = 'user/background/', blank = True, null = True)
    recommended = models.BooleanField('추천 여부', default = False)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def __str__(self):
        return self.nickname
    
    @property
    def following_count(self):
        return self.following.all().count()
    
    @property
    def follower_count(self):
        return self.follower.all().count()