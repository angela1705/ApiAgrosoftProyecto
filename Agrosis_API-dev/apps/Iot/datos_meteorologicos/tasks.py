import asyncio
import logging
from datetime import datetime, timedelta
from django.utils import timezone
from django.db.models import Avg
from asgiref.sync import sync_to_async
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos, DatosHistoricos
from apps.Iot.sensores.models import Sensor

logger = logging.getLogger(__name__)

async def process_historical_data():
    while True:
        try:
            logger.info("[process_historical_data] Iniciando procesamiento de datos históricos")

            # Obtener datos de las últimas 2 minutos
            time_threshold = timezone.now() - timedelta(minutes=2)
            recent_data = await sync_to_async(Datos_metereologicos.objects.filter)(
                fecha_medicion__gte=time_threshold
            )

            # Agrupar datos por sensor
            sensor_data = {}
            async for data in recent_data:
                sensor_id = data.fk_sensor_id
                if sensor_id not in sensor_data:
                    sensor_data[sensor_id] = []
                sensor_data[sensor_id].append(data)

            # Procesar promedios por sensor
            for sensor_id, data_list in sensor_data.items():
                try:
                    if not data_list:
                        continue

                    averages = {
                        'temperatura': 0.0,
                        'humedad_ambiente': 0.0,
                        'humedad_suelo': 0.0,
                        'calidad_aire': 0.0,
                        'luminosidad': 0.0,
                        'lluvia': 0.0,
                        'velocidad_viento': 0.0,
                        'direccion_viento': 0.0,
                        'ph_suelo': 0.0,
                    }
                    counts = {key: 0 for key in averages}

                    for data in data_list:
                        for field in averages:
                            value = getattr(data, field)
                            if value is not None:
                                averages[field] += float(value)
                                counts[field] += 1

                    avg_data = {
                        'fk_sensor_id': sensor_id,
                        'fk_bancal_id': data_list[0].fk_bancal_id if data_list[0].fk_bancal else None,
                        'fecha_promedio': timezone.now(),
                        'cantidad_mediciones': len(data_list),
                    }
                    for field in averages:
                        if counts[field] > 0:
                            avg_data[field] = averages[field] / counts[field]
                            logger.info(f"[process_historical_data] Promedio calculado para sensor {sensor_id}, {field}: {avg_data[field]}")
                        else:
                            avg_data[field] = None

                    await sync_to_async(DatosHistoricos.objects.create)(**avg_data)
                    logger.info(f"[process_historical_data] Datos históricos guardados para sensor {sensor_id}")

                    # Opcional: Eliminar datos procesados
                    await sync_to_async(recent_data.filter(fk_sensor_id=sensor_id).delete)()

                except Exception as e:
                    logger.error(f"[process_historical_data] Error procesando datos para sensor {sensor_id}: {str(e)}", exc_info=True)

        except Exception as e:
            logger.error(f"[process_historical_data] Error general: {str(e)}", exc_info=True)

        await asyncio.sleep(120)  # Esperar 2 minutos

def start_background_task():
    return process_historical_data()