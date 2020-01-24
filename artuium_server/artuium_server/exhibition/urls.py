from django.urls import path
from . import views

app_name = "exhibition"
urlpatterns = [
    path('init/', views.InitialExhibition.as_view()),
    path('exhibition/', views.Exhibition.as_view()),
    path('exhibition/detail/artwork/', views.ExhibitionDetailByArtwork.as_view()),
    path('exhibition/view/', views.ExhibitionView.as_view()),
]
