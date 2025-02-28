from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from ..models import BodegaInsumo
from .serializers import BodegaInsumoSerializer

class BodegaInsumoViewSet(viewsets.ModelViewSet):
    queryset = BodegaInsumo.objects.all()
    serializer_class = BodegaInsumoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
