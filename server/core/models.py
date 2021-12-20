from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.


class Actor(models.Model):
    _id = models.UUIDField(default=uuid.uuid4,  unique=True,
                           primary_key=True, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    birth = models.CharField(max_length=200, null=True, blank=True)
    sex = models.BooleanField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    description = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Movie(models.Model):
    _id = models.UUIDField(default=uuid.uuid4,  unique=True,
                           primary_key=True, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    genres = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    actors = models.ManyToManyField(
        Actor, related_name='movie_actor', blank=True)
    releasedAt = models.DateField(null=True, blank=True)
    times = models.IntegerField(null=True, blank=True)
    url = models.CharField(max_length=200, null=True, blank=True)
    isMovie = models.BooleanField(default=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    views = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    _id = models.UUIDField(default=uuid.uuid4,  unique=True,
                           primary_key=True, editable=False)
    movie = models.ForeignKey(Movie, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)


class Episode(models.Model):
    _id = models.UUIDField(default=uuid.uuid4,  unique=True,
                           primary_key=True, editable=False)
    movie = models.ForeignKey(Movie, on_delete=models.SET_NULL, null=True)
    number = models.IntegerField(null=True, blank=True)
    url = models.CharField(max_length=200, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.number)