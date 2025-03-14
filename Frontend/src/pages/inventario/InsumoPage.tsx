import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import {
  useRegistrarInsumo,
  useInsumos,
  useActualizarInsumo,
  useEliminarInsumo,
} from "@/hooks/inventario/useInsumo";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import ReuModal from "@/components/globales/ReuModal";
import { Button } from "@heroui/react"; // or the correct path to your Button component

interface Insumo {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  unidad_medida: string;
  activo: boolean;
}

const ReusableInput: React.FC<{
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
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

const InsumoPage: React.FC = () => {
  const [insumo, setInsumo] = useState<Insumo>({
    id: 0,
    nombre: "",
    descripcion: "",
    cantidad: 0,
    unidad_medida: "",
    activo: true,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const mutation = useRegistrarInsumo();
  const { data: insumos, isLoading, refetch } = useInsumos();
  const updateMutation = useActualizarInsumo();
  const deleteMutation = useEliminarInsumo();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setInsumo((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (insumo.id === 0) {
      mutation.mutate(insumo, {
        onSuccess: () => {
          refetch();
          setInsumo({
            id: 0,
            nombre: "",
            descripcion: "",
            cantidad: 0,
            unidad_medida: "",
            activo: true,
          });
          setModalOpen(false);
        },
      });
    } else {
      updateMutation.mutate(insumo, {
        onSuccess: () => {
          refetch();
          setInsumo({
            id: 0,
            nombre: "",
            descripcion: "",
            cantidad: 0,
            unidad_medida: "",
            activo: true,
          });
          setModalOpen(false);
        },
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, { onSuccess: () => refetch() });
  };

  const handleUpdate = (insumo: Insumo) => {
    setInsumo(insumo);
    setModalOpen(true);
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Registro de Insumo
          </h2>
          <form onSubmit={handleSubmit}>
            <ReusableInput
              label="Nombre"
              type="text"
              name="nombre"
              value={insumo.nombre}
              onChange={handleChange}
            />
            <ReusableInput
              label="Descripción"
              type="text"
              name="descripcion"
              value={insumo.descripcion}
              onChange={handleChange}
            />
            <ReusableInput
              label="Cantidad"
              type="number"
              name="cantidad"
              value={insumo.cantidad.toString()}
              onChange={handleChange}
            />
            <ReusableInput
              label="Unidad de Medida"
              type="text"
              name="unidad_medida"
              value={insumo.unidad_medida}
              onChange={handleChange}
            />
            <button
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4"
              type="submit"
              disabled={mutation.isPending || updateMutation.isPending}
            >
              {mutation.isPending || updateMutation.isPending
                ? "Guardando..."
                : insumo.id === 0
                ? "Guardar"
                : "Actualizar"}
            </button>
          </form>
        </div>
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Lista de Insumos
          </h2>
          {isLoading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Descripción</TableColumn>
                <TableColumn>Cantidad</TableColumn>
                <TableColumn>Unidad</TableColumn>
                <TableColumn>Acciones</TableColumn>
              </TableHeader>
              <TableBody>
                {(insumos ?? []).map((insumo: Insumo) => (
                  <TableRow key={insumo.id}>
                    <TableCell>{insumo.nombre}</TableCell>
                    <TableCell>{insumo.descripcion}</TableCell>
                    <TableCell>{insumo.cantidad}</TableCell>
                    <TableCell>{insumo.unidad_medida}</TableCell>
                    <TableCell>
                      <button
                        className="text-yellow-600 hover:bg-yellow-200 px-3 py-1 rounded"
                        onClick={() => handleUpdate(insumo)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:bg-red-200 px-3 py-1 rounded ml-2"
                        onClick={() => handleDelete(insumo.id)}
                      >
                        Eliminar
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <ReuModal isOpen={modalOpen} onOpenChange={setModalOpen} title="Editar Insumo">
        <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <ReusableInput
              label="Nombre"
              type="text"
              name="nombre"
              value={insumo.nombre}
              onChange={handleChange}
            />
            <ReusableInput
              label="Descripción"
              type="text"
              name="descripcion"
              value={insumo.descripcion}
              onChange={handleChange}
            />
            <ReusableInput
              label="Cantidad"
              type="number"
              name="cantidad"
              value={insumo.cantidad.toString()}
              onChange={handleChange}
            />
            <ReusableInput
              label="Unidad de Medida"
              type="text"
              name="unidad_medida"
              value={insumo.unidad_medida}
              onChange={handleChange}
            />
            <Button className="bg-green-600 text-white w-full" type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Actualizando..." : "Actualizar"}
            </Button>
          </form>
        </div>
      </ReuModal>
    </DefaultLayout>
  );
};

export default InsumoPage;