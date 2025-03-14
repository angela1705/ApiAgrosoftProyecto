import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { useRegistrarHerramienta, useHerramientas, useActualizarHerramienta, useEliminarHerramienta } from "@/hooks/inventario/useHerramientas";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import ReuModal from "@/components/globales/ReuModal";

const ReusableInput: React.FC<{ label: string; type: string; name: string; value: string; placeholder?: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void; }> = ({ label, type, name, value, placeholder, onChange }) => (
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

const HerramientaPage: React.FC = () => {
  const [herramienta, setHerramienta] = useState({
    id: 0,
    nombre: "",
    descripcion: "",
    cantidad: 0,
    estado: "Disponible",
    activo: true,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const mutation = useRegistrarHerramienta();
  const { data: herramientas, isLoading, refetch } = useHerramientas();
  const updateMutation = useActualizarHerramienta();
  const deleteMutation = useEliminarHerramienta();

  const handleUpdate = (herramienta: any) => {
    setHerramienta(herramienta);
    setModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setHerramienta((prev) => ({ ...prev, [name]: checked }));
    } else {
      setHerramienta((prev) => ({ ...prev, [name]: name === "cantidad" ? Number(value) : value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (herramienta.id === 0) {
      mutation.mutate(herramienta, {
        onSuccess: () => {
          refetch();
          setHerramienta({ id: 0, nombre: "", descripcion: "", cantidad: 0, estado: "Disponible", activo: true });
        },
      });
    } else {
      updateMutation.mutate(herramienta, {
        onSuccess: () => {
          refetch();
          setHerramienta({ id: 0, nombre: "", descripcion: "", cantidad: 0, estado: "Disponible", activo: true });
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

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Herramienta</h2>
          <form onSubmit={handleSubmit}>
            <ReusableInput label="Nombre" placeholder="Ingrese el nombre" type="text" name="nombre" value={herramienta.nombre} onChange={handleChange} />
            <ReusableInput label="Descripción" placeholder="Ingrese la descripción" type="text" name="descripcion" value={herramienta.descripcion} onChange={handleChange} />
            <ReusableInput label="Cantidad" type="number" name="cantidad" value={String(herramienta.cantidad)} onChange={handleChange} />
            <ReusableInput label="Estado" type="text" name="estado" value={herramienta.estado} onChange={handleChange} />
            <div className="mb-4 flex items-center">
              <input type="checkbox" name="activo" checked={herramienta.activo} onChange={handleChange} className="mr-2 leading-tight" />
              <label className="text-gray-700 text-sm font-bold">Activo</label>
            </div>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4" type="submit" disabled={mutation.isPending || updateMutation.isPending}>
              {mutation.isPending || updateMutation.isPending ? "Guardando..." : herramienta.id === 0 ? "Guardar" : "Actualizar"}
            </button>
          </form>
        </div>

        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Herramientas</h2>
          {isLoading ? (
            <p className="text-gray-600">Cargando...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Descripción</TableColumn>
                <TableColumn>Cantidad</TableColumn>
                <TableColumn>Estado</TableColumn>
                <TableColumn>Activo</TableColumn>
                <TableColumn>Acciones</TableColumn>
              </TableHeader>
              <TableBody>
                {(herramientas ?? []).map((herramienta) => (
                  <TableRow key={herramienta.id}>
                    <TableCell>{herramienta.nombre}</TableCell>
                    <TableCell>{herramienta.descripcion}</TableCell>
                    <TableCell>{herramienta.cantidad}</TableCell>
                    <TableCell>{herramienta.estado}</TableCell>
                    <TableCell>{herramienta.activo ? "Sí" : "No"}</TableCell>
                    <TableCell>
                      <button className="text-yellow-600 hover:bg-yellow-200 px-3 py-1 rounded" onClick={() => handleUpdate(herramienta)}>Editar</button>
                      <button className="text-red-600 hover:bg-red-200 px-3 py-1 rounded ml-2" onClick={() => handleDelete(herramienta.id)}>Eliminar</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <ReuModal isOpen={modalOpen} onOpenChange={setModalOpen} title="Editar Herramienta">
        <div className="w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <ReusableInput label="Nombre" placeholder="Ingrese el nombre" type="text" name="nombre" value={herramienta.nombre} onChange={handleChange} />
            <ReusableInput label="Descripción" placeholder="Ingrese la descripción" type="text" name="descripcion" value={herramienta.descripcion} onChange={handleChange} />
            <ReusableInput label="Cantidad" type="number" name="cantidad" value={String(herramienta.cantidad)} onChange={handleChange} />
            <ReusableInput label="Estado" type="text" name="estado" value={herramienta.estado} onChange={handleChange} />
            <div className="mb-4 flex items-center">
              <input type="checkbox" name="activo" checked={herramienta.activo} onChange={handleChange} className="mr-2 leading-tight" />
              <label className="text-gray-700 text-sm font-bold">Activo</label>
            </div>
            <Button className="bg-green-600 text-white w-full" type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Actualizando..." : "Actualizar"}
            </Button>
          </form>
        </div>
      </ReuModal>
    </DefaultLayout>
  );
};

export default HerramientaPage;