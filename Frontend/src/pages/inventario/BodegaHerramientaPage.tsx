import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useRegistrarBodegaHerramienta, useBodegaHerramientas } from "@/hooks/inventario/useBodegaHerramienta";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import useWebSocket from "@/hooks/useWebSocket";

const BodegaHerramientaPage: React.FC = () => {
  const [bodegaHerramienta, setBodegaHerramienta] = useState({
    bodega: "",
    herramienta: "",
    cantidad: 0,
  });

  const mutation = useRegistrarBodegaHerramienta();
  const { data: bodegaHerramientas, isLoading, refetch } = useBodegaHerramientas();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBodegaHerramienta((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(bodegaHerramienta);
  };

  const handleWebSocketMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.action === "update") {
      refetch();
    }
  };

  useWebSocket("ws://127.0.0.1:8000/ws/inventario/bodega_herramienta/", handleWebSocketMessage);

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Bodega Herramienta</h2>
          <form onSubmit={handleSubmit}>
            <ReuInput
              label="Bodega"
              placeholder="Ingrese la bodega"
              type="text"
              name="bodega"
              value={bodegaHerramienta.bodega}
              onChange={handleChange}
            />
            <ReuInput
              label="Herramienta"
              placeholder="Ingrese la herramienta"
              type="text"
              name="herramienta"
              value={bodegaHerramienta.herramienta}
              onChange={handleChange}
            />
            <ReuInput
              label="Cantidad"
              placeholder="Ingrese la cantidad"
              type="number"
              name="cantidad"
              value={bodegaHerramienta.cantidad}
              onChange={handleChange}
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4">
              Agregar Bodega Herramienta
            </button>
          </form>
        </div>

        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableColumn>Bodega</TableColumn>
              <TableColumn>Herramienta</TableColumn>
              <TableColumn>Cantidad</TableColumn>
            </TableHeader>
            <TableBody>
              {bodegaHerramientas?.map((bodegaHerramienta) => (
                <TableRow key={bodegaHerramienta.id}>
                  <TableCell>{bodegaHerramienta.bodega}</TableCell>
                  <TableCell>{bodegaHerramienta.herramienta}</TableCell>
                  <TableCell>{bodegaHerramienta.cantidad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </DefaultLayout>
  );
};

export default BodegaHerramientaPage;