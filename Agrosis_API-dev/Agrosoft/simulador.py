import asyncio
import websockets
import json
import random
from datetime import datetime
import django
import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Agrosoft.settings")
django.setup()

from apps.Iot.sensores.models import Sensor

# Obtener sensores de la base de datos
SENSORS = Sensor.objects.all()
SENSOR_TYPES = {sensor.tipo_sensor: sensor.id for sensor in SENSORS}

# Mapear claves de tipo_sensor a las esperadas por el serializer
TYPE_MAPPING = {
    "temperatura": "temperatura",
    "ambient_humidity": "humedad_ambiente",
    "soil_humidity": "humedad_suelo",
    "luminosidad": "luminosidad",
    "lluvia": "lluvia",
    "velocidad_viento": "velocidad_viento",
    "direccion_viento": "direccion_viento",
    "ph_suelo": "ph_suelo",
}

DATA_RANGES = {
    "temperatura": (20.0, 30.0),
    "humedad_ambiente": (50.0, 70.0),
    "humedad_suelo": (40.0, 60.0),
    "luminosidad": (4000.0, 6000.0),
    "lluvia": (0.0, 5.0),
    "velocidad_viento": (0.0, 10.0),
    "direccion_viento": (0, 360),
    "ph_suelo": (6.0, 7.0),
}

async def send_weather_data():
    uri = "ws://127.0.0.1:8000/ws/meteo/"
    while True:
        try:
            async with websockets.connect(uri, ping_interval=20, ping_timeout=30) as websocket:
                print("Conectado a ws/meteo/")
                while True:
                    for sensor in SENSORS:
                        if sensor.estado != 'activo':
                            continue  # Saltar sensores inactivos
                        sensor_type = sensor.tipo_sensor
                        serializer_key = TYPE_MAPPING.get(sensor_type, sensor_type)
                        data = {
                            "fk_sensor": sensor.id,
                            "fk_bancal": 1,
                            "fecha_medicion": datetime.now().isoformat()
                        }
                        if serializer_key == "direccion_viento":
                            data[serializer_key] = random.randint(*DATA_RANGES[serializer_key])
                        else:
                            data[serializer_key] = round(random.uniform(*DATA_RANGES[serializer_key]), 2)
                        await websocket.send(json.dumps(data))
                        print(f"Enviado: {data}")
                        try:
                            response = await asyncio.wait_for(websocket.recv(), timeout=5.0)
                            print(f"Recibido: {response}")
                        except asyncio.TimeoutError:
                            print("Timeout esperando respuesta, continuando...")
                    await asyncio.sleep(2)  # Cada 2 segundos
        except (websockets.exceptions.ConnectionClosedError, ConnectionRefusedError) as e:
            print(f"Error de conexión: {e}. Reintentando en 5 segundos...")
            await asyncio.sleep(5)
        except Exception as e:
            print(f"Error inesperado: {e}. Reintentando en 5 segundos...")
            await asyncio.sleep(5)

if __name__ == "__main__":
    asyncio.run(send_weather_data())