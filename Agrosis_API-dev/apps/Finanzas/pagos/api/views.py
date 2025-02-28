from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Finanzas.pagos.models import Pago
from apps.Finanzas.pagos.api.serializers import PagoSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead

class PagoViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead]
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
    def perform_create(self, serializer):
        pago = serializer.save()
        pago.calcular_total()
        pago.save()  
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
