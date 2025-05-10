export interface Venta {
    id?: number;     
    producto: number;   
    cantidad: number;    
    total: number;     
    fecha: string;      
    precio: number;
    monto_entregado: number,
    cambio: number,
    unidades_de_medida: number,      
}
