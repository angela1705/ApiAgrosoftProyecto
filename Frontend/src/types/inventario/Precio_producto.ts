export interface PrecioProducto {
    id: number;
    cultivo: number;
    unidad_medida_gramos: number;
    precio: number;
    fecha_registro: string;
    stock: number;
    fecha_caducidad: string | null; 
}