import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useRegistrarBancal, useBancales, useActualizarBancal, useEliminarBancal } from "@/hooks/cultivo/usebancal";
import { useLotes } from "@/hooks/cultivo/uselotes";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import ReuModal from "@/components/globales/ReuModal";

const BancalPage: React.FC = () => {
  const [bancal, setBancal] = useState({
    nombre: "",
    TamX: 0,
    TamY: 0,
    posX: 0,
    posY: 0,
    fk_lote: 0,
  });

  const [selectedBancal, setSelectedBancal] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const mutation = useRegistrarBancal();
  const actualizarMutation = useActualizarBancal();
  const eliminarMutation = useEliminarBancal();
  const { data: bancales, isLoading } = useBancales();
  const { data: lotes } = useLotes();

  const columns = [
    { name: "Nombre", uid: "nombre" },
    { name: "Tamaño X", uid: "TamX" },
    { name: "Tamaño Y", uid: "TamY" },
    { name: "Posición X", uid: "posX" },
    { name: "Posición Y", uid: "posY" },
    { name: "Lote", uid: "fk_lote" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBancal((prev) => ({
      ...prev,
      [name]: name === "nombre" ? value : Number(value),
    }));
  };

  const handleEdit = (bancal: any) => {
    setSelectedBancal(bancal);
    setBancal(bancal); 
    setIsEditModalOpen(true);
  };

  const handleDelete = (bancal: any) => {
    setSelectedBancal(bancal);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBancal && selectedBancal.id !== undefined) {
      eliminarMutation.mutate(selectedBancal.id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Bancal</h2>

          <ReuInput
            label="Nombre"
            placeholder="Ingrese el nombre"
            type="text"
            value={bancal.nombre}
            onChange={(e) => setBancal({ ...bancal, nombre: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <ReuInput
              label="Tamaño X"
              placeholder="Ingrese tamaño X"
              type="number"
              value={bancal.TamX.toString()}
              onChange={(e) => setBancal({ ...bancal, TamX: parseFloat(e.target.value) })}
            />

            <ReuInput
              label="Tamaño Y"
              placeholder="Ingrese tamaño Y"
              type="number"
              value={bancal.TamY.toString()}
              onChange={(e) => setBancal({ ...bancal, TamY: parseFloat(e.target.value) })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ReuInput
              label="Posición X"
              placeholder="Ingrese posición X"
              type="number"
              value={bancal.posX.toString()}
              onChange={(e) => setBancal({ ...bancal, posX: parseFloat(e.target.value) })}
            />

            <ReuInput
              label="Posición Y"
              placeholder="Ingrese posición Y"
              type="number"
              value={bancal.posY.toString()}
              onChange={(e) => setBancal({ ...bancal, posY: parseFloat(e.target.value) })}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Lote</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="fk_lote"
              value={bancal.fk_lote}
              onChange={handleChange}
            >
              <option value="">Seleccione un lote</option>
              {lotes?.map((lote) => (
                <option key={lote.id} value={lote.id}>{lote.nombre}</option>
              ))}
            </select>
          </div>

          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4 hover:bg-green-700"
            type="submit"
            disabled={mutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate(bancal);
            }}
          >
            {mutation.isPending ? "Registrando..." : "Guardar"}
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Bancales</h2>
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
                {(bancales ?? []).map((bancal) => (
                  <TableRow key={bancal.id}>
                    <TableCell>{bancal.nombre}</TableCell>
                    <TableCell>{bancal.TamX}</TableCell>
                    <TableCell>{bancal.TamY}</TableCell>
                    <TableCell>{bancal.posX}</TableCell>
                    <TableCell>{bancal.posY}</TableCell>
                    <TableCell>{bancal.fk_lote}</TableCell>
                    <TableCell>
                      <button
                        className="text-green-500 hover:underline mr-2"
                        onClick={() => handleEdit(bancal)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(bancal)}
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
        title="Editar Bancal"
        onConfirm={() => {
          if (selectedBancal && selectedBancal.id !== undefined) {
            actualizarMutation.mutate({
              id: selectedBancal.id,
              bancal,
            });
            setIsEditModalOpen(false);
          }
        }}
      >
        <ReuInput
          label="Nombre"
          placeholder="Ingrese el nombre"
          type="text"
          value={bancal.nombre}
          onChange={(e) => setBancal({ ...bancal, nombre: e.target.value })}
        />

        <div className="grid grid-cols-2 gap-4">
          <ReuInput
            label="Tamaño X"
            placeholder="Ingrese tamaño X"
            type="number"
            value={bancal.TamX.toString()}
            onChange={(e) => setBancal({ ...bancal, TamX: parseFloat(e.target.value) })}
          />

          <ReuInput
            label="Tamaño Y"
            placeholder="Ingrese tamaño Y"
            type="number"
            value={bancal.TamY.toString()}
            onChange={(e) => setBancal({ ...bancal, TamY: parseFloat(e.target.value) })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ReuInput
            label="Posición X"
            placeholder="Ingrese posición X"
            type="number"
            value={bancal.posX.toString()}
            onChange={(e) => setBancal({ ...bancal, posX: parseFloat(e.target.value) })}
          />

          <ReuInput
            label="Posición Y"
            placeholder="Ingrese posición Y"
            type="number"
            value={bancal.posY.toString()}
            onChange={(e) => setBancal({ ...bancal, posY: parseFloat(e.target.value) })}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Lote</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="fk_lote"
            value={bancal.fk_lote}
            onChange={handleChange}
          >
            <option value="">Seleccione un lote</option>
            {lotes?.map((lote) => (
              <option key={lote.id} value={lote.id}>{lote.nombre}</option>
            ))}
          </select>
        </div>
      </ReuModal>

      <ReuModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="¿Estás seguro de eliminar este bancal?"
        onConfirm={handleConfirmDelete}
      >
        <p>Esta acción es irreversible.</p>
      </ReuModal>
    </DefaultLayout>
  );
};

export default BancalPage;