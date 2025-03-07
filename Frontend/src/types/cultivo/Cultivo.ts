export interface Cultivo {
    id?: number;
    nombre: string;
    unidad_de_medida: string;
    estado: "activo" | "inactivo";
    fecha_siembra: string;  
    fk_especie: number;
    activo: boolean;
    fk_bancal: number;
  }
  