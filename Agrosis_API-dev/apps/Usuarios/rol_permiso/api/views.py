from rest_framework.viewsets import ModelViewSet
from apps.Usuarios.rol_permiso.models import RolPermiso
from apps.Usuarios.rol_permiso.api.serializer import RolPermisoSerializer

class RolPermisoViewSet(ModelViewSet):
    queryset = RolPermiso.objects.all()
    serializer_class = RolPermisoSerializer

# Create your views here.


