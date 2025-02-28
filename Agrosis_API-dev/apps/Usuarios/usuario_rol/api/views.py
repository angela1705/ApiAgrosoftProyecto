from rest_framework.viewsets import ModelViewSet
from apps.Usuarios.usuario_rol.models import UsuarioRol
from apps.Usuarios.usuario_rol.api.serializer import UsuarioRolSerializer

class UsuarioRolViewSet(ModelViewSet):
    queryset = UsuarioRol.objects.all()
    serializer_class = UsuarioRolSerializer

# Create your views here.


