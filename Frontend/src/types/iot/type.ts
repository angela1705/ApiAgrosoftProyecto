import React from 'react'; 

export interface SensorData {
  id?: number | string;
  fk_sensor: number;
  sensor_nombre?: string;
  fk_bancal?: number;
  bancal_nombre?: string;
  temperatura?: number | null;
  humedad_ambiente?: number | null;
  humedad_suelo?: number | null;
  luminosidad?: number | null;
  lluvia?: number | null;
  velocidad_viento?: number | null;
  direccion_viento?: number | null;
  ph_suelo?: number | null;
  fecha_medicion: string;
}

export interface Sensor {
  id: number;
  nombre: string;
  tipo_sensor: string;
  unidad_medida: string;
  descripcion?: string;
  estado: 'activo' | 'inactivo';
  medida_minima: number;
  medida_maxima: number;
}

export interface Cultivo {
  id: number;
  nombre: string;
  latitud: number;
  Bancal: number;
}

export interface EvapotranspiracionData {
  id: number;
  fk_bancal: number;
  fecha: string;
  valor: number;
  creado: string;
}

export interface AnalisisCostoBeneficio {
  id: number;
  cosecha_id: number;
  analisis_mensual: {
    mes: string;
    costos: number;
    beneficios: number;
  }[];
}

export interface DataType {
  label: string;
  key: keyof SensorData;
  icon: React.ReactNode;  
  sensorId: number;
  decimals: number;
  tipo_sensor?: string;
}

export interface DataTypeSelectorProps {
  selectedDataType: DataType;
  setSelectedDataType: (type: DataType) => void;
}