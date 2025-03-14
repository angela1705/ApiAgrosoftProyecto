import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useRegistrarEspecie, useEspecies, useActualizarEspecie, useEliminarEspecie } from "@/hooks/cultivo/useEspecie";
import { useTipoEspecies } from "@/hooks/cultivo/usetipoespecie";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import ReuModal from "@/components/globales/ReuModal";

const EspeciePage: React.FC = () => {
  const [especie, setEspecie] = useState({
    nombre: "",
    descripcion: "",
    largoCrecimiento: 0,
    fk_tipo_especie: 0,
    img: "",
  });

  const [selectedEspecie, setSelectedEspecie] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const mutation = useRegistrarEspecie();
  const actualizarMutation = useActualizarEspecie();
  const eliminarMutation = useEliminarEspecie();
  const { data: especies, isLoading } = useEspecies();
  const { data: tiposEspecie } = useTipoEspecies();

  const columns = [
    { name: "Nombre", uid: "nombre" },
    { name: "Descripción", uid: "descripcion" },
    { name: "Largo Crecimiento", uid: "largoCrecimiento" },
    { name: "Tipo de Especie", uid: "fk_tipo_especie" },
    { name: "Imagen", uid: "img" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEspecie((prev) => ({
      ...prev,
      [name]: name === "nombre" || name === "descripcion" || name === "img" ? value : Number(value),
    }));
  };

  const handleEdit = (especie: any) => {
    setSelectedEspecie(especie);
    setEspecie(especie);
    setIsEditModalOpen(true);
  };

  const handleDelete = (especie: any) => {
    setSelectedEspecie(especie);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEspecie && selectedEspecie.id !== undefined) {
      eliminarMutation.mutate(selectedEspecie.id);
      setIsDeleteModalOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", especie.nombre);
    formData.append("descripcion", especie.descripcion);
    formData.append("largoCrecimiento", especie.largoCrecimiento.toString());
    formData.append("fk_tipo_especie", especie.fk_tipo_especie.toString());
    formData.append("img", especie.img);

    mutation.mutate(formData);
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Especie</h2>

          <ReuInput
            label="Nombre"
            placeholder="Ingrese el nombre"
            type="text"
            value={especie.nombre}
            onChange={(e) => setEspecie({ ...especie, nombre: e.target.value })}
          />

          <ReuInput
            label="Descripción"
            placeholder="Ingrese la descripción"
            type="text"
            value={especie.descripcion}
            onChange={(e) => setEspecie({ ...especie, descripcion: e.target.value })}
          />

          <ReuInput
            label="Largo de Crecimiento"
            placeholder="Ingrese el tiempo en días"
            type="number"
            value={especie.largoCrecimiento}
            onChange={(e) => setEspecie({ ...especie, largoCrecimiento: Number(e.target.value) })}
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Tipo de Especie</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="fk_tipo_especie"
              value={especie.fk_tipo_especie}
              onChange={handleChange}
            >
              <option value="">Seleccione un tipo</option>
              {tiposEspecie?.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
              ))}
            </select>
          </div>

          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4 hover:bg-green-700"
            type="submit"
            disabled={mutation.isPending}
            onClick={handleSubmit}
          >
            {mutation.isPending ? "Registrando..." : "Guardar"}
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Especies</h2>
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
                {(especies ?? []).map((especie) => (
                  <TableRow key={especie.id}>
                    <TableCell>{especie.nombre}</TableCell>
                    <TableCell>{especie.descripcion}</TableCell>
                    <TableCell>{especie.largoCrecimiento}</TableCell>
                    <TableCell>{especie.fk_tipo_especie}</TableCell>
                    <TableCell>{especie.img ? <img src={especie.img} alt={especie.nombre} className="w-16 h-16" /> : "Sin imagen"}</TableCell>
                    <TableCell>
                      <button
                        className="text-green-500 hover:underline mr-2"
                        onClick={() => handleEdit(especie)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(especie)}
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
        title="Editar Especie"
        onConfirm={() => {
          if (selectedEspecie && selectedEspecie.id !== undefined) {
            actualizarMutation.mutate({
              id: selectedEspecie.id,
              especie,
            });
            setIsEditModalOpen(false);
          }
        }}
      >
        <ReuInput
          label="Nombre"
          placeholder="Ingrese el nombre"
          type="text"
          value={especie.nombre}
          onChange={(e) => setEspecie({ ...especie, nombre: e.target.value })}
        />

        <ReuInput
          label="Descripción"
          placeholder="Ingrese la descripción"
          type="text"
          value={especie.descripcion}
          onChange={(e) => setEspecie({ ...especie, descripcion: e.target.value })}
        />

        <ReuInput
          label="Largo de Crecimiento"
          placeholder="Ingrese el tiempo en días"
          type="number"
          value={especie.largoCrecimiento}
          onChange={(e) => setEspecie({ ...especie, largoCrecimiento: Number(e.target.value) })}
        />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Tipo de Especie</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="fk_tipo_especie"
            value={especie.fk_tipo_especie}
            onChange={handleChange}
          >
            <option value="">Seleccione un tipo</option>
            {tiposEspecie?.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
            ))}
          </select>
        </div>
      </ReuModal>

      <ReuModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        title="¿Estás seguro de eliminar esta especie?"
        onConfirm={handleConfirmDelete}
      >
        <p>Esta acción es irreversible.</p>
      </ReuModal>
    </DefaultLayout>
  );
};

export default EspeciePage;