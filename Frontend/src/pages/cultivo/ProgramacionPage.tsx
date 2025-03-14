import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "../../components/globales/ReuInput";
import { Programacion } from "../../types/cultivo/Programacion";
import { useRegistrarProgramacion, useProgramaciones, useActualizarProgramacion, useEliminarProgramacion  } from "../../hooks/cultivo/useProgramacion";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import ReuModal from "../../components/globales/ReuModal";

const ProgramacionPage: React.FC = () => {
  const [programacion, setProgramacion] = useState<Programacion>({
    ubicacion: "",
    hora_prog: "",
    fecha_prog: "",
    estado: false,
  });

  const [selectedProgramacion, setSelectedProgramacion] = useState<Programacion | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const mutation = useRegistrarProgramacion();
  const { data: programaciones, isLoading } = useProgramaciones();
  const actualizarMutation = useActualizarProgramacion();
  const eliminarMutation = useEliminarProgramacion();

  const handleEdit = (prog: Programacion) => {
    setSelectedProgramacion(prog);
    setProgramacion(prog);
    setIsEditModalOpen(true);
  };

  const handleDelete = (prog: Programacion) => {
    setSelectedProgramacion(prog);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProgramacion && selectedProgramacion.id !== undefined) {
      eliminarMutation.mutate(selectedProgramacion.id as number);
      setIsDeleteModalOpen(false);
    }
  };

  const handleConfirmEdit = () => {
    if (selectedProgramacion && selectedProgramacion.id !== undefined) {
      actualizarMutation.mutate({ id: selectedProgramacion.id as number, programacion });
      setIsEditModalOpen(false);
    }
  };

  const columns = [
    { name: "Ubicación", uid: "ubicacion" },
    { name: "Hora Programada", uid: "hora_prog" },
    { name: "Fecha Programada", uid: "fecha_prog" },
    { name: "Estado", uid: "estado" },
    { name: "Acciones", uid: "acciones" },
  ];

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Programación</h2>

          <ReuInput
            label="Ubicación"
            placeholder="Ingrese la ubicación"
            type="text"
            value={programacion.ubicacion}
            onChange={(e) => setProgramacion({ ...programacion, ubicacion: e.target.value })}
          />

          <ReuInput
            label="Hora Programada"
            placeholder="Ingrese la hora programada"
            type="datetime-local"
            value={programacion.hora_prog}
            onChange={(e) => setProgramacion({ ...programacion, hora_prog: e.target.value })}
          />

          <ReuInput
            label="Fecha Programada"
            placeholder="Ingrese la fecha programada"
            type="date"
            value={programacion.fecha_prog}
            onChange={(e) => setProgramacion({ ...programacion, fecha_prog: e.target.value })}
          />

          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4 hover:bg-green-700"
            type="submit"
            disabled={mutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate(programacion);
            }}
          >
            {mutation.isPending ? "Registrando..." : "Guardar"}
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Programaciones</h2>
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
                {(programaciones ?? []).map((prog) => (
                  <TableRow key={prog.id}>
                    <TableCell>{prog.ubicacion}</TableCell>
                    <TableCell>{prog.hora_prog}</TableCell>
                    <TableCell>{prog.fecha_prog}</TableCell>
                    <TableCell>{prog.estado ? "Activo" : "Inactivo"}</TableCell>
                    <TableCell>
                      <button className="text-green-500 hover:underline mr-2" onClick={() => handleEdit(prog)}>
                        Editar
                      </button>
                      <button className="text-red-500 hover:underline" onClick={() => handleDelete(prog)}>
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

      <ReuModal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen} title="Editar Programación" onConfirm={handleConfirmEdit}>
        <ReuInput label="Ubicación" placeholder="Ingrese la ubicación" type="text" value={programacion.ubicacion} onChange={(e) => setProgramacion({ ...programacion, ubicacion: e.target.value })} />
        <ReuInput label="Hora Programada" placeholder="Ingrese la hora programada" type="datetime-local" value={programacion.hora_prog} onChange={(e) => setProgramacion({ ...programacion, hora_prog: e.target.value })}/>     
        <ReuInput label="Fecha Programada" placeholder="Ingrese la fecha programada" type="date" value={programacion.fecha_prog} onChange={(e) => setProgramacion({ ...programacion, fecha_prog: e.target.value })}/>
      </ReuModal>

      <ReuModal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} title="¿Estás seguro de eliminar esta programación?" onConfirm={handleConfirmDelete}>
        <p>Esta acción es irreversible.</p>
      </ReuModal>
    </DefaultLayout>
  );
};

export default ProgramacionPage;
