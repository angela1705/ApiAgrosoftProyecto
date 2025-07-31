import { useQuery } from '@tanstack/react-query';
import api from '@/components/utils/axios';
import { addToast } from '@heroui/react';
import { TipoSensor } from '@/types/iot/type';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}/iot/tiposensor/`;

const fetchTipoSensores = async (): Promise<TipoSensor[]> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    addToast({
      title: 'Sesión expirada',
      description: 'Por favor, inicia sesión nuevamente.',
      timeout: 5000,
      color: 'danger',
    });
    throw new Error('No se encontró el token de autenticación.');
  }

  const response = await api.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  const mappedData: TipoSensor[] = response.data.map((item: any) => ({
    id: item.id ?? 0,
    label: item.nombre ?? 'Desconocido',
    key: item.nombre ? item.nombre.toLowerCase().replace(/\s/g, '_') : `sensor_${item.id ?? 0}`,
    icon: '📏',
    tipo_sensor_id: item.id ?? 0,
    decimals: item.decimals ?? 2,
    unidad_medida: item.unidad_medida ?? '',
    medida_minima: Number(item.medida_minima) ?? 0,
    medida_maxima: Number(item.medida_maxima) ?? 0,
  }));
  
  return mappedData;
};

export const useGetTipoSensores = () => {
  return useQuery<TipoSensor[], Error>({
    queryKey: ['tipoSensores'],
    queryFn: fetchTipoSensores,
    staleTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};