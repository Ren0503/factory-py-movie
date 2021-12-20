from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Episode, Review, Movie, Actor


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class EpisodeSerialize(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = '__all__'


class ActorDetailSerialize(serializers.ModelSerializer):
    movies = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Actor
        fields = '__all__'

    def get_movies(self, obj):
        movies = obj.movie_actor.all()
        serializer = MovieSerializer(movies, many=True)
        return serializer.data


class MovieDetailSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    actors = ActorSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

class TVShowDetailSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    actors = ActorSerializer(many=True, read_only=True)
    episodes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

    def get_episodes(self, obj):
        episodes = obj.episode_set.all()
        serializer = EpisodeSerialize(episodes, many=True)
        return serializer.data