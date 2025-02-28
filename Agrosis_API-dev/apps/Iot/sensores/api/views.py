from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from ..models import Sensores
from .serializers import SensoresSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead

class SensoresViewset(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated,IsAdminOrRead ]
    queryset = Sensores.objects.all()
    serializer_class = SensoresSerializer
    