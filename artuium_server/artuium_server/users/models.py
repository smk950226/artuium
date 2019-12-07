from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    nickname = CharField('닉네임', max_length = 255)
    following = models.ManyToManyField("self", blank=True, related_name = 'following')
    follower = models.ManyToManyField("self", blank=True, related_name = 'follower')
    profile_image = models.ImageField('Profile Image', upload_to = 'user/profile/', blank = True, null = True)
    background_image = models.ImageField('Profile Image', upload_to = 'user/background/', blank = True, null = True)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    def __str__(self):
        return self.nickname