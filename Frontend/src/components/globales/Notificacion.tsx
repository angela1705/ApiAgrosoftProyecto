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
  ListItemIcon,
  Snackbar,
  Alert,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WarningIcon from "@mui/icons-material/Warning";
import TimerIcon from "@mui/icons-material/Timer";
import BugReportIcon from "@mui/icons-material/BugReport";
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
      return;
    }

    isFetching.current = true;
    try {
      const response = await axios.get("http://localhost:8000/api/notificaciones/");
      const fetchedNotifications: Notification[] = response.data.map((n: any) => ({
        id: n.id,
        type: n.notification_type,
        message: n.message,
        data: n.data,
        created_at: n.created_at,
        read: n.is_read,
      }));
      // Filtrar duplicados basados en ID
      const uniqueNotifications = fetchedNotifications.filter(
        (n, index, self) => self.findIndex((x) => x.id === n.id) === index
      );
      setNotifications(uniqueNotifications);
      setUnreadCount(uniqueNotifications.filter((n) => !n.read).length);
    } catch (error: any) {
      setError(`Error al cargar las notificaciones: ${error.message}`);
    } finally {
      isFetching.current = false;
    }
  }, [user?.id]);

  const fetchNotificationsDebounced = useCallback(
    debounce(fetchNotifications, 1000),
    [fetchNotifications]
  );

  useEffect(() => {
    if (user?.id) {
      fetchNotificationsDebounced();
    } else {
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
      // Verificar duplicados por ID y created_at
      const exists = prev.some(
        (n) => n.id === notification.id && n.created_at === notification.created_at
      );
      if (!exists) {
        const updatedNotifications = [notification, ...prev].slice(0, 50);
        setUnreadCount((prevUnread) => prevUnread + (notification.read ? 0 : 1));
        return updatedNotifications;
      }
      return prev;
    });
  }, []);

  const markAsRead = useCallback(
    async (id: string) => {
      try {
        await axios.post("http://localhost:8000/api/notificaciones/", { action: "mark_read", notification_id: id });
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === id && !n.read ? { ...n, read: true } : n
          )
        );
        setUnreadCount((prevUnread) => Math.max(0, prevUnread - 1));
      } catch (error: any) {
        setError(`Error al marcar la notificación como leída: ${error.message}`);
      }
    },
    []
  );

  const deleteNotification = useCallback(
    async (id: string) => {
      try {
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
        setError(`Error al eliminar la notificación: ${error.message}`);
      }
    },
    []
  );

  const clearAllNotifications = useCallback(async () => {
    try {
      await axios.post("http://localhost:8000/api/notificaciones/", { action: "clear_all" });
      setNotifications([]);
      setUnreadCount(0);
      setConfirmClearOpen(false);
    } catch (error: any) {
      setError(`Error al limpiar todas las notificaciones: ${error.message}`);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClearAllClick = () => {
    setConfirmClearOpen(true);
  };

  const handleConfirmClear = () => {
    clearAllNotifications();
  };

  const handleCancelClear = () => {
    setConfirmClearOpen(false);
  };

  const handleError = (error: string) => {
    setError(error);
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleRedirect = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.type === "ACTIVIDAD_ASIGNADA") {
      window.location.href = `/actividades/${notification.data.actividad_id}`;
    } else if (notification.type === "INSUMO_CADUCANDO" || notification.type === "INSUMO_AGOTADO") {
      window.location.href = `/insumos/${notification.data.insumo_id}`;
    } else if (notification.type === "HERRAMIENTA_EN_USO" || notification.type === "HERRAMIENTA_BAJA_STOCK") {
      window.location.href = `/bodega_herramienta/${notification.data.bodega_herramienta_id}`;
    } else if (notification.type === "PEST_ALERT") {
      window.location.href = `/cultivo/detallereporteplaga/${notification.data.reporte_plaga_id}`;
    }
  };

  const getIconForNotification = (type: string) => {
    switch (type) {
      case "ACTIVIDAD_ASIGNADA":
        return <AssignmentIcon sx={{ color: "#2e7d32" }} />;
      case "INSUMO_CADUCANDO":
        return <TimerIcon sx={{ color: "#ffb300" }} />;
      case "INSUMO_AGOTADO":
        return <WarningIcon sx={{ color: "#d32f2f" }} />;
      case "HERRAMIENTA_EN_USO":
        return <TimerIcon sx={{ color: "#ffb300" }} />;
      case "HERRAMIENTA_BAJA_STOCK":
        return <WarningIcon sx={{ color: "#d32f2f" }} />;
      case "PEST_ALERT":
        return <BugReportIcon sx={{ color: "#d81b60" }} />;
      default:
        return <NotificationsIcon sx={{ color: "#757575" }} />;
    }
  };

  const userId = user?.id?.toString();

  useNotifications(userId, addNotification, handleError);

  if (!user?.id) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
      <IconButton
        onClick={handleClick}
        sx={{ color: "#fff", "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" } }}
        aria-label="notificaciones"
      >
        <Badge
          badgeContent={unreadCount > 0 ? "!" : null}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              width: 16,
              height: 16,
              borderRadius: "50%",
              top: 6,
              right: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: "bold",
            },
          }}
        >
          <NotificationsIcon sx={{ fontSize: 28, color: "#fff" }} />
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
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid rgba(0, 0, 0, 0.12)", bgcolor: "#fff" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
              Notificaciones
            </Typography>
            {notifications.length > 0 && (
              <Button
                size="small"
                color="error"
                onClick={handleClearAllClick}
                sx={{ textTransform: "none", fontWeight: "medium" }}
              >
                Limpiar todas
              </Button>
            )}
          </Box>
        </Box>

        {notifications.length === 0 ? (
          <MenuItem sx={{ justifyContent: "center", py: 2 }}>
            <Typography variant="body2" color="text.secondary">
              No hay notificaciones
            </Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              dense
              sx={{
                borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                "&:last-child": { borderBottom: "none" },
                bgcolor: notification.read ? "#fff" : "#e8f5e9",
                "&:hover": { bgcolor: notification.read ? "#f5f5f5" : "#c8e6c9" },
                py: 1.5,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {getIconForNotification(notification.type)}
                </ListItemIcon>
                <Box sx={{ flexGrow: 1 }}>
                  <List dense sx={{ p: 0 }}>
                    {notification.message.split("\n").map((line, index) => (
                      <ListItem key={index} sx={{ py: 0.25 }}>
                        <ListItemText
                          primary={line}
                          primaryTypographyProps={{
                            variant: "body2",
                            fontWeight:
                              line.startsWith("Se te ha asignado") ||
                              line.startsWith("El insumo") ||
                              line.startsWith("La herramienta") ||
                              line.startsWith("Se ha detectado una plaga") ||
                              line.startsWith("Nuevo reporte de plaga") ||
                              line.startsWith("El estado del reporte de plaga")
                                ? "bold"
                                : "normal",
                            color: "#333",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  {notification.type !== "OTHER" ? (
                    <Button
                      size="small"
                      onClick={() => handleRedirect(notification)}
                      sx={{
                        textTransform: "none",
                        color: "#2e7d32",
                        fontWeight: "medium",
                        mt: 0.5,
                        "&:hover": { bgcolor: "rgba(46, 125, 50, 0.1)" },
                      }}
                    >
                      {notification.type === "ACTIVIDAD_ASIGNADA" && "Ver Actividad"}
                      {(notification.type === "INSUMO_CADUCANDO" || notification.type === "INSUMO_AGOTADO") &&
                        "Ver Insumo"}
                      {(notification.type === "HERRAMIENTA_EN_USO" || notification.type === "HERRAMIENTA_BAJA_STOCK") &&
                        "Ver Herramienta"}
                      {notification.type === "PEST_ALERT" && "Ver Reporte"}
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      disabled
                      sx={{ textTransform: "none", color: "#757575", mt: 0.5 }}
                    >
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
                  sx={{ ml: 1, color: "#757575", "&:hover": { color: "#d32f2f" } }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
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
        sx={{ "& .MuiDialog-paper": { borderRadius: 2, p: 2 } }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
          ¿Limpiar todas las notificaciones?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: "#333" }}>
            Esta acción eliminará todas las notificaciones. ¿Estás seguro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelClear}
            sx={{ textTransform: "none", color: "#757575" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmClear}
            color="error"
            sx={{ textTransform: "none", fontWeight: "medium" }}
            autoFocus
          >
            Limpiar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%", bgcolor: "#d32f2f", color: "#fff" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default React.memo(Notificacion);