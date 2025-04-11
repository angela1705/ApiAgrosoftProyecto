from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from datetime import date
from apps.Finanzas.pagos.models import Pago
from apps.Finanzas.pagos.api.serializers import PagoSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead
from apps.Finanzas.salario.models import Salario  

class PagoViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead]
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

    def perform_create(self, serializer):
        salario_vigente = Salario.objects.filter(
            fecha_de_implementacion__lte=date.today(),
            fecha_de_vencimiento__gte=date.today()
        ).first()
        
        if not salario_vigente:
            raise serializers.ValidationError("No hay un salario vigente configurado")
        
        periodo_inicio = serializer.validated_data.get('periodo_inicio')
        periodo_fin = serializer.validated_data.get('periodo_fin')
        
        if not periodo_inicio or not periodo_fin:
            raise serializers.ValidationError("Debe especificar periodo_inicio y periodo_fin")
        
        pago = serializer.save(
            salario=salario_vigente,
            horas_trabajadas=0
        )
        
        pago.calcular_total()
        pago.save()

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except serializers.ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        return super().list(request, *args,**kwargs)