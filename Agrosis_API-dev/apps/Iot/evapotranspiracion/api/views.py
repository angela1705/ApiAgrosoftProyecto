# apps/Iot/evapotranspiracion/api/views.py
from rest_framework import viewsets, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from datetime import datetime, timedelta
from django.db.models import Max, Min
import logging

from apps.Iot.evapotranspiracion.models import Evapotranspiracion
from apps.Iot.evapotranspiracion.api.serializers import EvapotranspiracionSerializer
from apps.Iot.evapotranspiracion.utils import calcular_evapotranspiracion_diaria
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos

logger = logging.getLogger(__name__)

class EvapotranspiracionViewSet(viewsets.ModelViewSet):
    queryset = Evapotranspiracion.objects.all()
    serializer_class = EvapotranspiracionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["fk_bancal", "fecha"]

    @action(detail=False, methods=["post"], url_path="calcular", url_name="calcular")
    def calcular(self, request):
        """
        POST /api/iot/evapotranspiracion/calcular/
        body: { fk_bancal_id, fecha: 'YYYY-MM-DD', latitud? }
        """
        bancal_id = request.data.get("fk_bancal_id")
        if not bancal_id:
            logger.error("fk_bancal_id no proporcionado")
            return Response({"error": "fk_bancal_id es requerido"}, status=status.HTTP_400_BAD_REQUEST)
        
        fecha = request.data.get("fecha")
        if not fecha:
            logger.error("fecha no proporcionada")
            return Response({"error": "fecha es requerida"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            fecha_dt = datetime.fromisoformat(fecha).date()
        except Exception as e:
            logger.error(f"Formato de fecha inválido: {fecha}, error: {str(e)}")
            return Response(
                {"error": "Formato de fecha inválido. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        latitud = float(request.data.get("latitud", 0))
        
        ETo = calcular_evapotranspiracion_diaria(bancal_id, fecha_dt, latitud)
        if ETo is None:
            datos = Datos_metereologicos.objects.filter(
                fk_bancal_id=bancal_id,
                fecha_medicion__gte=datetime.combine(fecha_dt, datetime.min.time()),
                fecha_medicion__lt=datetime.combine(fecha_dt, datetime.min.time()) + timedelta(days=1)
            ).aggregate(
                t_max=Max("temperatura"),
                t_min=Min("temperatura")
            )
            missing_fields = []
            if datos["t_max"] is None:
                missing_fields.append("t_max")
            if datos["t_min"] is None:
                missing_fields.append("t_min")
            error_message = (
                f"No hay datos suficientes para calcular la evapotranspiración. Campos faltantes: {missing_fields}"
                if missing_fields
                else "Error en el cálculo de evapotranspiración. Revise los datos meteorológicos."
            )
            logger.warning(f"Datos insuficientes para bancal_id={bancal_id}, fecha={fecha_dt}, mensaje: {error_message}")
            return Response(
                {"error": error_message},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            evap, created = Evapotranspiracion.objects.update_or_create(
                fk_bancal_id=bancal_id,
                fecha=fecha_dt,
                defaults={"valor": ETo}
            )
            serializer = self.get_serializer(evap)
            logger.info(f"Evapotranspiración guardada para bancal_id={bancal_id}, fecha={fecha_dt}: {ETo}")
            return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error al guardar evapotranspiración: {str(e)}")
            return Response(
                {"error": f"Error al guardar los datos: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )