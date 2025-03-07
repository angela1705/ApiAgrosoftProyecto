export interface Actividad {
    id?: number;
    tipo_actividad: number;
    programacion: number;   
    descripcion: string;
    fecha_inicio: string;   
    fecha_fin: string;     
    usuario: number;        
    cultivo: number;        
    insumo: number;         
    cantidadUsada: number;
}