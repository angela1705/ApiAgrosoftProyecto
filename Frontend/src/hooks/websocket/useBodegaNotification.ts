import { useEffect, useCallback, useRef } from 'react';
import { Notification } from '@/types/notificacion';

export const useBodegaNotifications = (
  userId: string | undefined,
  addNotification: (notification: Notification) => void
) => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const notificationIdsRef = useRef<Set<string>>(new Set());

  const setupWebSocket = useCallback(() => {
    if (!userId) {
      console.log('No userId provided, skipping WebSocket setup');
      return;
    }

    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log('WebSocket ya está abierto, omitiendo reconexión');
      return;
    }

    
    if (wsRef.current) {
      console.log('Cerrando WebSocket existente');
      wsRef.current.close();
    }

    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socketUrl = `${protocol}://${window.location.hostname}:8000/ws/insumo/${userId}/`;
    console.log(`Conectando a WebSocket: ${socketUrl}`);
    const ws = new WebSocket(socketUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      reconnectAttemptsRef.current = 0;
      console.log('WebSocket de insumos conectado');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Mensaje WebSocket recibido:', data);

        
        if (notificationIdsRef.current.has(data.id)) {
          console.log('Notificación duplicada ignorada:', data.id);
          return;
        }

        notificationIdsRef.current.add(data.id);
        const newNotification: Notification = {
          id: data.id || `notif-${Date.now()}-${data.insumo_id || 'insumo'}`,
          type: data.type,
          message: data.message,
          timestamp: new Date().toISOString(),
          source: 'bodega',
          insumoId: data.insumo_id,
        };
        addNotification(newNotification);
      } catch (error) {
        console.error('Error procesando notificación de insumos:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('Error en WebSocket de insumos:', error);
    };

    ws.onclose = (event) => {
      console.log(`WebSocket cerrado, code: ${event.code}, reason: ${event.reason}`);
      if (reconnectAttemptsRef.current < maxReconnectAttempts) {
        const delay = Math.min(3000 * (reconnectAttemptsRef.current + 1), 15000);
        console.log(`Reconectando en ${delay}ms (intento ${reconnectAttemptsRef.current + 1})`);
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttemptsRef.current++;
          setupWebSocket();
        }, delay);
      } else {
        console.log('Máximo de intentos de reconexión alcanzado');
      }
    };
  }, [userId, addNotification]);

  useEffect(() => {
    setupWebSocket();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [setupWebSocket]);

  
  const resetNotifications = useCallback(() => {
    notificationIdsRef.current.clear();
    console.log('Notificaciones reiniciadas');
  }, []);

  return { resetNotifications };
};