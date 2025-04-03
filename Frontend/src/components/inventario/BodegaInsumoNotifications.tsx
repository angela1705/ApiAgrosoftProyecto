import React, { useEffect, useState, useRef } from "react";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

interface Notification {
  message: string;
  type: "info" | "warning" | "success" | "error" | "usage";
  timestamp: number;
  insumoId?: number;
  uniqueId?: string;
  cantidadUsada?: number; // Nueva propiedad para el uso de insumos
}

const BodegaInsumoNotifications: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const receivedIds = useRef<Set<string>>(new Set());
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);
  const SOCKET_URL = `ws://${window.location.hostname}:8000/ws/inventario/bodega_insumo/`;

  const connectWebSocket = () => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      console.log("⛔ No hay token disponible");
      return;
    }

    const wsUrl = `${SOCKET_URL}?token=${token}`;
    console.log(`Conectando a WebSocket: ${wsUrl}`);
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("✅ Conexión WebSocket establecida correctamente");
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
      socketRef.current?.send(JSON.stringify({ action: "sync" }));
    };

    socketRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 Nuevo mensaje recibido:", data);

        const messageId = data.message_id || (data.id ? `${data.type || data.action || data.accion}-${data.id}` : `${data.type || data.action || data.accion}-${Date.now()}`);
        if (receivedIds.current.has(messageId)) {
          console.log("⚠️ Notificación duplicada ignorada:", messageId);
          return;
        }
        receivedIds.current.add(messageId);

        const newNotification: Notification = {
          message: "",
          type: "info",
          timestamp: data.timestamp ? parseInt(data.timestamp) : Date.now(),
          insumoId: data.id,
          uniqueId: messageId,
          cantidadUsada: data.cantidad_usada,
        };

        const now = Date.now();
        let lastRefetch = localStorage.getItem("lastRefetch") ? parseInt(localStorage.getItem("lastRefetch")!, 10) : 0;
        if (now - lastRefetch > 2000) {
          queryClient.invalidateQueries({ queryKey: ["bodega_insumos"] });
          localStorage.setItem("lastRefetch", now.toString());
          console.log("🔄 Refetch disparado");
        }

        if (data.type === "initial_state" && data.message) {
          newNotification.message = data.message
            .map((item: any) => `${item.bodega || "Desconocido"} - ${item.insumo || "Desconocido"}: ${item.cantidad || 0} unidades`)
            .join(", ");
          newNotification.type = "info";
        } else if (data.type === "create") {
          newNotification.message = `${data.bodega || "Desconocido"} - ${data.insumo || "Desconocido"}: ${data.cantidad || 0} unidades`;
          newNotification.type = "success";
        } else if (data.type === "update") {
          newNotification.message = `${data.bodega || "Desconocido"} - ${data.insumo || "Desconocido"}: ${data.cantidad || 0} unidades`;
          newNotification.type = "warning";
        } else if (data.type === "delete") {
          newNotification.message = `Registro ID ${data.id || "Desconocido"} eliminado`;
          newNotification.type = "error";
        } else if (data.type === "usage") {
          newNotification.message = `${data.bodega || "Desconocido"} - ${data.insumo || "Desconocido"}: Usado ${data.cantidad_usada || 0} unidades, quedan ${data.cantidad || 0}`;
          newNotification.type = "usage";
          newNotification.cantidadUsada = data.cantidad_usada;
        } else {
          console.log("⚠️ Acción desconocida:", data.type || data.action || data.accion || "No especificada");
          return;
        }

        setNotifications((prev) => {
          const isDuplicate = prev.some(
            (n) => n.message === newNotification.message && n.timestamp === newNotification.timestamp
          );
          return isDuplicate ? prev : [newNotification, ...prev.slice(0, 19)];
        });

        addToast({
          title:
            data.type === "initial_state"
              ? "Estado de Bodega"
              : data.type === "create"
              ? "Insumo Creado"
              : data.type === "update"
              ? "Insumo Actualizado"
              : data.type === "delete"
              ? "Insumo Eliminado"
              : "Uso de Insumo",
          description: newNotification.message,
          timeout: 5000,
        });
      } catch (error) {
        console.error("Error procesando mensaje:", error);
      }
    };

    socketRef.current.onerror = (error) => {
      console.error("❌ Error en WebSocket:", error);
    };

    socketRef.current.onclose = () => {
      console.log("🔌 WebSocket cerrado. Reconectando...");
      socketRef.current = null;
      if (!reconnectTimer.current && isAuthenticated) {
        reconnectTimer.current = setTimeout(() => {
          connectWebSocket();
        }, 3000);
      }
    };
  };

  useEffect(() => {
    if (!isAuthenticated) {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      return;
    }

    connectWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="fixed top-4 right-4 w-80 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
      <h2 className="text-lg font-semibold mb-2">Notificaciones de Bodega</h2>
      <div className="max-h-60 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay notificaciones recientes</p>
        ) : (
          notifications.map((notif) => (
            <div key={notif.uniqueId} className="mb-2 pb-2 border-b border-gray-100">
              <p
                className={`text-sm ${
                  notif.type === "error"
                    ? "text-red-600"
                    : notif.type === "warning"
                    ? "text-yellow-600"
                    : notif.type === "success"
                    ? "text-green-600"
                    : notif.type === "usage"
                    ? "text-blue-600"
                    : ""
                }`}
              >
                {notif.message}
              </p>
              <p className="text-xs text-gray-400">{new Date(notif.timestamp).toLocaleTimeString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BodegaInsumoNotifications;