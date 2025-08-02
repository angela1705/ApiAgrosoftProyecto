import { ReactNode } from 'react';

export interface SensorData {
  id?: number | string;
  fk_sensor: number | string; 
  sensor_nombre?: string;
  fk_bancal?: number | null;
  bancal_nombre?: string | undefined;
  temperatura?: number | null;
  humedad_ambiente?: number | null;
  fecha_medicion: string;
  device_code?: string | undefined;
  [key: string]: number | string | null | undefined;
}

export interface Sensor {
  id: number;
  nombre: string;
  tipo_sensor: string;
  tipo_sensor_id: number;
  unidad_medida: string;
  descripcion?: string;
  estado: 'activo' | 'inactivo';
  medida_minima: number;
  medida_maxima: number;
  device_code?: string | null;
  bancal_id?: number | null;
  bancal_nombre?: string | null;
}

export interface TipoSensor {
  id?: number;
  label: string;
  nombre: string;
  key: string;  
  tipo_sensor: string;
  icon: ReactNode;
  tipo_sensor_id: number;
  decimals: number;
  unidad_medida: string;
  medida_minima: number;
  medida_maxima: number;
}

export interface ViewMode {
  id: 'realtime' | 'allData';
  label: string;
}

export interface DataTypeSelectorProps {
  selectedDataType: TipoSensor;
  setSelectedDataType: (type: TipoSensor) => void;
  dataTypes: TipoSensor[];
  className?: string;
}

export interface SensorChartsProps {
  realTimeData: SensorData[];
  selectedDataType: TipoSensor; // Usamos TipoSensor
  selectedSensor: number | 'todos';
}

export interface SensorStatsProps {
  realTimeData: SensorData[];
  selectedSensor: number | 'todos';
  selectedDataType: TipoSensor; // Usamos TipoSensor
}

export interface SensorTableProps {
  realTimeData: SensorData[];
  selectedDataType: TipoSensor;  
}
export interface EvapotranspiracionData {
  id: number;
  fk_bancal: number;
  fecha: string;
  valor: number;
  creado: string;
}