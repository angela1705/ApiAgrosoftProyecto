import React, { useState, ChangeEvent } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "../components/ReuInput";
import { TipoEspecie } from "../types/cultivo/TipoEspecie";
import { useRegistrarTipoEspecie, useTipoEspecies } from "../hooks/cultivo/usetipoespecie";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";

const TipoEspeciePage: React.FC = () => {
  const [tipoEspecie, setTipoEspecie] = useState<TipoEspecie>({
    nombre: "",
    descripcion: "",
    img: null,
  });

  const mutation = useRegistrarTipoEspecie();
  const { data: especies, isLoading } = useTipoEspecies();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTipoEspecie((prev) => ({ ...prev, img: e.target.files![0] }));
    }
  };

  const columns = [
    { name: "Nombre", uid: "nombre" },
    { name: "Descripción", uid: "descripcion" },
    { name: "Imagen", uid: "imagen" },
    { name: "Acciones", uid: "acciones" },
  ];

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Tipo de Especie</h2>

          <ReuInput
            label="Nombre"
            placeholder="Ingrese el nombre"
            type="text"
            value={tipoEspecie.nombre}
            onChange={(e) => setTipoEspecie({ ...tipoEspecie, nombre: e.target.value })}
          />

          <ReuInput
            label="Descripción"
            placeholder="Ingrese la descripción"
            type="text"
            value={tipoEspecie.descripcion}
            onChange={(e) => setTipoEspecie({ ...tipoEspecie, descripcion: e.target.value })}
          />

          <div className="mb-6">
            <input
              type="file"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="imagen"
              onChange={handleFileChange}
              accept="image/*"
            />
            <label htmlFor="imagen" className="block mt-2 text-sm font-medium text-gray-700">
              Imagen
            </label>
          </div>

          <button
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            type="submit"
            disabled={mutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              mutation.mutate(tipoEspecie);
            }}
          >
            {mutation.isPending ? "Registrando..." : "Guardar"}
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lista de Tipos de Especies</h2>
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
                    <TableCell>
                        {especie.img ? (
                          <img
                            src={typeof especie.img === "string" ? especie.img : URL.createObjectURL(especie.img)}
                            alt={especie.nombre}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          "Sin imagen"
                        )}
                      </TableCell>
                    <TableCell>
                      <button className="text-green-500 hover:underline mr-2">Editar</button>
                      <button className="text-red-500 hover:underline">Eliminar</button>
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

export default TipoEspeciePage;
