from django.urls import path
from . import views

app_name = "statics"
urlpatterns = [
    path('init/', views.InitialReview.as_view()),
    path('notice/', views.Notice.as_view()),
    path('notice/check/', views.NoticeCheck.as_view()),
    path('following/list/', views.Following.as_view()),
    path('follower/list/', views.Follower.as_view()),
    path('review/', views.Review.as_view()),
    path('like/review/', views.LikeReview.as_view()),
    path('like/exhibition/', views.LikeExhibition.as_view()),
    path('like/artwork/', views.LikeArtwork.as_view()),
    path('review/exhibition/', views.ExhibitionReview.as_view()),
    path('review/artwork/', views.ArtworkReview.as_view()),
]