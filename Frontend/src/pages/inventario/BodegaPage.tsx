import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { useRegistrarBodega, useBodegas, useActualizarBodega, useEliminarBodega } from "@/hooks/inventario/useBodega";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

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
  const [bodega, setBodega] = useState({
    id: 0,
    nombre: "",
    ubicacion: "",
    capacidad: 0,
    direccion: "",
    telefono: "",
    activo: true,
  });

  const mutation = useRegistrarBodega();
  const { data: bodegas, isLoading, refetch } = useBodegas();
  const updateMutation = useActualizarBodega();
  const deleteMutation = useEliminarBodega();

  const columns = [
    { name: "Nombre", uid: "nombre" },
    { name: "Ubicación", uid: "ubicacion" },
    { name: "Capacidad", uid: "capacidad" },
    { name: "Dirección", uid: "direccion" },
    { name: "Teléfono", uid: "telefono" },
    { name: "Activo", uid: "activo" },
    { name: "Acciones", uid: "acciones" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setBodega((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setBodega((prev) => ({
        ...prev,
        [name]: name === "capacidad" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bodega.id === 0) {
      mutation.mutate(bodega, {
        onSuccess: () => {
          refetch();
          setBodega({
            id: 0,
            nombre: "",
            ubicacion: "",
            capacidad: 0,
            direccion: "",
            telefono: "",
            activo: true,
          });
        },
      });
    } else {
      updateMutation.mutate(bodega, {
        onSuccess: () => {
          refetch();
          setBodega({
            id: 0,
            nombre: "",
            ubicacion: "",
            capacidad: 0,
            direccion: "",
            telefono: "",
            activo: true,
          });
        },
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const handleUpdate = (bodega: any) => {
    setBodega(bodega);
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Bodega</h2>
          <form onSubmit={handleSubmit}>
            <ReusableInput
              label="Nombre"
              placeholder="Ingrese el nombre"
              type="text"
              name="nombre"
              value={bodega.nombre}
              onChange={handleChange}
            />
            <ReusableInput
              label="Ubicación"
              placeholder="Ingrese la ubicación"
              type="text"
              name="ubicacion"
              value={bodega.ubicacion}
              onChange={handleChange}
            />
            <ReusableInput
              label="Capacidad"
              type="number"
              name="capacidad"
              value={String(bodega.capacidad)}
              onChange={handleChange}
            />
            <ReusableInput
              label="Dirección"
              placeholder="Ingrese la dirección"
              type="text"
              name="direccion"
              value={bodega.direccion}
              onChange={handleChange}
            />
            <ReusableInput
              label="Teléfono"
              placeholder="Ingrese el teléfono"
              type="text"
              name="telefono"
              value={bodega.telefono}
              onChange={handleChange}
            />
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="activo"
                checked={bodega.activo}
                onChange={handleChange}
                className="mr-2 leading-tight"
              />
              <label className="text-gray-700 text-sm font-bold">Activo</label>
            </div>
            <button
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4"
              type="submit"
              disabled={mutation.isPending || updateMutation.isPending}
            >
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
                {columns.map((col) => (
                  <TableColumn key={col.uid}>{col.name}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {(bodegas ?? []).map((bodega) => (
                  <TableRow key={bodega.id}>
                    <TableCell>{bodega.nombre}</TableCell>
                    <TableCell>{bodega.ubicacion}</TableCell>
                    <TableCell>{bodega.capacidad}</TableCell>
                    <TableCell>{bodega.direccion}</TableCell>
                    <TableCell>{bodega.telefono}</TableCell>
                    <TableCell>{bodega.activo ? "Sí" : "No"}</TableCell>
                    <TableCell>
                      <button
                        className="text-yellow-600 hover:bg-yellow-200 px-3 py-1 rounded"
                        onClick={() => handleUpdate(bodega)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 hover:bg-red-200 px-3 py-1 rounded ml-2"
                        onClick={() => handleDelete(bodega.id)}
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
    </DefaultLayout>
  );
};

export default BodegaPage;
