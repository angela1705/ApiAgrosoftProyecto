import paho.mqtt.client as mqtt
import websocket
import json
import time
from datetime import datetime, timezone
import logging
import ssl
import importlib.metadata
import threading
 
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
 
MQTT_BROKER = "92ae5e18dc884fefa81c4f3580a7485b.s1.eu.hivemq.cloud"
MQTT_PORT = 8883
MQTT_TOPIC_TEMP = "sensor/dht22/temperature"
MQTT_TOPIC_HUM = "sensor/dht22/humidity"
MQTT_CLIENT_ID = "Python_MQTT_Client"
MQTT_USER = "agrosoft"
MQTT_PASSWORD = "Agrosoft2025!"
 
WS_URL = "ws://127.0.0.1:8000/ws/meteo/"
SENSOR_ID_TEMP = 1
SENSOR_ID_HUM = 2
BANCAL_ID = 1
 
latest_data = {"temperatura": None, "humedad_ambiente": None}
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
        logger.info("Conectado al broker MQTT")
        client.subscribe([(MQTT_TOPIC_TEMP, 0), (MQTT_TOPIC_HUM, 0)])
        logger.info(f"Suscrito a {MQTT_TOPIC_TEMP} y {MQTT_TOPIC_HUM}")
    else:
        logger.error(f"Fallo al conectar, código: {rc}")

def on_message(client, userdata, msg):
    global latest_data
    try:
        value = float(msg.payload.decode())
        topic = msg.topic
        logger.debug(f"Mensaje recibido: {topic} = {value}")

        if topic == MQTT_TOPIC_TEMP:
            latest_data["temperatura"] = value
            send_to_websocket(SENSOR_ID_TEMP, latest_data["temperatura"], None)
        elif topic == MQTT_TOPIC_HUM:
            latest_data["humedad_ambiente"] = value
            send_to_websocket(SENSOR_ID_HUM, None, latest_data["humedad_ambiente"])

        latest_data = {"temperatura": None, "humedad_ambiente": None}
    except Exception as e:
        logger.error(f"Error procesando mensaje MQTT: {str(e)}")

def send_to_websocket(sensor_id, temperatura=None, humedad_ambiente=None):
    global ws
    try:
        with ws_lock:
            if ws is None or ws.sock is None:
                ws = websocket.WebSocket()
                ws.connect(WS_URL)
                logger.info("Conexión WebSocket establecida")

            data = {
                "fk_sensor": sensor_id,
                "fk_bancal": BANCAL_ID,
                "fecha_medicion": datetime.now(timezone.utc).isoformat(),
                "temperatura": temperatura,
                "humedad_ambiente": humedad_ambiente
            }
            logger.info(f"Enviando al WebSocket: {data}")
            ws.send(json.dumps(data))
            response = ws.recv()
            logger.info(f"Respuesta del WebSocket: {response}")
    except Exception as e:
        logger.error(f"Error enviando al WebSocket: {str(e)}")
        with ws_lock:
            if ws:
                ws.close()
                ws = None

client.on_connect = on_connect
client.on_message = on_message

try:
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
except Exception as e:
    logger.error(f"Error conectando al broker MQTT: {str(e)}")
    exit(1)

client.loop_start()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    logger.info("Deteniendo script...")
    client.loop_stop()
    with ws_lock:
        if ws:
            ws.close()
    client.disconnect()