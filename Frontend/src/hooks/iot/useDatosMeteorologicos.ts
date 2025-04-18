import { useState, useEffect } from "react";
import { SensorData } from "../../types/iot/type";

export const useDatosMeteorologicos = () => {
  const [latestData, setLatestData] = useState<SensorData[]>([]);
  const [chartData, setChartData] = useState<SensorData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.1.12:8000/ws/realtime/");

    ws.onopen = () => {
      console.log("Conectado al WebSocket de tiempo real");
      setIsLoading(false);
      setError(null);
    };

    ws.onmessage = (event: MessageEvent) => {
      console.log("Mensaje recibido del WebSocket:", event.data);
      const message = JSON.parse(event.data) as { type: string; data: SensorData };
      console.log("Mensaje parseado:", message);
      if (message.type === "realtime_data") {
        setLatestData((prev) => {
          const newData = [
            ...prev.filter((d) => d.fk_sensor !== message.data.fk_sensor),
            message.data,
          ];
          return newData;
        });
        setChartData((prev) => {
          const newChartData = [message.data, ...prev].slice(0, 10);
          return newChartData;
        });
      }
    };

    ws.onerror = (err: Event) => {
      console.error("Error en WebSocket:", err);
      setError(new Error("No se pudo conectar al WebSocket"));
      setIsLoading(false);
    };

    ws.onclose = () => {
      console.log("WebSocket cerrado");
      if (!latestData.length) setError(new Error("Conexión cerrada"));
      setIsLoading(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  return { data: latestData, chartData, isLoading, error };
};