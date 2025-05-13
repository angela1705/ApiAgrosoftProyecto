import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SensorData } from "@/types/iot/type";

const API_URL = "http://192.168.1.12:8000/iot/datosmeteorologicos/";

const fetchDatosHistoricos = async (): Promise<SensorData[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const useDatosMeteorologicosHistoricos = () => {
  return useQuery<SensorData[], Error>({
    queryKey: ["datosMeteorologicosHistoricos"],
    queryFn: fetchDatosHistoricos,
  });
};