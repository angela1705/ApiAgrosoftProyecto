import { Button } from "@mui/material";

export interface Notification {
  id: string;
  type: string;
  message: string;
  data: any;
  created_at: string;
  read: boolean;
}

export interface NotificationConfig {
  getTitle: (notification: Notification) => string;
  getRedirectButton?: (notification: Notification) => JSX.Element | null;
}

export const notificationConfigs: Record<string, NotificationConfig> = {
  ACTIVIDAD_ASIGNADA: {
    getTitle: (notification) => {
      const lines = notification.message.split("\n");
      return lines[0] || "Nueva Actividad Asignada";
    },
    getRedirectButton: (notification) => (
      <Button
        size="small"
        onClick={() => (window.location.href = `/actividades/${notification.data.actividad_id}`)}
      >
        Ver Actividad
      </Button>
    ),
  },
  INSUMO_CADUCANDO: {
    getTitle: (notification) => {
      const lines = notification.message.split("\n");
      return lines[0] || "Insumo Próximo a Caducar";
    },
    getRedirectButton: (notification) => (
      <Button
        size="small"
        onClick={() => (window.location.href = `/insumos/${notification.data.insumo_id}`)}
      >
        Ver Insumo
      </Button>
    ),
  },
  INSUMO_AGOTADO: {
    getTitle: (notification) => {
      const lines = notification.message.split("\n");
      return lines[0] || "Insumo Agotado";
    },
    getRedirectButton: (notification) => (
      <Button
        size="small"
        onClick={() => (window.location.href = `/insumos/${notification.data.insumo_id}`)}
      >
        Ver Insumo
      </Button>
    ),
  },
  PEST_ALERT: {
    getTitle: (notification) => {
      const lines = notification.message.split("\n");
      return lines[0] || "Alerta de Plaga";
    },
    getRedirectButton: (notification) => (
      <Button
        size="small"
        onClick={() => (window.location.href = `/plagas/${notification.data.plaga_id}`)}
      >
        Ver Plaga
      </Button>
    ),
  },
  OTHER: {
    getTitle: (notification) => {
      const lines = notification.message.split("\n");
      return lines[0] || "Notificación";
    },
    getRedirectButton: () => null,
  },
};