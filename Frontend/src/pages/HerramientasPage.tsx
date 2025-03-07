import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/ReuInput";
import { useRegistrarHerramienta, useHerramientas } from "@/hooks/inventario/useHerramientas";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

const HerramientasPage: React.FC = () => {
  const [herramienta, setHerramienta] = useState({
    nombre: "",
    descripcion: "",
    cantidad: 0,
  });

  const mutation = useRegistrarHerramienta();
  const { data: herramientas, isLoading } = useHerramientas();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHerramienta((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(herramienta);
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Herramienta</h2>
          <form onSubmit={handleSubmit}>
            <ReuInput
              label="Nombre"
              placeholder="Ingrese el nombre"
              type="text"
              name="nombre"
              value={herramienta.nombre}
              onChange={handleChange}
            />
            <ReuInput
              label="Descripción"
              placeholder="Ingrese la descripción"
              type="text"
              name="descripcion"
              value={herramienta.descripcion}
              onChange={handleChange}
            />
            <ReuInput
              label="Cantidad"
              placeholder="Ingrese la cantidad"
              type="number"
              name="cantidad"
              value={herramienta.cantidad}
              onChange={handleChange}
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4">
              Agregar Herramienta
            </button>
          </form>
        </div>

        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableColumn>Nombre</TableColumn>
              <TableColumn>Descripción</TableColumn>
              <TableColumn>Cantidad</TableColumn>
            </TableHeader>
            <TableBody>
              {herramientas?.map((herramienta) => (
                <TableRow key={herramienta.id}>
                  <TableCell>{herramienta.nombre}</TableCell>
                  <TableCell>{herramienta.descripcion}</TableCell>
                  <TableCell>{herramienta.cantidad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </DefaultLayout>
  );
};

export default HerramientasPage;