import { useEffect, useState } from "react";
import { Sensor, SensorData } from "@/types/iot/type";
import { addToast } from "@heroui/react";

export const useWebSocketData = (sensores: Sensor[]) => {
  const [realTimeData, setRealTimeData] = useState<SensorData[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.1.12:8000/ws/realtime/");
    ws.onopen = () => {
      addToast({
        title: "Éxito",
        description: "Conexión WebSocket establecida",
        timeout: 3000,
        color: "success",
      });
    };
    ws.onmessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "weather_data") {
          const sensor = sensores.find((s) => s.id === message.data.fk_sensor);
          if (sensor && sensor.estado === "activo") {
            const newData: SensorData = {
              id: message.data.id || Date.now(),
              fk_sensor: message.data.fk_sensor,
              temperatura: message.data.temperatura || null,
              humedad_ambiente: message.data.humedad_ambiente || null,
              fecha_medicion: message.data.fecha_medicion || new Date().toISOString(),
            };
            setRealTimeData((prev) => [...prev, newData].slice(-50));
          }
        }
      } catch (error) {
        addToast({
          title: "Error",
          description: "Error al procesar datos en tiempo real",
          timeout: 3000,
          color: "danger",
        });
      }
    };
    ws.onerror = () => {
      addToast({
        title: "Error",
        description: "Error en la conexión WebSocket",
        timeout: 3000,
        color: "danger",
      });
    };
    ws.onclose = () => {
      addToast({
        title: "Advertencia",
        description: "Conexión WebSocket cerrada, intentando reconectar...",
        timeout: 3000,
        color: "warning",
      });
    };
    return () => ws.close();
  }, [sensores]);

  return { realTimeData };
};