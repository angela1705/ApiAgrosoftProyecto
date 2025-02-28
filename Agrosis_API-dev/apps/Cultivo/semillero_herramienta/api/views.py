from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Cultivo.semillero_herramienta.models import SemilleroHerramienta
from apps.Cultivo.semillero_herramienta.api.serializers import SemilleroHerramientaSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead 

class SemilleroHerramientaViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead]  
    queryset = SemilleroHerramienta.objects.all()
    serializer_class = SemilleroHerramientaSerializer
