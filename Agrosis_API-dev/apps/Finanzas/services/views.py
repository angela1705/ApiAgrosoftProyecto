from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from apps.Finanzas.services.services import AnalisisCostoBeneficio
from apps.Cultivo.cosechas.models import Cosecha

class CostoBeneficioViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['get'], url_path='por-cosecha/(?P<cosecha_id>\d+)')
    def por_cosecha(self, request, cosecha_id=None):
        try:
            cosecha = Cosecha.objects.get(pk=cosecha_id)
            analisis = AnalisisCostoBeneficio.calcular_para_cosecha(cosecha)
            return Response(analisis)
        except Cosecha.DoesNotExist:
            return Response(
                {"error": "Cosecha no encontrada"},
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['get'], url_path='resumen-financiero')
    def resumen_financiero(self, request):
        ultimas_cosechas = Cosecha.objects.all().order_by('-fecha')[:5]
        
        analisis_recientes = []
        for cosecha in ultimas_cosechas:
            analisis = AnalisisCostoBeneficio.calcular_para_cosecha(cosecha)
            analisis_recientes.append({
                'cosecha': analisis['cosecha'],
                'rentabilidad': analisis['metricas']['rentabilidad'],
                'roi': analisis['metricas']['roi']
            })
        
        promedio_roi = sum(a['roi'] for a in analisis_recientes) / len(analisis_recientes) if analisis_recientes else 0
        
        return Response({
            'analisis_recientes': analisis_recientes,
            'promedio_roi': promedio_roi
        })