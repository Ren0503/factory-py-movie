from django.urls import path
from core.views import movie_views as views

urlpatterns = [
    path('', views.getMovies, name="movies"),
    path('<str:pk>/reviews/', views.createMovieReview, name="create-reviews"),
    path('top/', views.getTopMovies, name="top-movie"),
    path('<str:pk>/', views.getMovie, name="movie"),
]