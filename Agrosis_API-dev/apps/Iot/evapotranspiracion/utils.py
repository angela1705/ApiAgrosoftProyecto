import math
from datetime import datetime, timedelta
from django.db.models import Avg
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos
import logging

logger = logging.getLogger(__name__)

def calcular_penman_monteith(datos, latitud, altitud):
    """
    Calcula la evapotranspiración de referencia (ETo) usando Penman-Monteith.
    Entrada: datos (dict con temperatura, humedad_ambiente, luminosidad, velocidad_viento),
             latitud (grados), altitud (metros).
    Salida: ETo en mm/día.
    """
    try:
        T = datos.get('temperatura', None)
        RH = datos.get('humedad_ambiente', None)
        Rs = datos.get('luminosidad', None)
        u2 = datos.get('velocidad_viento', None)

        if not all([T, RH, Rs, u2]):
            logger.warning(f"Datos incompletos para Penman-Monteith: {datos}")
            return None

        # Constantes
        G = 0   
        P = 101.3 * ((293 - 0.0065 * altitud) / 293) ** 5.26   
        gamma = 0.665e-3 * P   

        # Radiación neta (Rn) aproximada desde luminosidad
        Rs = Rs / 1000  
        Rns = (1 - 0.23) * Rs   
        T_kelvin = T + 273.15
        Rnl = 4.903e-9 * ((T_kelvin ** 4 + (T_kelvin - 2) ** 4) / 2) * (0.34 - 0.14 * math.sqrt(RH / 100)) * (1.35 * Rs / (0.75 * Rs) - 0.35)
        Rn = Rns - Rnl

        # Pendiente de la curva de presión de vapor (Δ)
        delta = (4098 * (0.6108 * math.exp((17.27 * T) / (T + 237.3)))) / ((T + 237.3) ** 2)

        # Déficit de presión de vapor (ea - es)
        es = 0.6108 * math.exp((17.27 * T) / (T + 237.3))   
        ea = es * (RH / 100)   
        VPD = es - ea

        # ETo (mm/día)
        ETo = (0.408 * delta * (Rn - G) + gamma * (900 / (T + 273)) * u2 * VPD) / (delta + gamma * (1 + 0.34 * u2))
        ETo = max(0, round(ETo, 2))   
        logger.info(f"ETo calculado: {ETo} mm/día")
        return ETo
    except Exception as e:
        logger.error(f"Error en calcular_penman_monteith: {str(e)}", exc_info=True)
        return None

def calcular_evapotranspiracion_diaria(bancal_id, fecha, latitud=0, altitud=0):
    fecha_inicio = datetime.combine(fecha, datetime.min.time())
    fecha_fin = fecha_inicio + timedelta(days=1)
    logger.info(f"Buscando datos para bancal_id={bancal_id}, fecha={fecha}")
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
    logger.info(f"Datos agregados: {datos}")
    if not all(datos.values()):
        missing_fields = [k for k, v in datos.items() if v is None]
        logger.warning(f"Datos incompletos: {missing_fields}")
        return None
    return calcular_penman_monteith(datos, latitud, altitud)