export interface ActivityData {
  id: number;
  tipo_actividad_nombre: string;
  prioridad: string;
  descripcion: string;
}

export type NotificationType = 
  | "info" | "warning" | "success" | "error" | "low_stock" 
  | string; 

export interface NotificationBase {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string | number;
  source: 'activities' | 'bodega';
}

export interface ActivityNotification extends NotificationBase {
  source: 'activities';
  actividad: ActivityData;
}

export interface BodegaNotification extends NotificationBase {
  source: 'bodega';
  insumoId?: number;
}

export type Notification = ActivityNotification | BodegaNotification;