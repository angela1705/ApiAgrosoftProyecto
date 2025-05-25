from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.mapa.models import PuntoMapa
from apps.mapa.api.serializers import PuntoMapaSerializer

class PuntoMapaViewSet(viewsets.ModelViewSet):
    queryset = PuntoMapa.objects.all().order_by("-creado")
    serializer_class = PuntoMapaSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
