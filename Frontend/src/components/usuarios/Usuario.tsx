import { useUsuarios } from "../../hooks/usuarios/useUsuarios";
import Tabla from "../globales/Tabla";

const columns = [
  { uid: "id", name: "ID" },
  { uid: "nombre", name: "Nombre" },
  { uid: "apellido", name: "Apellido" },
  { uid: "email", name: "Email" },
  { uid: "rol", name: "Rol" },
];

const Usuarios = () => {
  const { data: usuariosAPI = [], isLoading, error } = useUsuarios();

  if (isLoading) {
    return <div className="text-center text-gray-500">Cargando usuarios...</div>;
  }

  if (error instanceof Error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  const formattedData = usuariosAPI.map((usuario) => ({
    id: String(usuario.id),  
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email,
    rol: usuario.rol?.rol || "Sin rol",
  }));

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      <h1 className="text-lg font-semibold mb-4 text-center">Lista de Usuarios</h1>
      <Tabla columns={columns} data={formattedData} />
    </div>
  );
};

export default Usuarios;
