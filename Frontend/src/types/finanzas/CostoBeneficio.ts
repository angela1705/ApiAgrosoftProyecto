export interface AnalisisCostoBeneficio {
    cosecha: {
      id: number;
      cantidad: number;
      fecha: string;
      cultivo: string;
      cultivo_nombre: string;
      id_cultivo: number;
      unidades_de_medida: number;

    };
    costos: {
      mano_obra: number;
      insumos: number;
      herramientas: number;
    };
    ingresos: {
      ventas: number;
      stock_valorizado: number;
    };
    metricas: {
      total_costos: number;
      total_ingresos: number;
      rentabilidad: number;
      roi: number;
    };
  }
  
  export interface ResumenCosecha {
    cosecha_id: number;
    cultivo: string;
    fecha: string;
    rentabilidad: number;
    roi: number;
  }