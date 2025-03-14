import React, { useEffect, useState } from "react";
import { addToast } from "@heroui/toast";
import { useBodegaHerramienta } from "@/hooks/inventario/useBodegaHerramienta";

interface Notification {
  message: string;
}

const BodegaHerramientaNotifications: React.FC = () => {
  const { refetch } = useBodegaHerramienta();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const wsUrl = "ws://127.0.0.1:8000/ws/inventario/bodega_herramienta/";

    const connectWebSocket = () => {
      const socket = new WebSocket(wsUrl);

      socket.onopen = () => {
        console.log("✅ Conectado al WebSocket:", wsUrl);
        socket.send(JSON.stringify({ action: "sync" })); 
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("📩 Mensaje recibido:", data);

        if (data.action === "initial_state") {
          refetch(); 
        } else if (data.accion === "create") {
          refetch();
          setNotifications((prev) => [
            ...prev,
            { message: `${data.bodega} - ${data.herramienta}: ${data.cantidad} unidades (creado)` },
          ]);
          addToast({
            title: "Nueva Herramienta en Bodega",
            description: `${data.bodega} - ${data.herramienta}: ${data.cantidad} unidades`,
            timeout: 5000,
          });
        } else if (data.accion === "update") {
          refetch();
          setNotifications((prev) => [
            ...prev,
            { message: `${data.bodega} - ${data.herramienta}: ${data.cantidad} unidades (actualizado)` },
          ]);
          addToast({
            title: "Actualización en Bodega",
            description: `${data.bodega} - ${data.herramienta}: ${data.cantidad} unidades`,
            timeout: 5000,
          });
        } else if (data.accion === "delete") {
          refetch();
          setNotifications((prev) => [
            ...prev,
            { message: `Registro ID ${data.id} eliminado` },
          ]);
          addToast({
            title: "Eliminación en Bodega",
            description: `Registro ID ${data.id} eliminado`,
            timeout: 5000,
          });
        }
      };

      socket.onerror = (error) => console.error("❌ Error en WebSocket:", error);

      socket.onclose = (event) => {
        console.log("🔌 WebSocket cerrado", event);
        setTimeout(() => {
          console.log("♻️ Reintentando conexión...");
          connectWebSocket(); 
        }, 5000);
      };

      return socket;
    };

    const socket = connectWebSocket();

    return () => {
      socket.close();
    };
  }, [refetch]);

  return (
    <div className="notifications-container">
      <h2>Notificaciones de Bodega Herramienta</h2>
      {notifications.length === 0 ? (
        <p>No hay notificaciones</p>
      ) : (
        <ul>
          {notifications.map((notif, index) => (
            <li key={index}>{notif.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BodegaHerramientaNotifications;