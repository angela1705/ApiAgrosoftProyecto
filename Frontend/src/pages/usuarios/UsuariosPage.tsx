import React, { useState, useMemo } from "react";
import DefaultLayout from "@/layouts/default";
import { useUsuarios } from "@/hooks/usuarios/useUsuarios";
import { Navigate } from "react-router-dom";
import Tabla from "@/components/globales/Tabla";
import { useAuth } from "@/context/AuthContext";
import ReuModal from "@/components/globales/ReuModal";
import { ReuInput } from "@/components/globales/ReuInput";
import { EditIcon, Trash2 } from "lucide-react";

const UsuariosPage: React.FC = () => {
  const { user } = useAuth();
  const { data: usuarios = [], isLoading, error, updateUsuario, deleteUsuario, roles } = useUsuarios();
  const [selectedUsuario, setSelectedUsuario] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!user || user.rol?.rol.toLowerCase() !== "administrador") {
    return <Navigate to="/perfil" replace />;
  }

  const columns = [
    { name: "Nombre", uid: "nombre" },
    { name: "Apellido", uid: "apellido" },
    { name: "Correo electrónico", uid: "email" },
    { name: "Nombre de usuario", uid: "username" },
    { name: "Rol", uid: "rol" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleEdit = (usuario: any) => {
    setSelectedUsuario(usuario);
    setIsEditModalOpen(true);
  };

  const handleDelete = (usuario: any) => {
    setSelectedUsuario(usuario);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUsuario && selectedUsuario.id !== undefined) {
      deleteUsuario(selectedUsuario.id);
      setIsDeleteModalOpen(false);
    }
  };

  const formattedData = useMemo(() => {
    return usuarios.map((usuario) => ({
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      username: usuario.username || "N/A",
      rol: usuario.rol?.rol || "Sin rol",
      acciones: (
        <>
          <button className="mr-2" onClick={() => handleEdit(usuario)}>
            <EditIcon size={22} color='black' />
          </button>
          <button onClick={() => handleDelete(usuario)}>
            <Trash2 size={22} color='red' />
          </button>
        </>
      ),
    }));
  }, [usuarios]);

  return (
    <DefaultLayout>
      <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">Lista de Usuarios</h2>
      
      <div className="mb-2 flex justify-start">
        <button className="px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105">
          + Registrar
        </button>
      </div>

      {isLoading ? (
        <p className="text-gray-600 text-center">Cargando usuarios...</p>
      ) : error ? (
        <p className="text-red-500 text-center">Error al cargar usuarios: {error.message}</p>
      ) : formattedData.length === 0 ? (
        <p className="text-gray-600 text-center">No hay usuarios disponibles.</p>
      ) : (
        <Tabla columns={columns} data={formattedData} />
      )}

      <ReuModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Editar Usuario"
        onConfirm={() => {
          if (selectedUsuario && selectedUsuario.id !== undefined) {
            const usuarioActualizado = {
              id: selectedUsuario.id,
              nombre: selectedUsuario.nombre,
              apellido: selectedUsuario.apellido,
              email: selectedUsuario.email,
              username: selectedUsuario.username || "",
              rol_id: selectedUsuario.rol_id ?? null, 
            };
            updateUsuario(usuarioActualizado);
            setIsEditModalOpen(false);
          }
        }}
      >
        <ReuInput label="Nombre" placeholder="Ingrese el nombre" type="text" value={selectedUsuario?.nombre || ''} onChange={(e) => setSelectedUsuario((prev: any) => ({ ...prev, nombre: e.target.value }))} />
        <ReuInput label="Apellido" placeholder="Ingrese el apellido" type="text" value={selectedUsuario?.apellido || ''} onChange={(e) => setSelectedUsuario((prev: any) => ({ ...prev, apellido: e.target.value }))} />
        <ReuInput label="Correo Electrónico" placeholder="Ingrese el correo" type="email" value={selectedUsuario?.email || ''} onChange={(e) => setSelectedUsuario((prev: any) => ({ ...prev, email: e.target.value }))} />
        <ReuInput label="Nombre de Usuario" placeholder="Ingrese el nombre de usuario" type="text" value={selectedUsuario?.username || ''} onChange={(e) => setSelectedUsuario((prev: any) => ({ ...prev, username: e.target.value }))} />
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Rol</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={selectedUsuario?.rol_id || ""} onChange={(e) => setSelectedUsuario((prev: any) => ({ ...prev, rol_id: parseInt(e.target.value) }))}>
            <option value="">Seleccione un rol</option>
            {roles?.map((rol) => (
              <option key={rol.id} value={rol.id}>{rol.rol}</option>
            ))}
          </select>
        </div>
      </ReuModal>

      <ReuModal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} title="¿Estás seguro de eliminar este usuario?" onConfirm={handleConfirmDelete}>
        <p>Esta acción es irreversible.</p>
      </ReuModal>
    </DefaultLayout>
  );
};

export default UsuariosPage;
