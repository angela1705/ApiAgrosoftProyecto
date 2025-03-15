from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from ..models import Datos_metereologicos
from .serializers import Datos_metereologicosSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead
from rest_framework.permissions import AllowAny
import logging

logger = logging.getLogger(__name__)

class Datos_metereologicosViewset(ModelViewSet):
    serializer_class = Datos_metereologicosSerializer

    def get_queryset(self):
        # Obtener el queryset base
        queryset = Datos_metereologicos.objects.all()

        # Aplicar filtros desde los parámetros de la URL
        fk_sensor = self.request.query_params.get("fk_sensor", None)
        fecha = self.request.query_params.get("fecha_medicion__date", None)

        logger.info(f"Parámetros recibidos - fk_sensor: {fk_sensor}, fecha_medicion__date: {fecha}")

        if fk_sensor is not None:
            # Filtrar por el ID del sensor (fk_sensor_id)
            queryset = queryset.filter(fk_sensor__id=fk_sensor)
            logger.info(f"Filtrado por fk_sensor__id={fk_sensor}, resultados: {queryset.count()}")
        if fecha is not None:
            queryset = queryset.filter(fecha_medicion__date=fecha)
            logger.info(f"Filtrado por fecha_medicion__date={fecha}, resultados: {queryset.count()}")

        logger.info(f"Total de resultados después de filtros: {queryset.count()}")
        return queryset

    def get_authenticators(self):
        # Solo aplica JWTAuthentication para acciones que no sean POST
        # creo que lo cambie pero no me acuerdo revise yulian 
        if self.request.method != 'POST':
            return [JWTAuthentication()]
        return []

    def get_permissions(self):
        # Permite POST sin autenticación ni permisos, pero otras acciones requieren IsAuthenticated y IsAdminOrRead
        # solo para los sensores no se si se cambia
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated(), IsAdminOrRead()]