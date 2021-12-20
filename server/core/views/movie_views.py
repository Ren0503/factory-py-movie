from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from core.models import Movie, Review
from core.serializers import MovieSerializer, MovieDetailSerializer, TVShowDetailSerializer

from rest_framework import status

# ----------------------------
# Guest
# ----------------------------


@api_view(['GET'])
def getMovies(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    movies = Movie.objects.filter(
        name__icontains=query).order_by('-createdAt')

    page = request.query_params.get('page')
    paginator = Paginator(movies, 15)

    try:
        movies = paginator.page(page)
    except PageNotAnInteger:
        movies = paginator.page(1)
    except EmptyPage:
        movies = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    serializer = MovieSerializer(movies, many=True)
    return Response({'movies': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopMovies(request):
    movies = Movie.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getMovie(request, pk):
    try:
        movie = Movie.objects.get(_id=pk)
        movie.views += 1
        movie.save()

        if movie.isMovie == True:
            serializer = MovieDetailSerializer(movie, many=False)
        else:
            serializer = TVShowDetailSerializer(movie, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)

# ----------------------------
# User
# ----------------------------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createMovieReview(request, pk):
    user = request.user
    movie = Movie.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = movie.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Movie already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            movie=movie,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = movie.review_set.all()
        movie.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        movie.rating = total / len(reviews)
        movie.save()

        return Response('Review Added')
