import { useQuery } from "@tanstack/react-query";
import api from "@/components/utils/axios";
import { SensorData } from "@/types/iot/type";

const API_URL = "http://192.168.1.12:8000/iot/datosmeteorologicos/";

const fetchDatosMeteorologicos = async (sensorId: number): Promise<SensorData[]> => {
  console.log(`Fetching data for sensor ${sensorId}`);
  const response = await api.get(API_URL, {
    params: { fk_sensor_id: sensorId },
  });
  console.log("Response from /iot/datosmeteorologicos/:", response.data);
  return response.data.map((item: any) => ({
    id: item.id,
    fk_sensor: item.fk_sensor,
    temperatura: item.temperatura || null,
    humedad_ambiente: item.humedad_ambiente || null,
    fecha_medicion: item.fecha_medicion,
  }));
};

export const useDatosMeteorologicos = (sensorId: number) => {
  return useQuery<SensorData[], Error>({
    queryKey: ["datosMeteorologicos", sensorId],
    queryFn: () => fetchDatosMeteorologicos(sensorId),
    enabled: !!sensorId,
  });
};