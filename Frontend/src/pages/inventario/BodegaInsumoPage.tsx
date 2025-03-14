import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { BodegaInsumo } from "@/types/inventario/BodegaInsumo";
import { Insumo } from "@/types/inventario/Insumo";
import { useBodegaInsumos, useRegistrarBodegaInsumo, useActualizarBodegaInsumo, useEliminarBodegaInsumo } from "@/hooks/inventario/useBodegaInsumo";
import { useBodegas } from "@/hooks/inventario/useBodega";
import { useInsumos } from "@/hooks/inventario/useInsumo";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import ReuModal from "@/components/globales/ReuModal";

const BodegaInsumoPage: React.FC = () => {
  const [bodegaInsumo, setBodegaInsumo] = useState<BodegaInsumo>({
    id: 0,
    bodega: 0,
    insumo: 0,
    cantidad: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const { data: bodegas } = useBodegas();
  const { data: insumos } = useInsumos();
  const { data: bodegaInsumos, isLoading, refetch } = useBodegaInsumos();
  const mutation = useRegistrarBodegaInsumo();
  const updateMutation = useActualizarBodegaInsumo();
  const deleteMutation = useEliminarBodegaInsumo();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBodegaInsumo((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bodegaInsumo.id === 0) {
      mutation.mutate(bodegaInsumo, {
        onSuccess: () => {
          refetch();
          setBodegaInsumo({ id: 0, bodega: 0, insumo: 0, cantidad: 0 });
        },
      });
    } else {
      updateMutation.mutate(bodegaInsumo, {
        onSuccess: () => {
          refetch();
          setBodegaInsumo({ id: 0, bodega: 0, insumo: 0, cantidad: 0 });
        },
      });
    }
  };

  const handleDelete = (id: number) => deleteMutation.mutate(id, { onSuccess: () => refetch() });
  const handleUpdate = (item: BodegaInsumo) => {
    setBodegaInsumo(item);
    setModalOpen(true);
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Bodega Insumo</h2>
          <form onSubmit={handleSubmit}>
            <select name="bodega" value={bodegaInsumo.bodega} onChange={handleChange} className="w-full mb-4 p-2 border rounded">
              <option value="0">Seleccione una Bodega</option>
              {bodegas?.map((bodega: { id: number; nombre: string }) => (
                <option key={bodega.id} value={bodega.id}>{bodega.nombre}</option>
              ))}
            </select>
            <select name="insumo" value={bodegaInsumo.insumo} onChange={handleChange} className="w-full mb-4 p-2 border rounded">
              <option value="0">Seleccione un Insumo</option>
              {insumos?.map((insumo: Insumo) => (
                <option key={insumo.id} value={insumo.id}>{insumo.nombre}</option>
              ))}
            </select>
            <input type="number" name="cantidad" value={bodegaInsumo.cantidad} onChange={handleChange} className="w-full mb-4 p-2 border rounded" placeholder="Cantidad" />
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4" type="submit" disabled={mutation.isPending || updateMutation.isPending}>{mutation.isPending || updateMutation.isPending ? "Guardando..." : bodegaInsumo.id === 0 ? "Guardar" : "Actualizar"}</button>
          </form>
        </div>
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Bodega Insumos</h2>
          {isLoading ? <p className="text-gray-600">Cargando...</p> : (
            <Table>
              <TableHeader>
                <TableColumn>Bodega</TableColumn>
                <TableColumn>Insumo</TableColumn>
                <TableColumn>Cantidad</TableColumn>
                <TableColumn>Acciones</TableColumn>
              </TableHeader>
              <TableBody>
                {bodegaInsumos?.map((item: BodegaInsumo) => (
                  <TableRow key={item.id}>
                    <TableCell>{bodegas?.find((b: { id: number }) => b.id === item.bodega)?.nombre || "Desconocido"}</TableCell>
                    <TableCell>{insumos?.find((i: Insumo) => i.id === item.insumo)?.nombre || "Desconocido"}</TableCell>
                    <TableCell>{item.cantidad}</TableCell>
                    <TableCell>
                      <button className="text-yellow-600 hover:bg-yellow-200 px-3 py-1 rounded" onClick={() => handleUpdate(item)}>Editar</button>
                      <button className="text-red-600 hover:bg-red-200 px-3 py-1 rounded ml-2" onClick={() => handleDelete(item.id)}>Eliminar</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <ReuModal isOpen={modalOpen} onOpenChange={setModalOpen} title="Editar Bodega Insumo">
        <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <select name="bodega" value={bodegaInsumo.bodega} onChange={handleChange} className="w-full mb-4 p-2 border rounded">
              <option value="0">Seleccione una Bodega</option>
              {bodegas?.map((bodega: { id: number; nombre: string }) => (
                <option key={bodega.id} value={bodega.id}>{bodega.nombre}</option>
              ))}
            </select>
            <select name="insumo" value={bodegaInsumo.insumo} onChange={handleChange} className="w-full mb-4 p-2 border rounded">
              <option value="0">Seleccione un Insumo</option>
              {insumos?.map((insumo: Insumo) => (
                <option key={insumo.id} value={insumo.id}>{insumo.nombre}</option>
              ))}
            </select>
            <input type="number" name="cantidad" value={bodegaInsumo.cantidad} onChange={handleChange} className="w-full mb-4 p-2 border rounded" placeholder="Cantidad" />
            <Button className="bg-green-600 text-white w-full" type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Actualizando..." : "Actualizar"}
            </Button>
          </form>
        </div>
      </ReuModal>
    </DefaultLayout>
  );
};

export default BodegaInsumoPage;