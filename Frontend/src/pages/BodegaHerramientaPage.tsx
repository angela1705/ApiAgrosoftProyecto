import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { useRegistrarBodegaHerramienta, useBodegaHerramienta, useActualizarBodegaHerramienta, useEliminarBodegaHerramienta } from "@/hooks/inventario/useBodegaHerramienta";
import { useBodegas } from "@/hooks/inventario/useBodega";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { BodegaHerramienta } from "@/types/inventario/BodegaHerramienta";

const BodegaHerramientaPage: React.FC = () => {
  const [bodegaHerramienta, setBodegaHerramienta] = useState<BodegaHerramienta>({
    id: 0,
    bodega: 0, 
    herramienta:"", 
    cantidad: 0,
  });

  const mutation = useRegistrarBodegaHerramienta();
  const { data, isLoading, refetch } = useBodegaHerramienta();
  const updateMutation = useActualizarBodegaHerramienta();
  const deleteMutation = useEliminarBodegaHerramienta();
  const { data: bodegas } = useBodegas();

  const bodegasHerramientas = data ?? [];

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/inventario/bodega_herramienta/");
    socket.onmessage = () => refetch();
    return () => socket.close();
  }, [refetch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBodegaHerramienta((prev) => ({
      ...prev,
      [name]: name === "cantidad" || name === "bodega" || name === "herramienta" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bodegaHerramienta.bodega || !bodegaHerramienta.herramienta) {
      alert("Por favor, selecciona una bodega y una herramienta válidas.");
      return;
    }

    if (bodegaHerramienta.id === 0) {
      mutation.mutate(bodegaHerramienta, { onSuccess: () => refetch() });
    } else {
      updateMutation.mutate(bodegaHerramienta, { onSuccess: () => refetch() });
    }

    setBodegaHerramienta({ id: 0, bodega: 1, herramienta: "", cantidad: 1 });
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Bodega Herramienta</h2>
          <form onSubmit={handleSubmit}>
            <select name="bodega" value={bodegaHerramienta.bodega} onChange={handleChange} className="w-full p-2 border rounded mb-2">
              <option value="">Seleccione una bodega</option>
              {bodegas?.map((bodega) => (
                <option key={bodega.id} value={bodega.id}>{bodega.nombre}</option>
              ))}
            </select>
            <input type="number" name="herramienta" value={bodegaHerramienta.herramienta} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="ID Herramienta" />
            <input type="number" name="cantidad" value={bodegaHerramienta.cantidad} onChange={handleChange} className="w-full p-2 border rounded mb-2" placeholder="Cantidad" />
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4" type="submit">
              {bodegaHerramienta.id === 0 ? "Guardar" : "Actualizar"}
            </button>
          </form>
        </div>

        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Bodega Herramienta</h2>
          {isLoading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableColumn>Bodega</TableColumn>
                <TableColumn>Herramienta</TableColumn>
                <TableColumn>Cantidad</TableColumn>
                <TableColumn>Acciones</TableColumn>
              </TableHeader>
              <TableBody>
                {bodegasHerramientas.map((item: BodegaHerramienta) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.bodega}</TableCell>
                    <TableCell>{item.herramienta}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                    <TableCell>
                      <button className="text-yellow-600 hover:bg-yellow-200 px-3 py-1 rounded" onClick={() => setBodegaHerramienta(item)}>Editar</button>
                      <button className="text-red-600 hover:bg-red-200 px-3 py-1 rounded ml-2" onClick={() => deleteMutation.mutate(item.id)}>Eliminar</button>
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

export default BodegaHerramientaPage;
