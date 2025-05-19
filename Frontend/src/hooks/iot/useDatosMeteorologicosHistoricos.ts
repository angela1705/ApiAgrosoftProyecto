import { useQuery } from "@tanstack/react-query";
import api from "@/components/utils/axios"; 
import { SensorData } from "@/types/iot/type";

const API_URL = "http://192.168.1.12:8000/iot/datosmeteorologicos/";

const fetchDatosHistoricos = async (): Promise<SensorData[]> => {
  const response = await api.get(API_URL);
  return response.data.map((item: any) => ({
    id: item.id,
    fk_sensor: item.fk_sensor,
    temperatura: item.temperatura || null,
    humedad_ambiente: item.humedad_ambiente || null,
    fecha_medicion: item.fecha_medicion,
  }));
};

export const useDatosMeteorologicosHistoricos = () => {
  return useQuery<SensorData[], Error>({
    queryKey: ["datosMeteorologicosHistoricos"],
    queryFn: fetchDatosHistoricos,
  });
};