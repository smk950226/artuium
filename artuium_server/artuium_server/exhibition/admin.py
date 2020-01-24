from django.contrib import admin
from . import models

@admin.register(models.Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    list_display_links = ["id", "name"]


@admin.register(models.Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ["id", "name", 'location', 'region']
    list_display_links = ["id", "name"]


@admin.register(models.Exhibition)
class ExhibitionAdmin(admin.ModelAdmin):
    list_display = ["id", "name", 'fee', 'index']
    list_display_links = ["id", "name"]


@admin.register(models.ExhibitionImage)
class ExhibitionImageAdmin(admin.ModelAdmin):
    list_display = ["id", "exhibition"]
    list_display_links = ["id", "exhibition"]


@admin.register(models.ExhibitionView)
class ExhibitionViewAdmin(admin.ModelAdmin):
    list_display = ["id", "user", 'exhibition', 'viewed_at']
    list_display_links = ["id", "user"]