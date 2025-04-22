from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from apps.Finanzas.pagos.models import Pago
from apps.Finanzas.pagos.api.serializers import PagoSerializer, CalculoPagoSerializer, PagoCreateSerializer
from django.core.exceptions import ValidationError

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all().prefetch_related('actividades', 'salario')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return PagoCreateSerializer
        if self.action == 'calcular_pago':
            return CalculoPagoSerializer
        return PagoSerializer

    def create(self, request, *args, **kwargs):
        return Response(
            {"error": "Use el endpoint /calcular_pago/ para crear pagos"},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    @action(detail=False, methods=['post'])
    def calcular_pago(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                pago = serializer.save()
                return Response(
                    PagoSerializer(pago, context={'request': request}).data,
                    status=status.HTTP_201_CREATED
                )
            except ValidationError as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def historial_por_usuario(self, request):
        usuario_id = request.query_params.get('usuario_id')
        if not usuario_id:
            return Response(
                {"error": "Se requiere el parámetro usuario_id"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        pagos = Pago.objects.filter(
            actividades__usuarios__id=usuario_id
        ).distinct().order_by('-fecha_calculo')
        
        serializer = self.get_serializer(pagos, many=True)
        return Response(serializer.data)