import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useRegistrarBodega, useBodegas } from "@/hooks/inventario/useBodega";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

const BodegaPage: React.FC = () => {
  const [bodega, setBodega] = useState({
    nombre: "",
    descripcion: "",
    cantidad: 0,
    tipo: "",
  });

  const mutation = useRegistrarBodega();
  const { data: bodegas, isLoading } = useBodegas();

  const columns = [
    { name: "Nombre", uid: "nombre" },
    { name: "Descripción", uid: "descripcion" },
    { name: "Cantidad", uid: "cantidad" },
    { name: "Tipo", uid: "tipo" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBodega((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(bodega);
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Bodega</h2>
          <form onSubmit={handleSubmit}>
            <ReuInput
              label="Nombre"
              placeholder="Ingrese el nombre"
              type="text"
              name="nombre"
              value={bodega.nombre}
              onChange={handleChange}
            />
            <ReuInput
              label="Descripción"
              placeholder="Ingrese la descripción"
              type="text"
              name="descripcion"
              value={bodega.descripcion}
              onChange={handleChange}
            />
            <ReuInput
              label="Cantidad"
              placeholder="Ingrese la cantidad"
              type="number"
              name="cantidad"
              value={bodega.cantidad}
              onChange={handleChange}
            />
            <ReuInput
              label="Tipo"
              placeholder="Ingrese el tipo"
              type="text"
              name="tipo"
              value={bodega.tipo}
              onChange={handleChange}
            />
            <button
              className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4"
              type="submit"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Registrando..." : "Guardar"}
            </button>
          </form>
        </div>

        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Bodegas</h2>
          {isLoading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
            <Table>
              <TableHeader>
                {columns.map((col) => (
                  <TableColumn key={col.uid}>{col.name}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {bodegas?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.nombre}</TableCell>
                    <TableCell>{item.descripcion}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                    <TableCell>{item.tipo}</TableCell>
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

export default BodegaPage;