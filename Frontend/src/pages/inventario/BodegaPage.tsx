import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { useRegistrarBodega, useBodegas, useActualizarBodega, useEliminarBodega } from "@/hooks/inventario/useBodega";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import ReuModal from "@/components/globales/ReuModal";

interface Bodega {
  id: number;
  nombre: string;
  ubicacion: string;
  capacidad: number;
  direccion: string;
  telefono: string;
  activo: boolean;
}

const ReusableInput: React.FC<{
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}> = ({ label, type, name, value, placeholder, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

const BodegaPage: React.FC = () => {
  const [bodega, setBodega] = useState<Bodega>({
    id: 0,
    nombre: "",
    ubicacion: "",
    capacidad: 0,
    direccion: "",
    telefono: "",
    activo: true,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const mutation = useRegistrarBodega();
  const { data: bodegas, isLoading, refetch } = useBodegas();
  const updateMutation = useActualizarBodega();
  const deleteMutation = useEliminarBodega();

  const handleUpdate = (bodega: Bodega) => {
    setBodega(bodega);
    setModalOpen(true);
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Bodega</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (bodega.id === 0) {
                mutation.mutate(bodega, {
                  onSuccess: () => {
                    refetch();
                    setBodega({ id: 0, nombre: "", ubicacion: "", capacidad: 0, direccion: "", telefono: "", activo: true });
                  },
                });
              } else {
                updateMutation.mutate(bodega, {
                  onSuccess: () => {
                    refetch();
                    setBodega({ id: 0, nombre: "", ubicacion: "", capacidad: 0, direccion: "", telefono: "", activo: true });
                  },
                });
              }
            }}
          >
            <ReusableInput label="Nombre" placeholder="Ingrese el nombre" type="text" name="nombre" value={bodega.nombre} onChange={(e) => setBodega({ ...bodega, nombre: e.target.value })} />
            <ReusableInput label="Ubicación" placeholder="Ingrese la ubicación" type="text" name="ubicacion" value={bodega.ubicacion} onChange={(e) => setBodega({ ...bodega, ubicacion: e.target.value })} />
            <ReusableInput label="Capacidad" type="number" name="capacidad" value={String(bodega.capacidad)} onChange={(e) => setBodega({ ...bodega, capacidad: Number(e.target.value) })} />
            <ReusableInput label="Dirección" placeholder="Ingrese la dirección" type="text" name="direccion" value={bodega.direccion} onChange={(e) => setBodega({ ...bodega, direccion: e.target.value })} />
            <ReusableInput label="Teléfono" placeholder="Ingrese el teléfono" type="text" name="telefono" value={bodega.telefono} onChange={(e) => setBodega({ ...bodega, telefono: e.target.value })} />
            <div className="mb-4 flex items-center">
              <input type="checkbox" name="activo" checked={bodega.activo} onChange={(e) => setBodega({ ...bodega, activo: e.target.checked })} className="mr-2 leading-tight" />
              <label className="text-gray-700 text-sm font-bold">Activo</label>
            </div>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4" type="submit" disabled={mutation.isPending || updateMutation.isPending}>
              {mutation.isPending || updateMutation.isPending ? "Guardando..." : bodega.id === 0 ? "Guardar" : "Actualizar"}
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
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Ubicación</TableColumn>
                <TableColumn>Capacidad</TableColumn>
                <TableColumn>Dirección</TableColumn>
                <TableColumn>Teléfono</TableColumn>
                <TableColumn>Activo</TableColumn>
                <TableColumn>Acciones</TableColumn>
              </TableHeader>
              <TableBody>
                {(bodegas ?? []).map((bodega: Bodega) => (
                  <TableRow key={bodega.id}>
                    <TableCell>{bodega.nombre}</TableCell>
                    <TableCell>{bodega.ubicacion}</TableCell>
                    <TableCell>{bodega.capacidad}</TableCell>
                    <TableCell>{bodega.direccion}</TableCell>
                    <TableCell>{bodega.telefono}</TableCell>
                    <TableCell>{bodega.activo ? "Sí" : "No"}</TableCell>
                    <TableCell>
                      <button className="text-yellow-600 hover:bg-yellow-200 px-3 py-1 rounded" onClick={() => handleUpdate(bodega)}>Editar</button>
                      <button className="text-red-600 hover:bg-red-200 px-3 py-1 rounded ml-2" onClick={() => deleteMutation.mutate(bodega.id, { onSuccess: () => refetch() })}>Eliminar</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <ReuModal isOpen={modalOpen} onOpenChange={setModalOpen} title="Editar Bodega">
        <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
          {(Object.keys(bodega) as Array<keyof Bodega>).map((key) => (
            key !== "id" && key !== "activo" && (
              <ReusableInput
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                type={key === "capacidad" ? "number" : "text"}
                name={key}
                value={String(bodega[key])}
                onChange={(e) => setBodega({ ...bodega, [key]: key === "capacidad" ? Number(e.target.value) : e.target.value })}
              />
            )
          ))}
          <div className="mb-4 flex items-center">
            <input type="checkbox" name="activo" checked={bodega.activo} onChange={(e) => setBodega({ ...bodega, activo: e.target.checked })} className="mr-2 leading-tight" />
            <label className="text-gray-700 text-sm font-bold">Activo</label>
          </div>
          <Button className="bg-green-600 text-white w-full" onPress={() => updateMutation.mutate(bodega, { onSuccess: refetch })}>Actualizar</Button>
        </div>
      </ReuModal>
    </DefaultLayout>
  );
};

export default BodegaPage;