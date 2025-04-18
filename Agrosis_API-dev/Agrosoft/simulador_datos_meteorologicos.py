import asyncio
import websockets
import json
import random
from datetime import datetime

async def send_weather_data():
    uri = "ws://127.0.0.1:8000/ws/meteo/"
    async with websockets.connect(uri) as websocket:
        while True:
            data = {
                "fk_sensor": 1,
                "fk_bancal": 1,
                "temperatura": round(random.uniform(20.0, 30.0), 2),
                "humedad_ambiente": round(random.uniform(50.0, 70.0), 2),
                "luminosidad": round(random.uniform(4000.0, 6000.0), 2),
                "lluvia": round(random.uniform(0.0, 5.0), 2),
                "velocidad_viento": round(random.uniform(0.0, 10.0), 2),
                "direccion_viento": random.randint(0, 360),
                "humedad_suelo": round(random.uniform(40.0, 60.0), 2),
                "ph_suelo": round(random.uniform(6.0, 7.0), 2),
                "fecha_medicion": datetime.now().isoformat()
            }
            await websocket.send(json.dumps(data))
            print(f"Enviado: {data}")
            response = await websocket.recv()
            print(f"Recibido: {response}")
            await asyncio.sleep(10)

asyncio.run(send_weather_data())