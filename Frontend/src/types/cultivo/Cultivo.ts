export interface Cultivo {
  id?: number;
  fk_especie: number; 
  fk_bancal: number; 
  nombre: string;
  unidad_de_medida?: string;
  activo: boolean;
  fechaSiembra: string; 
}