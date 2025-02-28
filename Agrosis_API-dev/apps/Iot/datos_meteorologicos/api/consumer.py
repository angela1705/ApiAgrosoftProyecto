import json
import random
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer

class DatosMeteorologicosConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("✅ Cliente conectado a WebSocket")
        await self.accept()
        self.running = True
        asyncio.create_task(self.simulador_datos())

    async def disconnect(self, close_code):
        print("❌ Cliente desconectado")
        self.running = False

    async def simulador_datos(self):
        """Genera datos meteorológicos aleatorios y los envía al cliente cada 3 segundos."""
        tipos_sensores = ["temperatura", "humedad", "viento", "iluminacion"]
        
        while self.running:
            tipo_sensor = random.choice(tipos_sensores)
            valor = round(random.uniform(0, 100), 2)  # Simula valores aleatorios
            mensaje = self.procesar_alerta(tipo_sensor, valor)

            # Si no hay alerta, indicar que las condiciones son normales
            if not mensaje:
                mensaje = f"✅ Condiciones normales para {tipo_sensor.capitalize()}."

            data = {
                "tipo_sensor": tipo_sensor,
                "valor": valor,
                "alerta": mensaje
            }

            # Enviar al cliente
            print(f"📢 Enviando alerta: {mensaje} (Sensor: {tipo_sensor.capitalize()}, Valor: {valor})")
            await self.send(text_data=json.dumps(data))

            # Simular retardo
            await asyncio.sleep(3)  # Envía datos cada 3 segundos

    def procesar_alerta(self, tipo_sensor, valor):
        """Genera un mensaje de alerta basado en los valores simulados."""
        if tipo_sensor == "temperatura":
            if valor > 35:
                return "🔥 Alerta alta: Temperatura elevada (>35°C)."
            elif valor < 5:
                return "❄️ Alerta baja: Temperatura muy baja (<5°C)."
        
        elif tipo_sensor == "humedad":
            if valor < 30:
                return "💦 Humedad baja (20-30%)."
            elif valor > 80:
                return "🌧️ Humedad alta (>80%)."
        
        elif tipo_sensor == "viento":
            if valor > 50:
                return "🌬️ Alerta: Viento fuerte (>50 km/h)."
        
        elif tipo_sensor == "iluminacion":
            if valor < 100:
                return "🔦 Poca iluminación (<100 lx)."

        return None  # Si no hay alerta, devuelve None
