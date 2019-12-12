from django.urls import path
from . import views

app_name = "users"
urlpatterns = [
    path('follow/', views.Follow.as_view()),
    path('search/', views.Search.as_view()),
    path('recommended/', views.Recommended.as_view()),
    path('profile/', views.Profile.as_view()),
    path('list/review/', views.ReviewList.as_view()),
    path('change/nickname/', views.ChangeNickname.as_view()),
    path('change/profileimg/', views.ChangeProfileImg.as_view()),
    path('change/backgroundimg/', views.ChangeBackgroundImg.as_view()),
]
