import { useQuery } from "@tanstack/react-query";
import api from "@/components/utils/axios"; 
import { SensorData } from "@/types/iot/type";

const API_URL = "http://127.0.0.1:8000/iot/datosmeteorologicos/";
 
const fetchDatosHistoricos = async (): Promise<SensorData[]> => {
  const response = await api.get(API_URL); 
  return response.data;
};
 
export const useDatosMeteorologicosHistoricos = () => {
  return useQuery<SensorData[], Error>({
    queryKey: ["datosMeteorologicosHistoricos"],
    queryFn: fetchDatosHistoricos,
  });
};
//---------------------------------------------------------------//