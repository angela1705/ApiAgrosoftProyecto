import { useEffect, useCallback, useRef } from "react";
import { webSocketService } from "@/hooks/websocket/webSocketService";

export interface Notification {
  id: string;
  type: string;
  message: string;
  data: any;
  created_at: string;
  read: boolean;
  recipient_id?: string; // Agregar recipient_id
}

export const useNotifications = (
  userId: string | undefined,
  addNotification: (notification: Notification) => void,
  onError: (error: string) => void
) => {
  const isInitialized = useRef(false);
  const lastUserId = useRef<string | undefined>(undefined);

  const handleNotification = useCallback(
    (notification: Notification) => {
      if (notification.recipient_id && notification.recipient_id !== userId) {
        console.warn(
          `[useNotifications] Notificación ignorada: destinada a recipient_id ${notification.recipient_id}, pero userId es ${userId}`
        );
        return;
      }
      console.log("[useNotifications] Recibiendo notificación:", notification);
      addNotification(notification);
    },
    [addNotification, userId]
  );

  const handleError = useCallback(
    (error: string) => {
      console.log("[useNotifications] Error recibido:", error);
      onError(error);
    },
    [onError]
  );

  useEffect(() => {
    if (!userId) {
      console.error("[useNotifications] No se proporcionó userId, omitiendo configuración de WebSocket");
      onError("No se proporcionó un ID de usuario válido");
      return;
    }

    if (isInitialized.current && lastUserId.current === userId) {
      console.log("[useNotifications] Hook ya inicializado para userId:", userId);
      return;
    }

    const timer = setTimeout(() => {
      console.log("[useNotifications] Inicializando WebSocket para userId:", userId);
      isInitialized.current = true;
      lastUserId.current = userId;

      webSocketService.connect(userId);
      webSocketService.addNotificationListener(handleNotification);
      webSocketService.addErrorListener(handleError);
    }, 1000);

    return () => {
      clearTimeout(timer);
      console.log("[useNotifications] Limpiando listeners para userId:", userId);
      webSocketService.removeNotificationListener(handleNotification);
      webSocketService.removeErrorListener(handleError);
      isInitialized.current = false;
    };
  }, [userId, handleNotification, handleError]);
};