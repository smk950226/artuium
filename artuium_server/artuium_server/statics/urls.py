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
    path('like/review/', views.LikeReviewOnly.as_view()),
    path('like/review/<int:user_id>/', views.LikeReview.as_view()),
    path('like/exhibition/', views.LikeExhibitionOnly.as_view()),
    path('like/exhibition/<int:user_id>/', views.LikeExhibition.as_view()),
    path('like/artwork/', views.LikeArtworkOnly.as_view()),
    path('like/artwork/<int:user_id>/', views.LikeArtwork.as_view()),
    path('review/exhibition/', views.ExhibitionReview.as_view()),
    path('review/artwork/', views.ArtworkReview.as_view()),
    path('notification/', views.Notification.as_view()),
    path('notification/check/', views.NotificationCheck.as_view()),
    path('reply/', views.Reply.as_view()),
    path('replies/', views.Replies.as_view()),
    path('report/review/', views.ReportReview.as_view()),
    path('report/user/', views.ReportUser.as_view()),
]