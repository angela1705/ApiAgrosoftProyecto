from rest_framework import viewsets, status
from rest_framework.response import Response
from apps.Cultivo.cosechas.models import Cosecha
from apps.Finanzas.costo_beneficio.models import AnalisisCostoBeneficio
from apps.Finanzas.costo_beneficio.api.serializer import AnalisisCostoBeneficioSerializer
from apps.Finanzas.services.services import AnalisisCostoBeneficio as ServicioAnalisis

class CostoBeneficioViewSet(viewsets.ViewSet):

    def calcular_y_guardar(self, request, cosecha_id=None):
        try:
            cosecha = Cosecha.objects.get(pk=cosecha_id)
            resultado = ServicioAnalisis.calcular_para_cosecha(cosecha)

            analisis_db, created = AnalisisCostoBeneficio.objects.update_or_create(
                cosecha=cosecha,
                defaults={
                    'mano_obra': resultado['costos']['mano_obra'],
                    'insumos': resultado['costos']['insumos'],
                    'total_costos': resultado['metricas']['total_costos'],
                    'total_ingresos': resultado['metricas']['total_ingresos'],
                    'rentabilidad': resultado['metricas']['rentabilidad'],
                    'roi': resultado['metricas']['roi'],
                }
            )

            serializer = AnalisisCostoBeneficioSerializer(analisis_db)
            return Response(serializer.data)

        except Cosecha.DoesNotExist:
            return Response({'error': 'Cosecha no encontrada'}, status=status.HTTP_404_NOT_FOUND)
