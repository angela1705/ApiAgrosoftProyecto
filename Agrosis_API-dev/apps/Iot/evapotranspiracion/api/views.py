from rest_framework import viewsets, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions             import IsAuthenticated
from rest_framework.decorators              import action
from rest_framework.response                import Response
from django_filters.rest_framework          import DjangoFilterBackend

from apps.Iot.evapotranspiracion.models           import Evapotranspiracion
from apps.Iot.evapotranspiracion.api.serializers  import EvapotranspiracionSerializer
from apps.Iot.evapotranspiracion.utils             import calcular_evapotranspiracion_diaria

class EvapotranspiracionViewSet(viewsets.ModelViewSet):
    queryset              = Evapotranspiracion.objects.all()
    serializer_class      = EvapotranspiracionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes    = [IsAuthenticated]
    filter_backends       = [DjangoFilterBackend]
    filterset_fields      = ["fk_bancal", "fecha"]

    @action(detail=False, methods=["post"], url_path="calcular", url_name="calcular")
    def calcular(self, request):
        """
        POST /api/iot/evapotranspiracion/calcular/
        body: { bancal_id, fecha: 'YYYY-MM-DD', latitud?, altitud? }
        """
        bancal_id = request.data.get("bancal_id")
        fecha     = request.data.get("fecha")
        latitud   = request.data.get("latitud", 0)
        altitud   = request.data.get("altitud", 0)

        try:
            from datetime import datetime
            fecha_dt = datetime.fromisoformat(fecha).date()
        except Exception:
            return Response(
                {"error": "Formato de fecha inválido. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST
            )

        ETo = calcular_evapotranspiracion_diaria(bancal_id, fecha_dt, latitud, altitud)
        if ETo is None:
            return Response(
                {"error": "No hay datos suficientes para calcular la evapotranspiración."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Guardar o actualizar en la tabla Evapotranspiracion
        evap, created = Evapotranspiracion.objects.update_or_create(
            fk_bancal_id=bancal_id,
            fecha=fecha_dt,
            defaults={"valor": ETo}
        )
        serializer = self.get_serializer(evap)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
