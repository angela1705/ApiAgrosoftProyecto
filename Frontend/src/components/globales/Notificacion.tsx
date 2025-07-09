import React, { useState, useCallback, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import { useNotifications, Notification } from "@/hooks/websocket/useNotifications";
import axios from "@/api/axios";
import { debounce } from "lodash";

const Notificacion: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const isFetching = useRef(false);

  const fetchNotifications = useCallback(async () => {
    if (!user?.id || isFetching.current) {
      console.log("No user ID or already fetching, skipping");
      return;
    }

    isFetching.current = true;
    try {
      console.log(`Fetching notifications for user ${user.id}`);
      const response = await axios.get("http://localhost:8000/api/notificaciones/");
      const fetchedNotifications: Notification[] = response.data.map((n: any) => ({
        id: n.id,
        type: n.notification_type,
        message: n.message,
        data: n.data,
        created_at: n.created_at,
        read: n.is_read,
      }));
      console.log(`Loaded ${fetchedNotifications.length} notifications`, fetchedNotifications);
      setNotifications(fetchedNotifications);
      setUnreadCount(fetchedNotifications.filter((n) => !n.read).length);
    } catch (error: any) {
      const errorMessage = `Error al cargar las notificaciones: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage, error);
    } finally {
      isFetching.current = false;
    }
  }, [user?.id]);

  const fetchNotificationsDebounced = useCallback(
    debounce(fetchNotifications, 1000),
    [fetchNotifications]
  );

  useEffect(() => {
    console.log("useEffect triggered, user?.id:", user?.id);
    if (user?.id) {
      fetchNotificationsDebounced();
    } else {
      console.log("User ID not available yet, retrying...");
      const timer = setInterval(() => {
        if (user?.id) {
          fetchNotificationsDebounced();
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [fetchNotificationsDebounced, user?.id]);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications((prev) => {
      const exists = prev.some((n) => n.id === notification.id);
      if (!exists) {
        console.log("Adding new notification:", notification);
        const updatedNotifications = [notification, ...prev].slice(0, 50);
        setUnreadCount((prevUnread) => prevUnread + (notification.read ? 0 : 1));
        return updatedNotifications;
      }
      console.log("Notification already exists:", notification.id);
      return prev;
    });
  }, []);

  const markAsRead = useCallback(
    async (id: string) => {
      try {
        console.log(`Marking notification ${id} as read`);
        await axios.post("http://localhost:8000/api/notificaciones/", { action: "mark_read", notification_id: id });
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === id && !n.read ? { ...n, read: true } : n
          )
        );
        setUnreadCount((prevUnread) => Math.max(0, prevUnread - 1));
      } catch (error: any) {
        const errorMessage = `Error al marcar la notificación como leída: ${error.message}`;
        setError(errorMessage);
        console.error(errorMessage, error);
      }
    },
    []
  );

  const deleteNotification = useCallback(
    async (id: string) => {
      try {
        console.log(`Deleting notification ${id}`);
        await axios.post("http://localhost:8000/api/notificaciones/", { action: "delete", notification_id: id });
        setNotifications((prev) => {
          const notificationToDelete = prev.find((n) => n.id === id);
          const updatedNotifications = prev.filter((n) => n.id !== id);
          if (notificationToDelete && !notificationToDelete.read) {
            setUnreadCount((prevUnread) => Math.max(0, prevUnread - 1));
          }
          return updatedNotifications;
        });
      } catch (error: any) {
        const errorMessage = `Error al eliminar la notificación: ${error.message}`;
        setError(errorMessage);
        console.error(errorMessage, error);
      }
    },
    []
  );

  const clearAllNotifications = useCallback(async () => {
    try {
      console.log("Clearing all notifications");
      await axios.post("http://localhost:8000/api/notificaciones/", { action: "clear_all" });
      setNotifications([]);
      setUnreadCount(0);
      setConfirmClearOpen(false);
    } catch (error: any) {
      const errorMessage = `Error al limpiar todas las notificaciones: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage, error);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log("Opening notification menu");
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("Closing notification menu");
    setAnchorEl(null);
  };

  const handleClearAllClick = () => {
    console.log("Opening clear all confirmation dialog");
    setConfirmClearOpen(true);
  };

  const handleConfirmClear = () => {
    clearAllNotifications();
  };

  const handleCancelClear = () => {
    console.log("Canceling clear all");
    setConfirmClearOpen(false);
  };

  const handleError = (error: string) => {
    console.error("Notification error:", error);
    setError(error);
  };

  const handleCloseError = () => {
    console.log("Closing error snackbar");
    setError(null);
  };

  const handleRedirect = (notification: Notification) => {
    console.log(`Redirecting for notification ${notification.id} (${notification.type})`);
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.type === "ACTIVIDAD_ASIGNADA") {
      window.location.href = `/actividades/${notification.data.actividad_id}`;
    } else if (notification.type === "INSUMO_CADUCANDO" || notification.type === "INSUMO_AGOTADO") {
      window.location.href = `/insumos/${notification.data.insumo_id}`;
    } else if (notification.type === "PEST_ALERT") {
      window.location.href = `/plagas/${notification.data.plaga_id}`;
    }
  };

  const userId = user?.id?.toString();

  useNotifications(userId, addNotification, handleError);

  if (!user?.id) {
    console.log("No user logged in, hiding notifications");
    return null;
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
      <IconButton
        onClick={handleClick}
        sx={{ color: "#fff" }}
        aria-label="notificaciones"
      >
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon sx={{ color: "#fff" }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: 400,
            maxHeight: 500,
            overflow: "auto",
            mt: 1,
          },
        }}
      >
        <Box sx={{ p: 1, borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="subtitle1">Notificaciones</Typography>
            {notifications.length > 0 && (
              <Button
                size="small"
                color="error"
                onClick={handleClearAllClick}
              >
                Limpiar todas
              </Button>
            )}
          </Box>
        </Box>

        {notifications.length === 0 ? (
          <MenuItem>
            <Typography variant="body2">No hay notificaciones</Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              dense
              sx={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                "&:last-child": { borderBottom: "none" },
                bgcolor: notification.read ? "background.paper" : "action.selected",
              }}
            >
              <Box sx={{ py: 1, width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <List dense>
                      {notification.message.split("\n").map((line, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemText
                            primary={line}
                            primaryTypographyProps={{
                              variant: "body2",
                              fontWeight:
                                line.startsWith("Se te ha asignado") ||
                                line.startsWith("El insumo") ||
                                line.startsWith("Se ha detectado una plaga")
                                  ? "bold"
                                  : "normal",
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    {notification.type !== "OTHER" ? (
                      <Button
                        size="small"
                        onClick={() => handleRedirect(notification)}
                      >
                        {notification.type === "ACTIVIDAD_ASIGNADA" && "Ver Actividad"}
                        {(notification.type === "INSUMO_CADUCANDO" || notification.type === "INSUMO_AGOTADO") &&
                          "Ver Insumo"}
                        {notification.type === "PEST_ALERT" && "Ver Plaga"}
                      </Button>
                    ) : (
                      <Button size="small" disabled>
                        Sin acción
                      </Button>
                    )}
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                    sx={{ ml: 1 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>

      <Dialog
        open={confirmClearOpen}
        onClose={handleCancelClear}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">¿Limpiar todas las notificaciones?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción eliminará todas las notificaciones. ¿Estás seguro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClear} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmClear} color="error" autoFocus>
            Limpiar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default React.memo(Notificacion);