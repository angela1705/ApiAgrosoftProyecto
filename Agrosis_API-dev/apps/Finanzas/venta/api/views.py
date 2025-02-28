from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Finanzas.venta.models import Venta
from apps.Finanzas.venta.api.serializers import VentaSerializer 
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead

class VentaViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead]
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer
