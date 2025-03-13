import React, { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUsuarios, UsuarioUpdate } from "@/hooks/usuarios/useUsuarios";
import DefaultLayout from "@/layouts/default";
import { Box, Button, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";

const PerfilPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { updateUsuario } = useUsuarios();
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(user);
  const [editError, setEditError] = useState<string | null>(null);

  if (!user || !editUser) {
    return (
      <DefaultLayout>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
          No se encontró información del usuario. Por favor, inicia sesión.
        </Typography>
      </DefaultLayout>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditUser(user);  
    setEditError(null);
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
      console.log("Enviando al backend desde perfil:", usuarioToUpdate);
      const updatedUser = await updateUsuario(usuarioToUpdate);
      updateUser(updatedUser);
      setIsEditing(false);
      setEditError(null);
    } catch (err: any) {
      console.error("Error del backend:", err.response?.data);
      setEditError(err.response?.data?.detail || "No se pudo actualizar los datos. Verifica la información.");
    }
  };

  return (
    <DefaultLayout>
      <Box sx={{ p: 4, maxWidth: "600px", mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
          Mi Perfil
        </Typography>
        {!isEditing ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Nombre" value={user.nombre} disabled fullWidth />
            <TextField label="Apellido" value={user.apellido} disabled fullWidth />
            <TextField label="Email" value={user.email} disabled fullWidth />
            <TextField label="Username" value={user.username || ""} disabled fullWidth />
            <TextField label="Rol" value={user.rol?.rol || "Sin rol"} disabled fullWidth />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button variant="contained" sx={{ backgroundColor: "#2ecc71" }} onClick={handleEdit}>
                Editar
              </Button>
            </Box>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {editError && (
              <Typography variant="body2" sx={{ color: "#f56565", textAlign: "center" }}>
                {editError}
              </Typography>
            )}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <TextField
                  label="Nombre"
                  value={editUser.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  fullWidth
                  required
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <TextField
                  label="Apellido"
                  value={editUser.apellido}
                  onChange={(e) => handleChange("apellido", e.target.value)}
                  fullWidth
                  required
                />
              </motion.div>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <TextField
                  type="email"
                  label="Email"
                  value={editUser.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  fullWidth
                  required
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                <TextField
                  label="Username"
                  value={editUser.username || ""}
                  onChange={(e) => handleChange("username", e.target.value)}
                  fullWidth
                />
              </motion.div>
            </Box>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
              <TextField
                label="Rol"
                value={editUser.rol?.rol || "Sin rol"}
                disabled
                fullWidth
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                <Button type="submit" variant="contained" sx={{ backgroundColor: "#2ecc71" }}>
                  Actualizar datos
                </Button>
                <Button variant="outlined" onClick={handleCancel} sx={{ borderColor: "#f56565", color: "#f56565" }}>
                  Cancelar
                </Button>
              </Box>
            </motion.div>
          </Box>
        )}
      </Box>
    </DefaultLayout>
  );
};

export default PerfilPage;