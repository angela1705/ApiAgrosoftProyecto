import { Notification } from "@/hooks/websocket/useNotifications";

export class WebSocketService {
  private static instance: WebSocketService | null = null;
  private ws: WebSocket | null = null;
  private pingInterval: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private listeners: Array<(notification: Notification) => void> = [];
  private errorListeners: Array<(error: string) => void> = [];
  private isConnecting: boolean = false;
  private pendingConnectUserId: string | null = null;

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
      console.log("[WebSocketService] Singleton creado");
    }
    return WebSocketService.instance;
  }

  public connect(userId: string | number) {
    const userIdStr = userId.toString(); // Convertir userId a string
    console.log(`[WebSocketService] Intento de conexión para userId: ${userIdStr}, isConnecting: ${this.isConnecting}`);

    if (!userIdStr) {
      this.notifyError("No se proporcionó userId, omitiendo configuración de WebSocket");
      console.log("[WebSocketService] No userId provided");
      return;
    }

    if (this.isConnecting) {
      console.log("[WebSocketService] Conexión en curso, almacenando userId para intento posterior");
      this.pendingConnectUserId = userIdStr;
      return;
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log("[WebSocketService] WebSocket ya está abierto, omitiendo configuración");
      return;
    }

    if (this.ws && this.ws.readyState === WebSocket.CONNECTING) {
      console.log("[WebSocketService] WebSocket en estado CONNECTING, esperando...");
      this.pendingConnectUserId = userIdStr;
      return;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
      console.log("[WebSocketService] Cerrando conexión WebSocket existente");
      this.ws.close();
    }

    this.isConnecting = true;
    console.log("[WebSocketService] Iniciando nueva conexión WebSocket");
    const socketUrl = `ws://${window.location.hostname}:8000/ws/notifications/${userIdStr}/`;
    this.ws = new WebSocket(socketUrl);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.isConnecting = false;
      console.log(`[WebSocketService] WebSocket conectado para userId: ${userIdStr}`);
      this.pingInterval = setInterval(() => {
        if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({ type: "ping" }));
          console.log("[WebSocketService] Enviado ping");
        }
      }, 30000);

      if (this.pendingConnectUserId && this.pendingConnectUserId !== userIdStr) {
        console.log("[WebSocketService] Reintentando conexión pendiente para userId:", this.pendingConnectUserId);
        this.connect(this.pendingConnectUserId);
      }
      this.pendingConnectUserId = null;
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Corregir parseo de event.data
        console.log("[WebSocketService] Datos crudos recibidos:", data);
        if (data.type === "pong") {
          console.log("[WebSocketService] Recibido pong");
          return;
        }
        const notification: Notification = {
          id: data.id,
          type: data.type,
          message: data.message,
          data: data.data || {},
          created_at: data.created_at,
          read: false,
          recipient_id: data.recipient_id,
        };
        console.log("[WebSocketService] Notificación procesada:", notification);
        this.listeners.forEach((listener) => listener(notification));
      } catch (error) {
        this.notifyError("Error al procesar la notificación");
        console.error("[WebSocketService] Error al procesar la notificación:", error);
      }
    };

    this.ws.onerror = (error) => {
      this.isConnecting = false;
      this.notifyError("Error de conexión WebSocket");
      console.error(`[WebSocketService] Error de WebSocket para userId: ${userIdStr}`, error);
    };

    this.ws.onclose = (event) => {
      this.isConnecting = false;
      console.log(`[WebSocketService] WebSocket cerrado para userId: ${userIdStr}, código: ${event.code}, razón: ${event.reason}`);
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
        this.pingInterval = null;
      }
      this.ws = null;

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        const delay = Math.min(5000 * (this.reconnectAttempts + 1), 30000);
        console.log(`[WebSocketService] Intentando reconectar en ${delay}ms (intento ${this.reconnectAttempts + 1})`);
        this.reconnectTimeout = setTimeout(() => {
          this.reconnectAttempts++;
          this.connect(userIdStr);
        }, delay);
      } else {
        this.notifyError("Se alcanzó el máximo de intentos de reconexión");
        console.warn("[WebSocketService] Máximo de intentos de reconexión alcanzado");
      }
    };
  }

  public addNotificationListener(listener: (notification: Notification) => void) {
    console.log("[WebSocketService] Agregando listener de notificación");
    this.listeners.push(listener);
  }

  public addErrorListener(listener: (error: string) => void) {
    console.log("[WebSocketService] Agregando listener de error");
    this.errorListeners.push(listener);
  }

  public removeNotificationListener(listener: (notification: Notification) => void) {
    console.log("[WebSocketService] Eliminando listener de notificación");
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  public removeErrorListener(listener: (error: string) => void) {
    console.log("[WebSocketService] Eliminando listener de error");
    this.errorListeners = this.errorListeners.filter((l) => l !== listener); // Corregir uso de errorListeners
  }

  private notifyError(error: string) {
    console.log("[WebSocketService] Notificando error:", error);
    this.errorListeners.forEach((listener) => listener(error));
  }

  public disconnect() {
    console.log("[WebSocketService] Desconectando WebSocket");
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnecting = false;
    this.reconnectAttempts = 0;
    this.pendingConnectUserId = null;
  }
}

export const webSocketService = WebSocketService.getInstance();