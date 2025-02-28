from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Cultivo.cultivos.models import Cultivo
from apps.Cultivo.cultivos.api.serializers import CultivoSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead 

class CultivoViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead] 
    queryset = Cultivo.objects.all()
    serializer_class = CultivoSerializer
