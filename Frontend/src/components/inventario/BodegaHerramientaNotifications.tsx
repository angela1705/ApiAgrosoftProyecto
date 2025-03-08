
import React, { useEffect } from "react";
import { useBodegaHerramienta } from "@/hooks/inventario/useBodegaHerramienta";
import { toast } from "react-toastify";

const BodegaHerramientaNotifications: React.FC = () => {
  const { refetch } = useBodegaHerramienta();

  useEffect(() => {
    const wsUrl = "ws://127.0.0.1:8000/ws/inventario/bodega_herramienta/";
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => console.log("Conectado al WebSocket:", wsUrl);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensaje recibido:", data);

      if (data.accion === "update") {
        refetch();
        toast.info(`${data.bodega} - ${data.herramienta}: ${data.cantidad} unidades (${data.accion})`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };

    socket.onerror = (error) => console.error("Error en WebSocket:", error);
    socket.onclose = (event) => console.log("WebSocket cerrado", event);

    return () => {
      socket.close();
    };
  }, [refetch]);

  return null;
};

export default BodegaHerramientaNotifications;