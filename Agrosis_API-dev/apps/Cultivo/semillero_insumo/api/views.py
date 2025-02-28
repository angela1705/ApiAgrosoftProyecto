from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Cultivo.semillero_insumo.models import SemilleroInsumo
from apps.Cultivo.semillero_insumo.api.serializers import SemilleroInsumoSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead 

class SemilleroInsumoViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead]  
    queryset = SemilleroInsumo.objects.all()
    serializer_class = SemilleroInsumoSerializer
