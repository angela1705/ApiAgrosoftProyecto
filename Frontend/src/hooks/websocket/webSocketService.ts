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
    }
    return WebSocketService.instance;
  }

  public connect(userId: string | number) {
    const userIdStr = userId.toString();

    if (!userIdStr) {
      this.notifyError("No se proporcionó userId, omitiendo configuración de WebSocket");
      return;
    }

    if (this.isConnecting) {
      this.pendingConnectUserId = userIdStr;
      return;
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      return;
    }

    if (this.ws && this.ws.readyState === WebSocket.CONNECTING) {
      this.pendingConnectUserId = userIdStr;
      return;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws && this.ws.readyState !== WebSocket.CLOSED) {
      this.ws.close();
    }

    this.isConnecting = true;
    const socketUrl = `ws://${window.location.hostname}:8000/ws/notifications/${userIdStr}/`;
    this.ws = new WebSocket(socketUrl);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.isConnecting = false;
      this.pingInterval = setInterval(() => {
        if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({ type: "ping" }));
        }
      }, 30000);

      if (this.pendingConnectUserId && this.pendingConnectUserId !== userIdStr) {
        this.connect(this.pendingConnectUserId);
      }
      this.pendingConnectUserId = null;
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "pong") {
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
        this.listeners.forEach((listener) => listener(notification));
      } catch (error) {
        this.notifyError("Error al procesar la notificación");
      }
    };

    this.ws.onerror = () => {
      this.isConnecting = false;
      this.notifyError("Error de conexión WebSocket");
    };

    this.ws.onclose = () => {
      this.isConnecting = false;
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
        this.pingInterval = null;
      }
      this.ws = null;

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        const delay = Math.min(5000 * (this.reconnectAttempts + 1), 30000);
        this.reconnectTimeout = setTimeout(() => {
          this.reconnectAttempts++;
          this.connect(userIdStr);
        }, delay);
      } else {
        this.notifyError("Se alcanzó el máximo de intentos de reconexión");
      }
    };
  }

  public addNotificationListener(listener: (notification: Notification) => void) {
    this.listeners.push(listener);
  }

  public addErrorListener(listener: (error: string) => void) {
    this.errorListeners.push(listener);
  }

  public removeNotificationListener(listener: (notification: Notification) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  public removeErrorListener(listener: (error: string) => void) {
    this.errorListeners = this.errorListeners.filter((l) => l !== listener);
  }

  private notifyError(error: string) {
    this.errorListeners.forEach((listener) => listener(error));
  }

  public disconnect() {
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