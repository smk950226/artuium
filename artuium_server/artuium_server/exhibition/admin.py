from django.contrib import admin
from . import models

@admin.register(models.Gallery)
class GalleryAdmin(admin.ModelAdmin):
    list_display = ["id", "name", 'location']
    list_display_links = ["id", "name"]


@admin.register(models.Exhibition)
class ExhibitionAdmin(admin.ModelAdmin):
    list_display = ["id", "name", 'region', 'fee']
    list_display_links = ["id", "name"]


@admin.register(models.ExhibitionImage)
class ExhibitionImageAdmin(admin.ModelAdmin):
    list_display = ["id", "exhibition"]
    list_display_links = ["id", "exhibition"]