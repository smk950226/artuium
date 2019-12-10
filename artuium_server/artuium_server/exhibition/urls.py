from django.urls import path
from . import views

app_name = "exhibition"
urlpatterns = [
    path('init/', views.InitialExhibition.as_view()),
]
