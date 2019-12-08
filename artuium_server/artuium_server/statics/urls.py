from django.urls import path
from . import views

app_name = "statics"
urlpatterns = [
    path('init/', views.InitialReview.as_view()),
    path('notice/', views.Notice.as_view()),
]
