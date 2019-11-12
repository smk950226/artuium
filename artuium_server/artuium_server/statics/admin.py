from django.contrib import admin
from . import models

@admin.register(models.Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ["id", "title", 'date']
    list_display_links = ["id", "title"]


@admin.register(models.Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["id", "author", 'time']
    list_display_links = ["id", "author"]


@admin.register(models.Reply)
class ReplyAdmin(admin.ModelAdmin):
    list_display = ["id", "author", 'time']
    list_display_links = ["id", "author"]


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ["id", "user", 'time']
    list_display_links = ["id", "user"]