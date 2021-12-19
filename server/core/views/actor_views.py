from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from core.models import Actor
from core.serializers import ActorDetailSerialize, ActorSerializer

from rest_framework import status

# ----------------------------
# Guest
# ----------------------------


@api_view(['GET'])
def getActors(request):
    actors = Actor.objects.all()
    serializer = ActorSerializer(actors, many=True)
    return Response(serializer.data)
    

@api_view(['GET'])
def getActor(request, pk):
    try:
        actor = Actor.objects.get(_id=pk)
        serializer = ActorDetailSerialize(actor, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'details': f"{e}"}, status=status.HTTP_204_NO_CONTENT)
