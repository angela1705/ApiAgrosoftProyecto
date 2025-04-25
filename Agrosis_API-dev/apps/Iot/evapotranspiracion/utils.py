import math
from datetime import datetime, timedelta
from django.db.models import Avg
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos

def calcular_penman_monteith(datos_diarios, latitud, altitud):
    # ... (implementación completa que ya tienes) ...
    # retorna ETo en mm/día

def calcular_evapotranspiracion_diaria(bancal_id, fecha, latitud=0, altitud=0):
    fecha_inicio = datetime.combine(fecha, datetime.min.time())
    fecha_fin    = fecha_inicio + timedelta(days=1)
    datos = Datos_metereologicos.objects.filter(
        fk_bancal_id=bancal_id,
        fecha_medicion__gte=fecha_inicio,
        fecha_medicion__lt=fecha_fin
    ).aggregate(
        temperatura=Avg("temperatura"),
        humedad_ambiente=Avg("humedad_ambiente"),
        luminosidad=Avg("luminosidad"),
        velocidad_viento=Avg("velocidad_viento")
    )

    if not all(datos.values()):
        return None

    return calcular_penman_monteith(datos, latitud, altitud)
