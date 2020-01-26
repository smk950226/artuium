from django.contrib import admin
from . import models

@admin.register(models.HomeRedirectURL)
class HomeRedirectURLAdmin(admin.ModelAdmin):
    list_display = ["id", "url"]
    list_display_links = ["id", "url"]