import React, { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { IconButton, Badge, Menu, MenuItem, Typography, Box, Chip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useActivityNotifications } from '@/hooks/websocket/useActividadNotificacions';
import { useBodegaNotifications } from '@/hooks/websocket/useBodegaNotification';
import { usePlagaNotifications } from '@/hooks/websocket/useReportePlaga';
import { Notification } from '@/types/notificacion';

const Notificacion: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const addNotification = useCallback(
    (notification: Notification) => {
      setNotifications((prev) => {
        const exists = prev.some((n) => n.id === notification.id);
        if (!exists) {
          return [notification, ...prev.slice(0, 49)];
        }
        return prev;
      });
      setUnreadCount((prev) => (open ? prev : prev + 1));
    },
    [open]
  );

  useActivityNotifications(user?.id, addNotification);
  useBodegaNotifications(user?.id, addNotification);
  usePlagaNotifications(user?.id, addNotification);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setUnreadCount(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'error.main';
      case 'warning':
      case 'expiring':
        return 'warning.main';
      case 'success':
        return 'success.main';
      case 'low_stock':
        return 'orange';
      case 'reporte_plaga':
        return 'error.dark'; // Rojo más oscuro para plagas
      default:
        return 'text.primary';
    }
  };

  const renderEstadoPlaga = (estado: string) => {
    switch (estado) {
      case 'PE':
        return <Chip label="Pendiente" color="warning" size="small" />;
      case 'RE':
        return <Chip label="Revisado" color="info" size="small" />;
      case 'AT':
        return <Chip label="Atendido" color="success" size="small" />;
      default:
        return <Chip label={estado} size="small" />;
    }
  };

  const renderNotificationContent = (notification: Notification) => {
    if (notification.source === 'activities') {
      return (
        <>
          <Typography variant="subtitle2" fontWeight="bold">
            {notification.message}
          </Typography>
          <Typography variant="body2">
            <strong>Tipo:</strong> {notification.actividad.tipo_actividad_nombre}
          </Typography>
          <Typography variant="body2">
            <strong>Prioridad:</strong> {notification.actividad.prioridad}
          </Typography>
          {notification.actividad.descripcion && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              {notification.actividad.descripcion}
            </Typography>
          )}
        </>
      );
    } else if (notification.source === 'plagas') {
      return (
        <>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ color: getNotificationColor(notification.type) }}
          >
            {notification.message}
          </Typography>
          <Typography variant="body2">
            <strong>Plaga:</strong> {notification.plaga.plaga_nombre}
          </Typography>
          <Typography variant="body2">
            <strong>Bancal:</strong> {notification.plaga.bancal_nombre}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Typography variant="body2">
              <strong>Estado:</strong>
            </Typography>
            {renderEstadoPlaga(notification.plaga.estado)}
          </Box>
          {notification.plaga.observaciones && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Observaciones:</strong> {notification.plaga.observaciones}
            </Typography>
          )}
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            {new Date(notification.plaga.fecha_reporte).toLocaleString()}
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ color: getNotificationColor(notification.type) }}
          >
            Bodega: {notification.message}
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            {new Date(notification.timestamp).toLocaleString()}
          </Typography>
        </>
      );
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
      <IconButton
        onClick={handleClick}
        sx={{ color: '#fff' }}
        aria-label="notificaciones"
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon sx={{ color: '#fff' }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: 350,
            maxHeight: 400,
            overflow: 'auto',
            mt: 1,
          },
        }}
      >
        {notifications.length === 0 ? (
          <MenuItem dense>
            <Typography variant="body2">No hay notificaciones</Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              dense
              onClick={handleClose}
              sx={{
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <Box sx={{ py: 1, width: '100%' }}>
                {renderNotificationContent(notification)}
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </Box>
  );
};

export default Notificacion;