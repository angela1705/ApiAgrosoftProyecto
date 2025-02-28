from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from ..models import Herramienta
from .serializers import HerramientaSerializer

class HerramientaViewSet(viewsets.ModelViewSet):
    queryset = Herramienta.objects.all()
    serializer_class = HerramientaSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
