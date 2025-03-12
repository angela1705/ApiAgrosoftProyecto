import React, { useState, FormEvent } from "react";
import DefaultLayout from "@/layouts/default";
import { useUsuarios, UsuarioUpdate } from "@/hooks/usuarios/useUsuarios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const UsuariosPage: React.FC = () => {
  const { user } = useAuth();
  const { data: usuarios = [], isLoading, error, updateUsuario, deleteUsuario, roles = [], isLoadingRoles } = useUsuarios();
  console.log("Usuarios cargados:", usuarios);
  console.log("Roles disponibles:", roles);
  const [editUsuario, setEditUsuario] = useState<null | { id: number; nombre: string; apellido: string; email: string; username?: string; rol: { id: number; rol: string } | null }>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [editError, setEditError] = useState<string | null>(null);

  if (!user || user.rol?.rol.toLowerCase() !== "administrador") {
    return <Navigate to="/perfil" replace />;
}

  const columns = [
    { name: "ID", uid: "id" },
    { name: "Nombre", uid: "nombre" },
    { name: "Apellido", uid: "apellido" },
    { name: "Email", uid: "email" },
    { name: "Username", uid: "username" },
    { name: "Rol", uid: "rol" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleEdit = (usuario: typeof editUsuario) => {
    setEditUsuario(usuario ? { ...usuario } : null);
    setEditError(null);
  };

  const handleDelete = (id: number) => {
    if (confirmDelete === id) {
      deleteUsuario(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editUsuario) return;
    try {
      const usuarioToUpdate: UsuarioUpdate = {
        id: editUsuario.id,
        nombre: editUsuario.nombre,
        apellido: editUsuario.apellido,
        email: editUsuario.email,
        username: editUsuario.username,
        rol_id: editUsuario.rol ? editUsuario.rol.id : null,
      };
      console.log("Enviando al backend:", usuarioToUpdate);
      await updateUsuario(usuarioToUpdate);
      setEditUsuario(null);
      setEditError(null);
    } catch (err: any) {
      console.error("Error del backend:", err.response?.data);
      setEditError(err.response?.data?.detail || "No se pudo actualizar el usuario. Verifica los datos.");
    }
  };

  const handleChange = (field: string, value: string | number) => {
    if (editUsuario) {
      if (field === "rol") {
        const selectedRol = roles.find((r) => r.id === Number(value));
        setEditUsuario({ ...editUsuario, rol: selectedRol || null });
      } else {
        setEditUsuario({ ...editUsuario, [field]: value });
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Usuarios</h2>
          {isLoading ? (
            <p className="text-gray-600">Cargando usuarios...</p>
          ) : error ? (
            <p className="text-red-500">Error al cargar usuarios: {error.message}</p>
          ) : usuarios.length === 0 ? (
            <p className="text-gray-600">No hay usuarios disponibles.</p>
          ) : (
            <Table>
              <TableHeader>
                {columns.map((col) => (
                  <TableColumn key={col.uid}>{col.name}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.id}</TableCell>
                    <TableCell>{usuario.nombre}</TableCell>
                    <TableCell>{usuario.apellido}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.username || "N/A"}</TableCell>
                    <TableCell>{usuario.rol?.rol || "Sin rol"}</TableCell>
                    <TableCell>
                      <button
                        className="text-green-500 hover:underline mr-2"
                        onClick={() => handleEdit(usuario)}
                      >
                        Editar
                      </button>
                      {confirmDelete === usuario.id ? (
                        <span className="text-gray-700">
                          ¿Seguro?{" "}
                          <button
                            className="text-red-500 hover:underline ml-1"
                            onClick={() => handleDelete(usuario.id)}
                          >
                            Sí
                          </button>{" "}
                          <button
                            className="text-green-500 hover:underline ml-1"
                            onClick={() => setConfirmDelete(null)}
                          >
                            No
                          </button>
                        </span>
                      ) : (
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => setConfirmDelete(usuario.id)}
                        >
                          Eliminar
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {editUsuario && (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2.5, width: "100%", maxWidth: "600px", mx: "auto" }}>
              <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", color: "#1a202c" }}>
                Editar Usuario
              </Typography>
              {editError && (
                <Typography variant="body2" sx={{ color: "#f56565", textAlign: "center" }}>
                  {editError}
                </Typography>
              )}
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                  <TextField
                    label="Nombre"
                    value={editUsuario.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    fullWidth
                    required
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <TextField
                    label="Apellido"
                    value={editUsuario.apellido}
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
                    value={editUsuario.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    fullWidth
                    required
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                  <TextField
                    label="Username"
                    value={editUsuario.username || ""}
                    onChange={(e) => handleChange("username", e.target.value)}
                    fullWidth
                  />
                </motion.div>
              </Box>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <select
                  value={editUsuario.rol?.id || ""}
                  onChange={(e) => handleChange("rol", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Seleccione un rol</option>
                  {isLoadingRoles ? (
                    <option value="">Cargando roles...</option>
                  ) : (
                    roles.map((rol) => (
                      <option key={rol.id} value={rol.id}>
                        {rol.rol}
                      </option>
                    ))
                  )}
                </select>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }}>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                  <Button type="submit" variant="contained" sx={{ backgroundColor: "#2ecc71" }}>
                    Guardar
                  </Button>
                  <Button variant="outlined" onClick={() => setEditUsuario(null)} sx={{ borderColor: "#f56565", color: "#f56565" }}>
                    Cancelar
                  </Button>
                </Box>
              </motion.div>
            </Box>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UsuariosPage;