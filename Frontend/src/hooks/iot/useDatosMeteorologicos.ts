import { useQuery } from "@tanstack/react-query";
import api from "@/components/utils/axios";
import { SensorData } from "@/types/iot/type";

const API_URL = "http://192.168.1.12:8000/iot/datosmeteorologicos/realtime_get/";

const fetchDatosMeteorologicos = async (sensorId: number): Promise<SensorData[]> => {
  console.log(`Fetching data for sensor ${sensorId}`);
  const response = await api.get(API_URL, {
    params: { sensor_id: sensorId },
  });
  console.log("Response from /realtime_get/:", response.data);
  return response.data.map((item: any) => ({
    id: item.id,
    sensor: item.sensor,
    [item.tipo_sensor === 'ambient_humidity' ? 'humedad_ambiente' :
     item.tipo_sensor === 'temperatura' ? 'temperatura' :
     item.tipo_sensor === 'soil_humidity' ? 'humedad_suelo' :
     item.tipo_sensor === 'luminosity' ? 'luminosidad' :
     item.tipo_sensor === 'rainfall' ? 'lluvia' :
     item.tipo_sensor === 'wind_speed' ? 'velocidad_viento' :
     item.tipo_sensor === 'wind_direction' ? 'direccion_viento' :
     item.tipo_sensor === 'soil_ph' ? 'ph_suelo' : 'value']: item.value,
    fecha_medicion: item.fecha_medicion,
  }));
};

export const useDatosMeteorologicos = (sensorId: number) => {
  return useQuery<SensorData[], Error>({
    queryKey: ["datosMeteorologicos", sensorId],
    queryFn: () => fetchDatosMeteorologicos(sensorId),
    refetchInterval: 5000,
    enabled: !!sensorId,
  });
};