import React, { useEffect, useState, useRef } from "react";
import { addToast } from "@heroui/toast";

interface Notification {
  message: string;
  type: "info" | "warning" | "alert" | "error";
  timestamp: number;
  herramientaId?: number;
  actividadId?: number;
  uniqueId?: string;
}

interface BodegaHerramientaNotificationsProps {
  userId3: number;
  isAdmin?: boolean;
}

const BodegaHerramientaNotifications: React.FC<BodegaHerramientaNotificationsProps> = ({
  userId3,
  isAdmin = false,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const receivedIds = useRef<Set<string>>(new Set());
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef<number>(0);
  const maxReconnectAttempts = 5;
  const baseReconnectDelay = 3000;

  const connectWebSocket = () => {
    if ((!userId3 || userId3 === 0) && !isAdmin) return;
    const wsUrl = isAdmin
      ? `ws://${window.location.hostname}:8000/ws/inventario/bodega_herramienta/admin/`
      : `ws://${window.location.hostname}:8000/ws/inventario/bodega_herramienta/${userId3}/`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      reconnectAttempts.current = 0;
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.hash && receivedIds.current.has(data.hash)) {
          return;
        }
        if (data.hash) {
          receivedIds.current.add(data.hash);
        }
        const newNotification: Notification = {
          message: data.message,
          type: data.notification_type || "info",
          timestamp: data.timestamp || Date.now(),
          herramientaId: data.herramienta_id,
          actividadId: data.actividad_id,
          uniqueId: data.hash,
        };
        setNotifications((prev) => {
          const isDuplicate = prev.some(
            (n) =>
              n.message === data.message &&
              n.timestamp === newNotification.timestamp
          );
          return isDuplicate ? prev : [newNotification, ...prev.slice(0, 19)];
        });
        addToast({
          title: "Estado de Herramienta",
          description: data.message,
          timeout: 60000,
          color:
            data.notification_type === "error"
              ? "danger"
              : data.notification_type === "warning"
              ? "warning"
              : data.notification_type === "alert"
              ? "warning"
              : "success",
        });
      } catch (error) {}
    };

    socketRef.current.onerror = () => {};

    socketRef.current.onclose = (event) => {
      if (event.code === 4002) {
        return;
      }
      if (reconnectAttempts.current < maxReconnectAttempts) {
        const delay = baseReconnectDelay * Math.pow(2, reconnectAttempts.current);
        reconnectTimer.current = setTimeout(() => {
          reconnectAttempts.current += 1;
          connectWebSocket();
        }, delay);
      } else {
        addToast({
          title: "Error de Conexión",
          description: "No se pudo reconectar al servidor de notificaciones. Por favor, intenta de nuevo más tarde.",
          timeout: 10000,
          color: "danger",
        });
      }
    };
  };

  useEffect(() => {
    connectWebSocket();
    const interval = setInterval(() => {
      setNotifications((prev) => {
        const now = Date.now();
        return prev.filter((notif) => now - Number(notif.timestamp) < 60000);
      });
    }, 1000);
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
      clearInterval(interval);
    };
  }, [userId3, isAdmin]);

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
      <h2 className="text-lg font-semibold mb-2">Notificaciones de Herramientas</h2>
      <div className="max-h-60 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay notificaciones recientes</p>
        ) : (
          notifications.map((notif, index) => (
            <div
              key={`${notif.uniqueId || index}`}
              className="mb-2 pb-2 border-b border-gray-100"
            >
              <p
                className={`text-sm ${
                  notif.type === "error"
                    ? "text-red-600"
                    : notif.type === "warning"
                    ? "text-yellow-600"
                    : notif.type === "alert"
                    ? "text-orange-600"
                    : "text-green-600"
                }`}
              >
                {notif.message}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(notif.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BodegaHerramientaNotifications;