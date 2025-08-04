from rest_framework.viewsets import ModelViewSet
from apps.Usuarios.roles.models import Roles
from apps.Usuarios.roles.api.serializer import RolSerializer

class RolViewSet(ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolSerializer
    # Agregar permisos según necesidad