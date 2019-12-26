from django.contrib import admin
from . import models

@admin.register(models.Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ["id", "title", 'date']
    list_display_links = ["id", "title"]


@admin.register(models.Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["id", "author", 'time', 'rate', 'recommended']
    list_display_links = ["id", "author"]


@admin.register(models.Reply)
class ReplyAdmin(admin.ModelAdmin):
    list_display = ["id", "author", 'time']
    list_display_links = ["id", "author"]


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ["id", "user", 'time']
    list_display_links = ["id", "user"]


@admin.register(models.Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ["id", "following", 'follower']
    list_display_links = ["id"]


@admin.register(models.NoticeCheck)
class NoticeCheckAdmin(admin.ModelAdmin):
    list_display = ["id", "user", 'notice']
    list_display_links = ["id"]


@admin.register(models.Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ["id", "from_user", 'to_user', 'type']
    list_display_links = ["id"]


@admin.register(models.NotificationCheck)
class NotificationCheckAdmin(admin.ModelAdmin):
    list_display = ["id", "user", 'notification']
    list_display_links = ["id"]