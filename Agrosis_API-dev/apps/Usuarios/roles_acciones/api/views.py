from rest_framework.viewsets import ModelViewSet
from apps.Usuarios.roles_acciones.models import RolAccion
from apps.Usuarios.roles_acciones.api.serializer import RolAccionSerializer

class RolesAccionesViewSet(ModelViewSet):
    queryset = RolAccion.objects.all()
    serializer_class = RolAccionSerializer

# Create your views here.


