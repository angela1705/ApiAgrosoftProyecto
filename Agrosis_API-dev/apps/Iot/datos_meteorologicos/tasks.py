import asyncio
import logging
from datetime import datetime
from collections import defaultdict
from django.utils import timezone
from asgiref.sync import sync_to_async
from apps.Iot.datos_meteorologicos.models import DatosHistoricos
from apps.Iot.datos_meteorologicos.api.serializers import Datos_metereologicosSerializer

logger = logging.getLogger(__name__)

externals = globals()

async def process_historical_data():
    while True:
        try:
            logger.info("Iniciando procesamiento de datos históricos")
            buffer = externals.get('realtime_data_buffer', [])
            if not buffer:
                logger.info("Buffer vacío, esperando nuevos datos")
                await asyncio.sleep(120)  # Espera 2 minutos
                continue

            sensor_data = defaultdict(list)
            for data in buffer:
                sensor_id = data.get('fk_sensor')
                if sensor_id:
                    sensor_data[sensor_id].append(data)

            for sensor_id, data_list in sensor_data.items():
                try:
                    averages = defaultdict(list)
                    for data in data_list:
                        for key, value in data.items():
                            if key in Datos_metereologicosSerializer().fields and key not in ['fk_sensor', 'fk_bancal', 'fecha_medicion', 'sensor_nombre', 'bancal_nombre']:
                                if isinstance(value, (int, float)) and value is not None:
                                    averages[key].append(value)

                    avg_data = {
                        'fk_sensor_id': sensor_id,
                        'fk_bancal_id': data_list[0].get('fk_bancal'),
                        'fecha_promedio': timezone.now(),
                        'cantidad_mediciones': len(data_list),
                    }
                    for key, values in averages.items():
                        if values:
                            avg_data[key] = sum(values) / len(values)
                            logger.info(f"Promedio calculado para sensor {sensor_id}, {key}: {avg_data[key]}")
                        else:
                            avg_data[key] = None

                    await sync_to_async(DatosHistoricos.objects.create)(**avg_data)
                    logger.info(f"Datos históricos guardados para sensor {sensor_id}: {avg_data}")

                except Exception as e:
                    logger.error(f"Error procesando datos para sensor {sensor_id}: {str(e)}", exc_info=True)

            externals['realtime_data_buffer'] = []
            logger.info("Buffer limpiado")

        except Exception as e:
            logger.error(f"Error en process_historical_data: {str(e)}", exc_info=True)

        await asyncio.sleep(120)  # Espera 2 minutos

def start_background_task():
    return process_historical_data()