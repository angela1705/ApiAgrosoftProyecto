import React, { useState, FormEvent } from "react";
import { addToast } from "@heroui/toast";
import { Box, Button, TextField, Typography, Modal, Backdrop, Fade, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { motion } from "framer-motion";

import { useUsuarios, UsuarioUpdate } from "@/hooks/usuarios/useUsuarios";
import DefaultLayout from "@/layouts/default";
import { useAuth } from "@/context/AuthContext";
import api from "@/components/utils/axios"; 


const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${BASE_URL}`;

const PerfilPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { updateUsuario } = useUsuarios();
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(user);
  const [editError, setEditError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!user || !editUser) {
    return (
      <DefaultLayout>
<Typography sx={{ textAlign: "center", mt: 4 }} variant="h6">
          No se encontró información del usuario. Por favor, inicia sesión.
        </Typography>
      </DefaultLayout>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditError(null);
    setPasswordError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditUser(user);
    setOpenModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setEditError(null);
    setPasswordError(null);
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditUser({ ...editUser, [field]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const usuarioToUpdate: UsuarioUpdate = {
        id: editUser.id,
        nombre: editUser.nombre,
        apellido: editUser.apellido,
        email: editUser.email,
        username: editUser.username,
        rol_id: editUser.rol?.id || null,
      };
      const updatedUser = await updateUsuario(usuarioToUpdate);
      
      updateUser({ ...updatedUser, rol: updatedUser.rol! });
      setIsEditing(false);
      setEditError(null);
    } catch (err: any) {
      setEditError(err.response?.data?.detail || "No se pudo actualizar los datos. Verifica la información.");
    }
  };

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordError("Las nuevas contraseñas no coinciden.");

      return;
    }
  try {
    const token = localStorage.getItem("access_token");

    await api.post(
      `${API_URL}/usuarios/change_password/`,
      { current_password: currentPassword, new_password: newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    setPasswordError(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setOpenModal(false);

    addToast({
      title: "Éxito",
      description: "Contraseña actualizada con éxito.",
      color:"success"
    });

  } catch (err: any) {
    setPasswordError(
      err.response?.data?.error ||
      "Error al cambiar la contraseña. Verifica los datos.",
     
    );
  }
};

  

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#fff', // Fondo blanco
      transition: 'all 0.3s ease-in-out',
      '& fieldset': { borderColor: '#e2e8f0' },
      '&:hover fieldset': { borderColor: '#cbd5e1' },
      '&.Mui-focused fieldset': { borderColor: '#2ecc71' },
      '&.Mui-disabled': {
        backgroundColor: '#fff', // Blanco también para deshabilitados
      },
      '& .MuiInputAdornment-root': {
        backgroundColor: 'inherit', // Fondo uniforme con el campo
        height: '100%',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#a0aec0',
      '&.Mui-focused': { color: '#2ecc71' },
      '&.Mui-disabled': { color: '#718096' },
    },
  };

  return (
    <DefaultLayout>
      <Box sx={{ p: 4, maxWidth: "600px", mx: "auto" }}>
        <Typography  sx={{ mb: 4, textAlign: "center" }} variant="h4">
          Mi Perfil
        </Typography>
        {!isEditing ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField disabled fullWidth label="Nombre" sx={textFieldStyles} value={user.nombre}  />
            <TextField disabled fullWidth label="Apellido" sx={textFieldStyles} value={user.apellido}  />
            <TextField disabled fullWidth label="Email" sx={textFieldStyles} value={user.email}  />
            <TextField disabled fullWidth label="Username" sx={textFieldStyles} value={user.username || ""}  />
            <TextField disabled fullWidth label="Rol" sx={textFieldStyles} value={user.rol?.rol || "Sin rol"}  />
            <TextField disabled fullWidth label="Contraseña" sx={textFieldStyles} value="••••••••"  />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button sx={{ backgroundColor: "#2ecc71" }} variant="contained"  onClick={handleEdit}>
                Editar
              </Button>
            </Box>
          </Box>
        ) : (
      <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2.5 }} onSubmit={handleSubmit}>
            {editError && (
              <Typography sx={{ color: "#f56565", textAlign: "center" }} variant="body2" >
                {editError}
              </Typography>
            )}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }}  transition={{ duration: 0.5 }}>
              <TextField
                fullWidth
                label="Nombre"
                sx={textFieldStyles}
                value={editUser.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
              />
              </motion.div>
              <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }}  transition={{ duration: 0.5, delay: 0.2 }}>
                <TextField
                  fullWidth
                  label="Apellido"
                  sx={textFieldStyles}
                  value={editUser.apellido}
                  onChange={(e) => handleChange("apellido", e.target.value)}
                />
              </motion.div>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }}  transition={{ duration: 0.5, delay: 0.4 }}>
                <TextField
                  fullWidth
                  label="Email"
                  sx={textFieldStyles}
                  type="email"
                  value={editUser.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </motion.div>
              <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }}  transition={{ duration: 0.5, delay: 0.6 }}>
                <TextField
                  fullWidth
                  label="Username"
                  sx={textFieldStyles}
                  value={editUser.username || ""}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
              </motion.div>
            </Box>
            <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }}  transition={{ duration: 0.5, delay: 0.8 }}>
              <TextField
                disabled
                fullWidth
                label="Rol"
                sx={textFieldStyles}
                value={editUser.rol?.rol || "Sin rol"}
              />
            </motion.div>
            <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }}  transition={{ duration: 0.5, delay: 1 }}>
                            <TextField
                    disabled
                    fullWidth
                    label="Contraseña"
                    slotProps={{
                      input: {
                        endAdornment: (
                          <Button
                            size="small"
                            sx={{ ml: 1 }}
                            variant="outlined"
                            onClick={() => setOpenModal(true)}
                          >
                            Cambiar
                          </Button>
                        ),
                      },
                    }}
                    sx={textFieldStyles}
                    value="••••••••"
                  />

            </motion.div>
            <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}  transition={{ duration: 0.5, delay: 1.2 }}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button sx={{ backgroundColor: "#2ecc71" }} type="submit" variant="contained" >
                  Actualizar datos
                </Button>
                <Button sx={{ borderColor: "#f56565", color: "#f56565" }} variant="outlined" onClick={handleCancel}>
                  Cancelar
                </Button>
              </Box>
            </motion.div>
          </Box>
        )}

          <Modal
            closeAfterTransition
            open={openModal}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
            slots={{ backdrop: Backdrop }}
            onClose={() => setOpenModal(false)}
          >
          <Fade in={openModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <Typography sx={{ mb: 2, textAlign: "center" }}variant="h6" >
                Cambiar Contraseña
              </Typography>
              {passwordError && (
                <Typography sx={{ color: "#f56565", textAlign: "center", mb: 2 }} variant="body2" >
                  {passwordError}
                </Typography>
              )}
              <Box component="form"  sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handlePasswordChange}>
              
              <TextField
                fullWidth
                label="Contraseña Actual"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={textFieldStyles}
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

                <TextField
                  fullWidth
                  label="Nueva Contraseña"
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={textFieldStyles}
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                      <TextField
                        fullWidth
                        label="Confirmar Nueva Contraseña"
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  edge="end"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={textFieldStyles}
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                  <Button sx={{ backgroundColor: "#2ecc71" }} type="submit" variant="contained" >
                    Cambiar
                  </Button>
                  <Button sx={{ borderColor: "#f56565", color: "#f56565" }} variant="outlined"  onClick={() => setOpenModal(false)}>
                    Cancelar
                  </Button>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </DefaultLayout>
  );
};

export default PerfilPage;