import React from "react";
import DefaultLayout from "@/layouts/default";
import { useUsuarios } from "@/hooks/usuarios/useUsuarios";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { Usuario } from "@/hooks/usuarios/useUsuarios";

const UsuariosPage: React.FC = () => {
  const { data: usuarios = [], isLoading, error } = useUsuarios();

  console.log("Usuarios obtenidos en UsuariosPage:", usuarios); // Depuración para ver los datos obtenidos de la API en la consola del navegador 

  const columns = [
    { name: "ID", uid: "id" },
    { name: "Nombre", uid: "nombre" },
    { name: "Apellido", uid: "apellido" },
    { name: "Email", uid: "email" },
    { name: "Username", uid: "username" },
    { name: "Rol", uid: "rol" },
    { name: "Acciones", uid: "acciones" },
  ];

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Usuarios</h2>
          {isLoading ? (
            <p className="text-gray-600">Cargando usuarios...</p>
          ) : error ? (
            <p className="text-red-500">
              Error al cargar usuarios: {error.message}. Verifica la consola para más detalles.
            </p>
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
                {usuarios.map((usuario: Usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>{usuario.id}</TableCell>
                    <TableCell>{usuario.nombre}</TableCell>
                    <TableCell>{usuario.apellido}</TableCell>
                    <TableCell>{usuario.email}</TableCell>
                    <TableCell>{usuario.username || "N/A"}</TableCell>
                    <TableCell>{usuario.rol?.rol || "Sin rol"}</TableCell>
                    <TableCell>
                      <button className="text-green-500 hover:underline mr-2">Editar</button>
                      <button className="text-red-500 hover:underline">Eliminar</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default UsuariosPage;