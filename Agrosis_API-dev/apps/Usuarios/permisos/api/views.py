from rest_framework.viewsets import ModelViewSet
from apps.Usuarios.permisos.models import Permiso
from apps.Usuarios.permisos.api.serializer import PermisoSerializer

class PermisosViewSet(ModelViewSet):
    queryset = Permiso.objects.all()
    serializer_class = PermisoSerializer


