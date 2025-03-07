export interface Cultivo {
  id?: number;
  fk_especie: number; // ID de la especie
  fk_bancal: number; // ID del bancal
  nombre: string;
  unidad_de_medida?: string;
  activo: boolean;
  fechaSiembra: string; // Formato: YYYY-MM-DD
}