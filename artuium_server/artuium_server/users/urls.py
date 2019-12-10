from django.urls import path
from . import views

app_name = "users"
urlpatterns = [
    path('follow/', views.Follow.as_view()),
    path('search/', views.Search.as_view()),
    path('recommended/', views.Recommended.as_view()),
]
