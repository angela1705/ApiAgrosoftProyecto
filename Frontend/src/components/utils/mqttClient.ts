import mqtt from 'mqtt';
import { SensorData } from '@/types/iot/iotmqtt';

// Configuración MQTT
const MQTT_HOST = 'wss://92ae5e18dc884fefa81c4f3580a7485b.s1.eu.hivemq.cloud:8884/mqtt';
const MQTT_USER = 'agrosoft';
const MQTT_PASSWORD = 'Agrosoft2025!';
const TOPIC_TEMP = 'sensor/dht22/temperature';
const TOPIC_HUM = 'sensor/dht22/humidity';
const TOPIC_SOIL = 'sensor/soil/moisture';
const TOPIC_AIR = 'sensor/mq135/air_quality';
const TOPIC_LIGHT = 'sensor/ldr/light';

// Estado global
let realTimeData: SensorData[] = [];
let isConnected = false;
let error: string | null = null;
const listeners: Array<(data: {
  realTimeData: SensorData[];
  isConnected: boolean;
  error: string | null;
}) => void> = [];

// Cliente MQTT
const client = mqtt.connect(MQTT_HOST, {
  username: MQTT_USER,
  password: MQTT_PASSWORD,
  reconnectPeriod: 5000,
  connectTimeout: 10000,
  protocol: 'wss',
  clean: true,
  clientId: `react_client_${Math.random().toString(16).slice(3)}`,
  keepalive: 60,
});

// Manejo de eventos
client.on('connect', () => { 
  isConnected = true;
  error = null;
  setTimeout(() => {
    client.subscribe([TOPIC_TEMP, TOPIC_HUM, TOPIC_SOIL, TOPIC_AIR, TOPIC_LIGHT], { qos: 0 }, (err) => {
      if (err) { 
        error = 'Error al suscribirse a los tópicos: ' + err.message;
      } else {
 }
      notifyListeners();
    });
  }, 1000);
});

client.on('message', (topic, message) => {
  try {
    const payload = message.toString();
    // Separar device_code y valor
    const parts = payload.split(':');
    if (parts.length !== 2) { 
      return;
    }
    const device_code = parts[0].trim();
    const valueStr = parts[1].trim();
    const value = parseFloat(valueStr);
    if (isNaN(value)) { 
      return;
    }
    const newData: SensorData = {
      id: Date.now() + Math.random(), // Asegurar ID único
      device_code: device_code,
      temperatura: topic === TOPIC_TEMP ? value : undefined,
      humedad_ambiente: topic === TOPIC_HUM ? value : undefined,
      humedad_suelo: topic === TOPIC_SOIL ? value : undefined,
      calidad_aire: topic === TOPIC_AIR ? value : undefined,
      luminosidad: topic === TOPIC_LIGHT ? value : undefined,
      fecha_medicion: new Date().toISOString(),
    };
    // Añadir nuevo registro sin sobrescribir
    realTimeData = [...realTimeData, newData].slice(-50); // Limitar a los últimos 50 registros 
    notifyListeners();
  } catch (err) { 
    error = 'Error al procesar datos MQTT';
    notifyListeners();
  }
});

client.on('error', (err) => { 
  error = 'Error de conexión MQTT: ' + err.message;
  isConnected = false;
  notifyListeners();
});

client.on('close', () => { 
  isConnected = false;
  error = 'Conexión MQTT cerrada, intentando reconectar...';
  notifyListeners();
});

function notifyListeners() {
  listeners.forEach((listener) =>
    listener({ realTimeData, isConnected, error })
  );
}

export function subscribeToMqtt(
  callback: (data: {
    realTimeData: SensorData[];
    isConnected: boolean;
    error: string | null;
  }) => void
) {
  listeners.push(callback);
  callback({ realTimeData, isConnected, error });
  return () => {
    const index = listeners.indexOf(callback);
    if (index !== -1) listeners.splice(index, 1);
  };
}