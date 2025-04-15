export interface UnidadMedida {
    id: number;
    nombre: string;
    descripcion: string | null;
    creada_por_usuario: boolean;
    fecha_creacion: string;
}

export interface Insumo {
    id: number;
    nombre: string;
    descripcion: string;
    cantidad: number;
    unidad_medida: UnidadMedida | null;
    activo: boolean;
    tipo_empacado: string | null;
    fecha_registro: string;
    fecha_caducidad: string | null;
    precio_insumo: number;
}