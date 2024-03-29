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
    path('check/username/', views.CheckUsername.as_view()),
    path('list/review/<int:user_id>/', views.ReviewList.as_view()),
    path('change/nickname/', views.ChangeNickname.as_view()),
    path('change/profileimg/', views.ChangeProfileImg.as_view()),
    path('change/backgroundimg/', views.ChangeBackgroundImg.as_view()),
    path('change/profile/', views.ChangeProfile.as_view()),
    path('accounts/', include('allauth.urls')),
    path('addinfo/', views.AddInfo.as_view()),
    path('initial/', views.Initial.as_view()),
    path('push/token/', views.PushToken.as_view()),
    path('login/kakao/', views.KakaoLogin.as_view()),
    path('login/google/', views.GoogleLogin.as_view()),
    path('login/facebook/', views.FacebookLogin.as_view()),
]
