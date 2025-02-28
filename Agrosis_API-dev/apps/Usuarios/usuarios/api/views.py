from rest_framework.viewsets import ModelViewSet
from apps.Usuarios.usuarios.models import Usuarios
from apps.Usuarios.usuarios.api.serializer import UsuariosSerializer

class UsuariosViewSet(ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer

# Create your views here.


