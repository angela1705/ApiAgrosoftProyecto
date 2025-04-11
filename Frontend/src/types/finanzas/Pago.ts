export interface Pago {
    id?: number;  
    horas_trabajadas: number;
    salario: number; 
    total_a_pagar: number | null;
    usuario: number; 
    periodo_inicio: string;  
    periodo_fin: string;    
    horas_extras: number;
    auxilio_transporte: number | null;
}