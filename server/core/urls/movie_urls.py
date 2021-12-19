from django.urls import path
from core.views import movie_views as views

urlpatterns = [
    path('', views.getMovies, name="movies"),
    path('<str:pl>/reviews/', views.createMovieReview, name="create-reviews"),
    path('<str:pk>/', views.getMovie, name="movie"),
]