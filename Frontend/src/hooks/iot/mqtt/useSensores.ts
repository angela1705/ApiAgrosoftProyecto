import { useEffect, useState, useRef } from 'react';
import { subscribeToMqtt } from '@/components/utils/mqttClient';
import { SensorData } from '@/types/iot/iotmqtt';
import { addToast } from '@heroui/react';
import mqtt from 'mqtt';

export const useSensores = () => {
  const [realTimeData, setRealTimeData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mqttClient, setMqttClient] = useState<mqtt.MqttClient | null>(null);
  const lastDataTimestampRef = useRef<number | null>(null);
  const DATA_TIMEOUT = 15000;

  useEffect(() => {
    const client = mqtt.connect(
      'wss://92ae5e18dc884fefa81c4f3580a7485b.s1.eu.hivemq.cloud:8884/mqtt',
      {
        username: 'agrosoft',
        password: 'Agrosoft2025!',
        reconnectPeriod: 5000,
        connectTimeout: 10000,
        protocol: 'wss',
        clean: true,
        clientId: `react_client_${Math.random().toString(16).slice(3)}`,
        keepalive: 60,
      }
    );

    client.on('connect', () => {
      setMqttClient(client);
      setIsLoading(false);
      setError(null);
    });

    client.on('error', () => {
      addToast({
        title: 'Error',
        description: 'No se pudo conectar al broker MQTT',
        timeout: 3000,
        color: 'danger',
      });
      setError('No se pudo conectar al broker MQTT');
      setIsLoading(false);
    });

    return () => {
      client.end();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToMqtt(({ realTimeData, isConnected, error }) => {
      setRealTimeData(realTimeData);
      setIsLoading(!isConnected && !error);
      setError(error);
      lastDataTimestampRef.current = Date.now();
    });

    const timeoutCheck = setInterval(() => {
      if (
        lastDataTimestampRef.current &&
        Date.now() - lastDataTimestampRef.current > DATA_TIMEOUT
      ) {
        setRealTimeData([]);
      }
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(timeoutCheck);
    };
  }, []);

  return { realTimeData, isLoading, error, mqttClient };
};