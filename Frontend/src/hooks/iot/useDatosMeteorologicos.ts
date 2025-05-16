import { useQuery } from "@tanstack/react-query";
import api from "@/components/utils/axios";
import { SensorData } from "@/types/iot/type";

const API_URL = "http://127.0.0.1:8000/iot/datosmeteorologicos/";

const fetchDatosMeteorologicos = async (sensorId: number): Promise<SensorData[]> => {
  console.log(`Fetching data for sensor ${sensorId}`);
  const response = await api.get(API_URL, {
    params: { fk_sensor_id: sensorId },
  });
  console.log("Response from /iot/datosmeteorologicos/:", response.data);
  return response.data.map((item: any) => ({
    id: item.id,
    fk_sensor_id: item.fk_sensor_id,
    temperatura: item.temperatura || null,
    humedad_ambiente: item.humedad_ambiente || null,
    humedad_suelo: item.humedad_suelo || null,
    luminosidad: item.luminosidad || null,
    lluvia: item.lluvia || null,
    velocidad_viento: item.velocidad_viento || null,
    direccion_viento: item.direccion_viento || null,
    ph_suelo: item.ph_suelo || null,
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