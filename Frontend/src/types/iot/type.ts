export interface SensorData {
  id?: number | string;
  sensor: number;
  temperatura?: number;
  humedad_ambiente?: number;
  humedad_suelo?: number;
  luminosidad?: number;
  lluvia?: number;
  velocidad_viento?: number;
  direccion_viento?: number;
  ph_suelo?: number;
  value?: number;
  fecha_medicion: string;
  fecha?: string; // Añadido para useEvapotranspiracion.ts
}

export interface Sensor {
  id: number;
  nombre: string;
  tipo_sensor: string;
  unidad_medida: string;
  descripcion?: string;
  estado: 'activo' | 'inactivo';
}

export interface Cultivo {
  id: number;
  nombre: string;
  latitud: number; // Añadido para useEvapotranspiracion.ts
  bancal: number; // Añadido para useEvapotranspiracion.ts
  // Otros campos según tu modelo
}

export interface EvapotranspiracionData {
  id: number;
  cultivo_id: number;
  fecha: string;
  evapotranspiracion: number; 
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