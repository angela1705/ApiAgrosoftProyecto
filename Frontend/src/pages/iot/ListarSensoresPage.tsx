import React from "react";
import DefaultLayout from "@/layouts/default";
import { useSensores } from "@/hooks/iot/useSensore";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";

const ListarSensoresPage: React.FC = () => {
  const navigate = useNavigate();
  const { sensores, isLoading, error } = useSensores();

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6 bg-white">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Lista de Sensores</h2>

          <div className="mb-4 flex justify-end gap-4">
            <Button
              color="primary"
              onClick={() => navigate("/iot/registrar-sensor")}
            >
              Registrar Sensor
            </Button>
            <Button
              onClick={() => navigate("/iot/sensores")}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Sensores
            </Button>
          </div>

          {isLoading ? (
            <p className="text-gray-600 text-center">Cargando sensores...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Error al cargar sensores: {error.message}</p>
          ) : sensores.length === 0 ? (
            <p className="text-gray-600 text-center">No hay sensores registrados.</p>
          ) : (
            <Table aria-label="Lista de sensores">
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Tipo</TableColumn>
                <TableColumn>Unidad</TableColumn>
              </TableHeader>
              <TableBody>
                {sensores.map((sensor) => (
                  <TableRow key={sensor.id}>
                    <TableCell>{sensor.id}</TableCell>
                    <TableCell>{sensor.nombre}</TableCell>
                    <TableCell>{sensor.tipo_sensor}</TableCell>
                    <TableCell>{sensor.unidad_medida}</TableCell>
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

export default ListarSensoresPage;