from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from apps.Finanzas.pagos.models import Pago
from apps.Finanzas.pagos.api.serializers import PagoSerializer, CalculoPagoSerializer, PagoCreateSerializer
from django.core.exceptions import ValidationError
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from django.db.models.functions import TruncMonth, ExtractWeekDay
from django.db.models import Max, F, Subquery, OuterRef
from apps.Finanzas.pagos.models import Pago


class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all().prefetch_related('actividades', 'salario')
    serializer_class = PagoSerializer

    
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
    

@action(detail=False, methods=['get'])
def datos_graficas(self, request):
    fecha_inicio = request.GET.get('fecha_inicio')
    fecha_fin = request.GET.get('fecha_fin')

    if not fecha_inicio or not fecha_fin:
        return Response({"error": "Debes proporcionar 'fecha_inicio' y 'fecha_fin'"}, status=400)

    # Total de pagos por mes
    pagos_por_mes = (
        Pago.objects
        .filter(fecha_calculo__range=[fecha_inicio, fecha_fin])
        .annotate(mes=TruncMonth('fecha_calculo'))
        .values('mes')
        .annotate(total_pago=Sum('total_pago'))
        .order_by('mes')
    )

    # Total de pagos por usuario
    pagos_por_usuario = (
        Pago.objects
        .filter(fecha_calculo__range=[fecha_inicio, fecha_fin])
        .values('usuario__nombre')
        .annotate(total_pago=Sum('total_pago'))
        .order_by('-total_pago')
    )

    # Total de pagos por día de la semana
    pagos_por_dia_semana = (
        Pago.objects
        .filter(fecha_calculo__range=[fecha_inicio, fecha_fin])
        .annotate(dia_semana=ExtractWeekDay('fecha_calculo'))
        .values('dia_semana')
        .annotate(total_pago=Sum('total_pago'))
        .order_by('dia_semana')
    )

    # Nombres de los días de la semana
    dias_nombres = {
        1: 'Lunes',
        2: 'Martes',
        3: 'Miércoles',
        4: 'Jueves',
        5: 'Viernes',
        6: 'Sábado',
        7: 'Domingo'
    }

    # Usuario más pagado por cada mes
    usuarios_top_por_mes = []
    for entry in pagos_por_mes:
        mes_actual = entry['mes']
        pagos_mes = (
            Pago.objects
            .filter(fecha_calculo__month=mes_actual.month, fecha_calculo__year=mes_actual.year)
            .values('usuario__nombre')
            .annotate(total_usuario=Sum('total_pago'))
            .order_by('-total_usuario')
        )
        if pagos_mes:
            usuarios_top_por_mes.append(pagos_mes[0]['usuario__nombre'])
        else:
            usuarios_top_por_mes.append("Sin datos")

    data = {
        'por_mes': {
            'meses': [p['mes'].strftime("%Y-%m") for p in pagos_por_mes],
            'total_pago': [float(p['total_pago']) for p in pagos_por_mes],
            'usuario_top': usuarios_top_por_mes,
        },
        'por_usuario': {
            'usuarios': [p['usuario__nombre'] for p in pagos_por_usuario],
            'total_pago': [float(p['total_pago']) for p in pagos_por_usuario],
        },
        'por_dia_semana': {
            'dias': [dias_nombres.get(p['dia_semana'], 'Desconocido') for p in pagos_por_dia_semana],
            'total_pago': [float(p['total_pago']) for p in pagos_por_dia_semana],
        }
    }

    return Response(data)
