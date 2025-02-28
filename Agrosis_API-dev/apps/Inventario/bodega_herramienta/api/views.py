from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from ..models import BodegaHerramienta
from .serializers import BodegaHerramientaSerializer

class BodegaHerramientaViewSet(viewsets.ModelViewSet):
    queryset = BodegaHerramienta.objects.all()
    serializer_class = BodegaHerramientaSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
