from django.urls import path, include
from . import views

app_name = "users"
urlpatterns = [
    path('follow/', views.Follow.as_view()),
    path('search/', views.Search.as_view()),
    path('recommended/', views.Recommended.as_view()),
    path('profile/', views.Profile.as_view()),
    path('check/email/', views.CheckEmail.as_view()),
    path('check/nickname/', views.CheckNickname.as_view()),
    path('list/review/', views.ReviewList.as_view()),
    path('change/nickname/', views.ChangeNickname.as_view()),
    path('change/profileimg/', views.ChangeProfileImg.as_view()),
    path('change/backgroundimg/', views.ChangeBackgroundImg.as_view()),
    path('accounts/', include('allauth.urls')),
    path('addinfo/', views.AddInfo.as_view()),
    path('login/kakao/', views.KakaoLogin.as_view()),
    path('login/google/', views.GoogleLogin.as_view()),
    path('login/facebook/', views.FacebookLogin.as_view()),
]
