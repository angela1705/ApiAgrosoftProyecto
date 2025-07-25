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
            return;
          }
      addNotification(notification);
    },
    [addNotification, userId]
  );

  const handleError = useCallback(
    (error: string) => {
          // ...
      onError(error);
    },
    [onError]
  );

  useEffect(() => {
    if (!userId) {
      return;
    }

    if (isInitialized.current && lastUserId.current === userId) {
      return;
    }

    const timer = setTimeout(() => {
      isInitialized.current = true;
      lastUserId.current = userId;

      webSocketService.connect(userId);
      webSocketService.addNotificationListener(handleNotification);
      webSocketService.addErrorListener(handleError);
    }, 1000);

    return () => {
      clearTimeout(timer);
      webSocketService.removeNotificationListener(handleNotification);
      webSocketService.removeErrorListener(handleError);
      isInitialized.current = false;
    };
  }, [userId, handleNotification, handleError]);
};