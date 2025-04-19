export interface Sensor {
  id: number;
  nombre: string;
  tipo_sensor: string;
  unidad_medida: string;
  descripcion?: string;
  medida_minima?: number;
  medida_maxima?: number;
}

export interface SensorData {
  id?: number;
  fk_sensor: number;
  temperatura: number | null;
  humedad_ambiente: number | null;
  humedad_suelo: number | null;
  luminosidad: number | null;
  lluvia: number | null;
  velocidad_viento: number | null;
  direccion_viento: number | null;
  ph_suelo: number | null;
  fecha_medicion?: string;
  message?: string;
}

export interface LluviaData {
  cantidad: number | null;
  intensidad: number | null;
  duracion: number | null;
  frecuencia: number | null;
  fecha_medicion?: string;
}