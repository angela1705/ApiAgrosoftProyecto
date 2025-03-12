import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useRegistrarBodegaInsumo, useBodegaInsumos } from "@/hooks/inventario/useBodegaInsumo";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import useWebSocket from "@/hooks/useWebSocket";

const BodegaInsumoPage: React.FC = () => {
  const [bodegaInsumo, setBodegaInsumo] = useState({
    bodega: "",
    insumo: "",
    cantidad: 0,
  });

  const mutation = useRegistrarBodegaInsumo();
  const { data: bodegaInsumos, isLoading, refetch } = useBodegaInsumos();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBodegaInsumo((prev) => ({
      ...prev,
      [name]: name === "cantidad" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(bodegaInsumo);
  };

  const handleWebSocketMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.action === "update") {
      refetch();
    }
  };

  useWebSocket("ws://127.0.0.1:8000/ws/inventario/bodega_insumo/", handleWebSocketMessage);

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Bodega Insumo</h2>
          <form onSubmit={handleSubmit}>
            <ReuInput
              label="Bodega"
              placeholder="Ingrese la bodega"
              type="text"
              name="bodega"
              value={bodegaInsumo.bodega}
              onChange={handleChange}
            />
            <ReuInput
              label="Insumo"
              placeholder="Ingrese el insumo"
              type="text"
              name="insumo"
              value={bodegaInsumo.insumo}
              onChange={handleChange}
            />
            <ReuInput
              label="Cantidad"
              placeholder="Ingrese la cantidad"
              type="number"
              name="cantidad"
              value={bodegaInsumo.cantidad}
              onChange={handleChange}
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg mt-4">
              Agregar Bodega Insumo
            </button>
          </form>
        </div>

        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableColumn>Bodega</TableColumn>
              <TableColumn>Insumo</TableColumn>
              <TableColumn>Cantidad</TableColumn>
            </TableHeader>
            <TableBody>
              {bodegaInsumos?.map((bodegaInsumo) => (
                <TableRow key={bodegaInsumo.id}>
                  <TableCell>{bodegaInsumo.bodega}</TableCell>
                  <TableCell>{bodegaInsumo.insumo}</TableCell>
                  <TableCell>{bodegaInsumo.cantidad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </DefaultLayout>
  );
};

export default BodegaInsumoPage;