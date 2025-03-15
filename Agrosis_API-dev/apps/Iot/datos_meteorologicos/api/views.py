from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from ..models import Datos_metereologicos
from .serializers import Datos_metereologicosSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead
from rest_framework.permissions import AllowAny

class Datos_metereologicosViewset(ModelViewSet):
    queryset = Datos_metereologicos.objects.all()
    serializer_class = Datos_metereologicosSerializer

    def get_authenticators(self):
        # Solo aplica JWTAuthentication para acciones que no sean POST
        if self.request.method != 'POST':
            return [JWTAuthentication()]
        return []

    def get_permissions(self):
        # Permite POST sin autenticación ni permisos, pero otras acciones requieren IsAuthenticated y IsAdminOrRead
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated(), IsAdminOrRead()]
