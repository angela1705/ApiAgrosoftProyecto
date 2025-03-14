import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "../../components/globales/ReuInput";
import { TipoActividad } from "@/types/cultivo/TipoActividad";
import { useRegistrarTipoActividad, useTipoActividad, useActualizarTipoActividad, useEliminarTipoActividad } from "../../hooks/cultivo/usetipoactividad";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import ReuModal from "../../components/globales/ReuModal";

const TipoActividadPage: React.FC = () => {
  const [tipoActividad, setTipoActividad] = useState<TipoActividad>({
    nombre: "",
    descripcion: "",
  });

  const [selectedTipoActividad, setSelectedTipoActividad] = useState<TipoActividad | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const mutation = useRegistrarTipoActividad();
  const actualizarMutation = useActualizarTipoActividad();
  const eliminarMutation = useEliminarTipoActividad();
  const { data: tipoActividades, isLoading } = useTipoActividad();

  const columns = [
    { name: "Nombre", uid: "nombre" },
    { name: "Descripción", uid: "descripcion" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleEdit = (tipoActividad: TipoActividad) => {
    setSelectedTipoActividad(tipoActividad);
    setTipoActividad(tipoActividad);
    setIsEditModalOpen(true);
  };

  const handleDelete = (tipoActividad: TipoActividad) => {
    setSelectedTipoActividad(tipoActividad);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTipoActividad && selectedTipoActividad.id !== undefined) {
      eliminarMutation.mutate(selectedTipoActividad.id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Tipo de Actividad</h2>

          <ReuInput
            label="Nombre"
            placeholder="Ingrese el nombre"
            type="text"
            value={tipoActividad.nombre}
            onChange={(e) => setTipoActividad({ ...tipoActividad, nombre: e.target.value })}
          />

          <ReuInput
            label="Descripción"
            placeholder="Ingrese la descripción"
            type="text"
            value={tipoActividad.descripcion}
            onChange={(e) => setTipoActividad({ ...tipoActividad, descripcion: e.target.value })}
          />

          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4 hover:bg-green-700"
            type="submit"
            disabled={mutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate(tipoActividad);
            }}
          >
            {mutation.isPending ? "Registrando..." : "Guardar"}
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Tipos de Actividad</h2>
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
                {(tipoActividades ?? []).map((tipoActividad) => (
                  <TableRow key={tipoActividad.id}>
                    <TableCell>{tipoActividad.nombre}</TableCell>
                    <TableCell>{tipoActividad.descripcion}</TableCell>
                    <TableCell>
                      <button
                        className="text-green-500 hover:underline mr-2"
                        onClick={() => handleEdit(tipoActividad)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(tipoActividad)}
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

      <ReuModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Editar Tipo de Actividad"
        onConfirm={() => {
          if (selectedTipoActividad && selectedTipoActividad.id !== undefined) {
            actualizarMutation.mutate({
              id: selectedTipoActividad.id,
              tipoActividad,
            });
            setIsEditModalOpen(false);
          }
        }}
      >
        <ReuInput
          label="Nombre"
          placeholder="Ingrese el nombre"
          type="text"
          value={tipoActividad.nombre}
          onChange={(e) => setTipoActividad({ ...tipoActividad, nombre: e.target.value })}
        />

        <ReuInput
          label="Descripción"
          placeholder="Ingrese la descripción"
          type="text"
          value={tipoActividad.descripcion}
          onChange={(e) => setTipoActividad({ ...tipoActividad, descripcion: e.target.value })}
        />
      </ReuModal>

      <ReuModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="¿Estás seguro de eliminar este tipo de actividad?"
        onConfirm={handleConfirmDelete}
      >
        <p>Esta acción es irreversible.</p>
      </ReuModal>
    </DefaultLayout>
  );
};

export default TipoActividadPage;