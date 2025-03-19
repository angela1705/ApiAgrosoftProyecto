import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useActividades, useInsumos, useUsuarios, useActualizarActividad, useEliminarActividad } from "@/hooks/cultivo/useActividad";
import { useTipoActividad } from "@/hooks/cultivo/usetipoactividad";
import { useProgramaciones } from "@/hooks/cultivo/useProgramacion";
import { useCultivos } from "@/hooks/cultivo/useCultivo";
import ReuModal from "@/components/globales/ReuModal";
import Tabla from "@/components/globales/Tabla";
import { useNavigate } from "react-router-dom";
import ActividadNotifications from "@/components/cultivo/ActividadNotifications";
import { useAuth } from "@/context/AuthContext";


const ListaActividadPage: React.FC = () => {
    const { user } = useAuth();
    
  const [actividad, setActividad] = useState({
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    tipo_actividad: 0,
    programacion: 0,
    usuario: 0,
    cultivo: 0,
    insumo: 0,
    cantidadUsada: 0,
  });

  const [selectedActividad, setSelectedActividad] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const actualizarMutation = useActualizarActividad();
  const eliminarMutation = useEliminarActividad();
  const { data: actividades, isLoading, refetch } = useActividades();
  const { data: tiposActividad } = useTipoActividad();
  const { data: programaciones } = useProgramaciones();
  const { data: usuarios } = useUsuarios();
  const { data: cultivos } = useCultivos();
  const { data: insumos } = useInsumos();
  const navigate = useNavigate();

  const columns = [
    { name: "Descripción", uid: "descripcion" },
    { name: "Fecha Inicio", uid: "fecha_inicio" },
    { name: "Fecha Fin", uid: "fecha_fin" },
    { name: "Tipo Actividad", uid: "tipo_actividad" },
    { name: "Programación", uid: "programacion" },
    { name: "Usuario", uid: "usuario" },
    { name: "Cultivo", uid: "cultivo" },
    { name: "Insumo", uid: "insumo" },
    { name: "Cantidad Usada", uid: "cantidadUsada" },
    { name: "Acciones", uid: "acciones" },
  ];



  const handleEdit = (actividad: any) => {
    setSelectedActividad(actividad);
    setActividad(actividad);
    setIsEditModalOpen(true);
  };

  const handleDelete = (actividad: any) => {
    setSelectedActividad(actividad);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedActividad && selectedActividad.id !== undefined) {
      eliminarMutation.mutate(selectedActividad.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          refetch();
        },
      });
    }
  };

  const transformedData = (actividades ?? []).map((actividad) => ({
    id: actividad.id?.toString() || '',
    descripcion: actividad.descripcion,
    fecha_inicio: actividad.fecha_inicio,
    fecha_fin: actividad.fecha_fin,
    tipo_actividad: tiposActividad?.find((tipo) => tipo.id === actividad.tipo_actividad)?.nombre || 'Sin tipo',
    programacion: programaciones?.find((prog) => prog.id === actividad.programacion)?.nombre || 'Sin programación',
    usuario: usuarios?.find((user) => user.id === actividad.usuario)?.nombre || 'Sin usuario',
    cultivo: cultivos?.find((cult) => cult.id === actividad.cultivo)?.nombre || 'Sin cultivo',
    insumo: insumos?.find((ins) => ins.id === actividad.insumo)?.nombre || 'Sin insumo',
    cantidadUsada: actividad.cantidadUsada,
    acciones: (
      <>
        <button
          className="text-green-500 hover:underline mr-2"
          onClick={() => handleEdit(actividad)}
        >
          Editar
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(actividad)}
        >
          Eliminar
        </button>
      </>
    ),
  }));

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Actividades</h2>
          {isLoading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
            <>
              <Tabla columns={columns} data={transformedData} />
              <div className="flex justify-end mt-4">
                <button
                  className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg 
                             hover:bg-blue-700 transition-all duration-300 ease-in-out 
                             shadow-md hover:shadow-lg transform hover:scale-105"
                  onClick={() => navigate('/cultivo/actividad/')}
                >
                  Registrar Actividad
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <ReuModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        title="Editar Actividad"
        onConfirm={() => {
          if (selectedActividad && selectedActividad.id !== undefined) {
            actualizarMutation.mutate(
              { id: selectedActividad.id, actividad },
              {
                onSuccess: () => {
                  setIsEditModalOpen(false);
                  refetch();
                },
              }
            );
          }
        }}
      >
        <ReuInput
          label="Descripción"
          placeholder="Ingrese la descripción"
          type="text"
          value={actividad.descripcion}
          onChange={(e) => setActividad({ ...actividad, descripcion: e.target.value })}
        />
        <ReuInput
          label="Fecha de Inicio"
          type="date"
          value={actividad.fecha_inicio}
          onChange={(e) => setActividad({ ...actividad, fecha_inicio: e.target.value })}
        />
        <ReuInput
          label="Fecha de Fin"
          type="date"
          value={actividad.fecha_fin}
          onChange={(e) => setActividad({ ...actividad, fecha_fin: e.target.value })}
        />
        <label className="block text-sm font-medium text-gray-700 mt-4">Tipo de Actividad</label>
        <select
          name="tipo_actividad"
          value={actividad.tipo_actividad || 0}
          onChange={(e) => setActividad({ ...actividad, tipo_actividad: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione un tipo de actividad</option>
          {tiposActividad?.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
          ))}
        </select>
        <label className="block text-sm font-medium text-gray-700 mt-4">Programación</label>
        <select
          name="programacion"
          value={actividad.programacion || 0}
          onChange={(e) => setActividad({ ...actividad, programacion: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione una programación</option>
          {programaciones?.map((prog) => (
            <option key={prog.id} value={prog.id}>{prog.nombre}</option>
          ))}
        </select>
        <label className="block text-sm font-medium text-gray-700 mt-4">Usuario</label>
        <select
          name="usuario"
          value={actividad.usuario || 0}
          onChange={(e) => setActividad({ ...actividad, usuario: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione un usuario</option>
          {usuarios?.map((user) => (
            <option key={user.id} value={user.id}>{user.nombre}</option>
          ))}
        </select>
        <label className="block text-sm font-medium text-gray-700 mt-4">Cultivo</label>
        <select
          name="cultivo"
          value={actividad.cultivo || 0}
          onChange={(e) => setActividad({ ...actividad, cultivo: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione un cultivo</option>
          {cultivos?.map((cult) => (
            <option key={cult.id} value={cult.id}>{cult.nombre}</option>
          ))}
        </select>
        <label className="block text-sm font-medium text-gray-700 mt-4">Insumo</label>
        <select
          name="insumo"
          value={actividad.insumo || 0}
          onChange={(e) => setActividad({ ...actividad, insumo: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Seleccione un insumo</option>
          {insumos?.map((ins) => (
            <option key={ins.id} value={ins.id}>{ins.nombre}</option>
          ))}
        </select>
        <ReuInput
          label="Cantidad Usada"
          type="number"
          value={actividad.cantidadUsada}
          onChange={(e) => setActividad({ ...actividad, cantidadUsada: Number(e.target.value) })}
        />
      </ReuModal>

      <ReuModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="¿Estás seguro de eliminar esta actividad?"
        onConfirm={handleConfirmDelete}
      >
        <p>Esta acción es irreversible.</p>
      </ReuModal>

      {user && <ActividadNotifications userId={user.id} />}
    </DefaultLayout>
  );
};

export default ListaActividadPage;