import React, { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { IconButton, Badge, Menu, MenuItem, Typography, Box } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useActivityNotifications } from "@/hooks/websocket/useActividadNotificacions";
//import { useBodegaNotifications } from "@/hooks/websocket/useBodegaNotification";
import { Notification } from "@/types/notificacion";

const Notificacion: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

const addNotification = useCallback((notification: Notification) => {
  setNotifications(prev => {
    // Verificar si la notificación ya existe
    const exists = prev.some(n => n.id === notification.id);
    if (!exists) {
      return [notification, ...prev.slice(0, 49)];
    }
    return prev;
  });
  setUnreadCount(prev => open ? prev : prev + 1);
}, [open]);

  useActivityNotifications(user?.id, addNotification);
  //useBodegaNotifications(user?.id, addNotification);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setUnreadCount(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'error': return 'error.main';
      case 'warning': return 'warning.main';
      case 'success': return 'success.main';
      case 'low_stock': return 'orange';
      default: return 'text.primary';
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
            mt: 1
          }
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
                '&:last-child': { borderBottom: 'none' }
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