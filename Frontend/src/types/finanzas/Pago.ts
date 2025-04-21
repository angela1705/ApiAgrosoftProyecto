export interface Pago {
    id?: number;
    salario: number; 
    tiempo_trabajado: number;
    total_a_pagar: number | null;
    periodo_inicio: string; 
    periodo_fin: string;
  }
  