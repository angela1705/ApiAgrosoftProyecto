from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from ..models import Sensores
from .serializers import SensoresSerializer

class SensoresViewset(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, ]
    queryset = Sensores.objects.all()
    serializer_class = SensoresSerializer
    