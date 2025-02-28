from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Cultivo.cosechas.models import Cosecha
from apps.Cultivo.cosechas.api.serializers import CosechaSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead 

class CosechaViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead] 
    queryset = Cosecha.objects.all()
    serializer_class = CosechaSerializer
