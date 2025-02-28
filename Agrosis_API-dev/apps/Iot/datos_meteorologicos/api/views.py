from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from ..models import Datos_metereologicos
from .serializers import Datos_metereologicosSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead

class Datos_metereologicosViewset(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated,IsAdminOrRead ]
    queryset = Datos_metereologicos.objects.all()
    serializer_class = Datos_metereologicosSerializer
