# apps/Finanzas/precio_producto/api/views.py
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Finanzas.precio_producto.models import PrecioProducto
from apps.Finanzas.precio_producto.api.serializers import PrecioProductoSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead

class PrecioProductoViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead]
    queryset = PrecioProducto.objects.all()
    serializer_class = PrecioProductoSerializer