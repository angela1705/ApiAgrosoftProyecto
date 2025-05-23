# apps/Iot/evapotranspiracion/utils.py
from datetime import datetime, timedelta
from django.db.models import Max, Min
import math
import logging
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos

logger = logging.getLogger(__name__)

def calcular_hargreaves(t_max, t_min, latitud, fecha):
    try:
        # Convertir Decimal a float
        t_max = float(t_max)
        t_min = float(t_min)
        t_mean = (t_max + t_min) / 2

        # Radiación solar extraterrestre (Ra) aproximada
        # Simplificación basada en la latitud y el día del año
        dia_del_año = fecha.timetuple().tm_yday
        phi = math.radians(latitud)
        dr = 1 + 0.033 * math.cos(2 * math.pi / 365 * dia_del_año)
        delta = 0.409 * math.sin(2 * math.pi / 365 * dia_del_año - 1.39)
        ws = math.acos(-math.tan(phi) * math.tan(delta))
        ra = (24 * 60 / math.pi) * 0.082 * dr * (ws * math.sin(phi) * math.sin(delta) + math.cos(phi) * math.cos(delta) * math.sin(ws))

        # Fórmula de Hargreaves
        eto = 0.0023 * (t_mean + 17.8) * math.sqrt(t_max - t_min) * ra
        logger.info(f"ETo calculado (Hargreaves): {eto:.2f} mm/día")
        return eto
    except Exception as e:
        logger.error(f"Error en calcular_hargreaves: {str(e)}")
        return None

def calcular_evapotranspiracion_diaria(bancal_id, fecha, latitud=0):
    fecha_inicio = datetime.combine(fecha, datetime.min.time())
    fecha_fin = fecha_inicio + timedelta(days=1)
    logger.info(f"Buscando datos para bancal_id={bancal_id}, fecha={fecha}")
    datos = Datos_metereologicos.objects.filter(
        fk_bancal_id=bancal_id,
        fecha_medicion__gte=fecha_inicio,
        fecha_medicion__lt=fecha_fin
    ).aggregate(
        t_max=Max("temperatura"),
        t_min=Min("temperatura")
    )
    logger.info(f"Datos agregados: {datos}")
    logger.info(f"Registros crudos: {list(Datos_metereologicos.objects.filter(
        fk_bancal_id=bancal_id,
        fecha_medicion__gte=fecha_inicio,
        fecha_medicion__lt=fecha_fin
    ).values('temperatura', 'fecha_medicion'))}")
    if not all(datos.values()):
        missing_fields = [k for k, v in datos.items() if v is None]
        logger.warning(f"Datos incompletos: {missing_fields}")
        return None
    return calcular_hargreaves(datos["t_max"], datos["t_min"], latitud, fecha)