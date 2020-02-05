from django.contrib import admin
from . import models

class ReviewTypeFilter(admin.SimpleListFilter):
    title = '감상 유형'
    parameter_name = 'review_type'

    def lookups(self, request, model_admin):
        return (
            ('exhibition', '전시 감상'),
            ('artwork', '작품 감상'),
        )

    def queryset(self, request, queryset):
        value = self.value()
        if value == 'exhibition':
            return queryset.filter(exhibition__isnull=False)
        elif value == 'artwork':
            return queryset.filter(artwork__isnull=False)
        return queryset


@admin.register(models.Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ["id", "title", 'date', 'is_banner', 'index']
    list_display_links = ["id", "title"]


@admin.register(models.Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["id", "author", 'review_type', 'exhibition', 'artwork', 'time', 'rate', 'recommended', 'index', 'deleted']
    list_display_links = ["id", "author"]
    list_filter = [ReviewTypeFilter]

    def review_type(self, obj):
        if obj.exhibition:
            return '전시 감상'
        else:
            return '작품 감상'


@admin.register(models.Reply)
class ReplyAdmin(admin.ModelAdmin):
    list_display = ["id", "author", 'time', 'deleted']
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


@admin.register(models.Reporting)
class ReportingAdmin(admin.ModelAdmin):
    list_display = ["id", "user", 'review', 'to_user', 'reply']
    list_display_links = ["id", 'user']


@admin.register(models.Blocking)
class BlockingAdmin(admin.ModelAdmin):
    list_display = ["id", "user", 'review', 'to_user', 'reply']
    list_display_links = ["id", 'user']