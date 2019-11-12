from django.contrib import admin
from . import models

@admin.register(models.Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    list_display_links = ["id", "name"]


@admin.register(models.Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = ["id", "name", 'author', 'created']
    list_display_links = ["id", "name"]