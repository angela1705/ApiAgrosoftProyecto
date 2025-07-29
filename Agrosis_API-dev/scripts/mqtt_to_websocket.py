import paho.mqtt.client as mqtt
import websocket
import json
import time
import logging
import ssl
import importlib.metadata
import threading
from datetime import datetime, timezone

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MQTT_BROKER = "92ae5e18dc884fefa81c4f3580a7485b.s1.eu.hivemq.cloud"
MQTT_PORT = 8883
MQTT_TOPIC_TEMP = "sensor/dht22/temperature"
MQTT_TOPIC_HUM = "sensor/dht22/humidity"
MQTT_TOPIC_SOIL = "sensor/soil/moisture"
MQTT_TOPIC_AIR = "sensor/mq135/air_quality"
MQTT_TOPIC_LIGHT = "sensor/ldr/light"
MQTT_CLIENT_ID = "Python_MQTT_Client"
MQTT_USER = "agrosoft"
MQTT_PASSWORD = "Agrosoft2025!"
WS_URL = "ws://127.0.0.1:8000/ws/realtime/"
SENSOR_ID_TEMP = 1
SENSOR_ID_HUM = 2
SENSOR_ID_SOIL = 3
SENSOR_ID_AIR = 4
SENSOR_ID_LIGHT = 5
BANCAL_ID = 1

latest_data = {
    "temperatura": None,
    "humedad_ambiente": None,
    "humedad_suelo": None,
    "calidad_aire": None,
    "luminosidad": None
}
ws = None
ws_lock = threading.Lock()

try:
    paho_version = importlib.metadata.version("paho-mqtt")
    logger.info(f"Versión de paho-mqtt instalada: {paho_version}")
    if float(paho_version.split('.')[0]) >= 2.0:
        from paho.mqtt.client import Client as MQTTClient
        client = MQTTClient(client_id=MQTT_CLIENT_ID, protocol=mqtt.MQTTv311)
    else:
        client = mqtt.Client(client_id=MQTT_CLIENT_ID, protocol=mqtt.MQTTv311)
except Exception as e:
    logger.warning(f"No se pudo detectar la versión de paho-mqtt: {str(e)}. Usando API antigua.")
    client = mqtt.Client(client_id=MQTT_CLIENT_ID, protocol=mqtt.MQTTv311)

client.username_pw_set(MQTT_USER, MQTT_PASSWORD)
client.tls_set(tls_version=ssl.PROTOCOL_TLS)

def on_connect(client, userdata, flags, rc, properties=None):
    if rc == 0:
        logger.info("[mqtt_to_websocket] Conectado al broker MQTT")
        client.subscribe([
            (MQTT_TOPIC_TEMP, 0),
            (MQTT_TOPIC_HUM, 0),
            (MQTT_TOPIC_SOIL, 0),
            (MQTT_TOPIC_AIR, 0),
            (MQTT_TOPIC_LIGHT, 0)
        ])
        logger.info(f"[mqtt_to_websocket] Suscrito a {MQTT_TOPIC_TEMP}, {MQTT_TOPIC_HUM}, {MQTT_TOPIC_SOIL}, {MQTT_TOPIC_AIR}, {MQTT_TOPIC_LIGHT}")
    else:
        logger.error(f"[mqtt_to_websocket] Fallo al conectar, código: {rc}")

def on_message(client, userdata, msg):
    global latest_data
    try:
        payload = msg.payload.decode()
        parts = payload.split(':')
        if len(parts) != 2:
            logger.error(f"[mqtt_to_websocket] Formato inválido en {msg.topic}: {payload}")
            return
        device_code = parts[0].strip()
        value = float(parts[1].strip())
        logger.debug(f"[mqtt_to_websocket] Mensaje recibido: {msg.topic} = {value} (device_code: {device_code})")

        if msg.topic == MQTT_TOPIC_TEMP:
            latest_data["temperatura"] = value
            send_to_websocket(SENSOR_ID_TEMP, device_code, temperatura=value)
        elif msg.topic == MQTT_TOPIC_HUM:
            latest_data["humedad_ambiente"] = value
            send_to_websocket(SENSOR_ID_HUM, device_code, humedad_ambiente=value)
        elif msg.topic == MQTT_TOPIC_SOIL:
            latest_data["humedad_suelo"] = value
            send_to_websocket(SENSOR_ID_SOIL, device_code, humedad_suelo=value)
        elif msg.topic == MQTT_TOPIC_AIR:
            latest_data["calidad_aire"] = value
            send_to_websocket(SENSOR_ID_AIR, device_code, calidad_aire=value)
        elif msg.topic == MQTT_TOPIC_LIGHT:
            latest_data["luminosidad"] = value
            send_to_websocket(SENSOR_ID_LIGHT, device_code, luminosidad=value)

    except ValueError as e:
        logger.error(f"[mqtt_to_websocket] Error procesando valor numérico en {msg.topic}: {str(e)}")
    except Exception as e:
        logger.error(f"[mqtt_to_websocket] Error procesando mensaje MQTT: {str(e)}")

def send_to_websocket(sensor_id, device_code, **kwargs):
    global ws
    try:
        with ws_lock:
            if ws is None or ws.sock is None:
                ws = websocket.WebSocket()
                ws.connect(WS_URL)
                logger.info("[mqtt_to_websocket] Conexión WebSocket establecida")

            data = {
                "fk_sensor": sensor_id,
                "device_code": device_code,
                "fk_bancal": BANCAL_ID,
                "fecha_medicion": datetime.now(timezone.utc).isoformat(),
                "temperatura": kwargs.get("temperatura"),
                "humedad_ambiente": kwargs.get("humedad_ambiente"),
                "humedad_suelo": kwargs.get("humedad_suelo"),
                "calidad_aire": kwargs.get("calidad_aire"),
                "luminosidad": kwargs.get("luminosidad"),
                "lluvia": None,
                "velocidad_viento": None,
                "direccion_viento": None,
                "ph_suelo": None
            }
            logger.info(f"[mqtt_to_websocket] Enviando al WebSocket: {data}")
            ws.send(json.dumps(data))
            response = ws.recv()
            logger.info(f"[mqtt_to_websocket] Respuesta del WebSocket: {response}")
    except Exception as e:
        logger.error(f"[mqtt_to_websocket] Error enviando al WebSocket: {str(e)}")
        with ws_lock:
            if ws:
                ws.close()
                ws = None
        # Reintentar conexión después de 5 segundos
        threading.Timer(5.0, send_to_websocket, args=(sensor_id, device_code), kwargs=kwargs).start()

client.on_connect = on_connect
client.on_message = on_message

try:
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
except Exception as e:
    logger.error(f"[mqtt_to_websocket] Error conectando al broker MQTT: {str(e)}")
    exit(1)

client.loop_start()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    logger.info("[mqtt_to_websocket] Deteniendo script...")
    client.loop_stop()
    with ws_lock:
        if ws:
            ws.close()
    client.disconnect()