{/*import { useEffect, useCallback } from "react";
import { Notification } from "@/types/notificacion";

export const useBodegaNotifications = (
  userId: string | undefined,
  addNotification: (notification: Notification) => void
) => {
  const setupWebSocket = useCallback(() => {
    if (!userId) return;

    const token = localStorage.getItem("access_token");
    const socketUrl = `ws://${window.location.hostname}:8000/ws/inventario/bodega_insumo/?token=${token}`;
    const ws = new WebSocket(socketUrl);

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: "sync" }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const messageId = data.message_id || (data.id ? `${data.type}-${data.id}` : `${data.type}-${Date.now()}`);

        let message = "";
        if (data.type === "initial_state" && data.message) {
          message = data.message
            .map((item: any) => `${item.bodega || "Desconocido"} - ${item.insumo || "Desconocido"}: ${item.cantidad || 0} unidades`)
            .join(", ");
        } else if (["create", "update", "delete", "low_stock"].includes(data.type)) {
          message = data.type === "delete" 
            ? `Registro ID ${data.id || "Desconocido"} eliminado`
            : `${data.bodega || "Desconocido"} - ${data.insumo || "Desconocido"}: ${data.cantidad || 0} unidades` +
              (data.type === "low_stock" ? " (bajo stock)" : "");
        } else {
          return;
        }

        const newNotification: Notification = {
          id: messageId,
          type: data.type === "low_stock" ? "low_stock" : 
               data.type === "create" ? "success" :
               data.type === "update" ? "warning" :
               data.type === "delete" ? "error" : "info",
          message,
          timestamp: data.timestamp ? parseInt(data.timestamp) : Date.now(),
          insumoId: data.id,
          source: 'bodega'
        };

        addNotification(newNotification);
      } catch (error) {
        console.error('Error procesando notificación de bodega:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('Error en WebSocket de bodega:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket bodega cerrado. Reconectando...');
      setTimeout(setupWebSocket, 3000);
    };

    return ws;
  }, [userId, addNotification]);

  useEffect(() => {
    const ws = setupWebSocket();
    return () => {
      ws?.close();
    };
  }, [setupWebSocket]);
}; */}