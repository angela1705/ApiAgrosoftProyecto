import { useState, useMemo } from "react";
import DefaultLayout from "@/layouts/default";
import { useNavigate } from "react-router-dom";
import { ReuInput } from "@/components/globales/ReuInput";
import Tabla from "@/components/globales/Tabla";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/react";
import api from "@/components/utils/axios";
import CustomSpinner from "@/components/globales/Spinner";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface Bancal {
  id: number;
  nombre: string;
  posX: number | null;
  posY: number | null;
}

interface EvapotranspiracionData {
  id: number;
  fk_bancal: number;
  fecha: string;
  valor: number;
  creado: string;
}

const fetchBancales = async (): Promise<Bancal[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  const response = await api.get("http://127.0.0.1:8000/cultivo/Bancal/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const fetchEvapotranspiracion = async (): Promise<EvapotranspiracionData[]> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  const response = await api.get("http://127.0.0.1:8000/iot/evapotranspiracion/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const calcularEvapotranspiracion = async (data: {
  fk_bancal_id: number;
  fecha: string;
  latitud: number;
  altitud: number;
}) => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No se encontró el token de autenticación.");
  const response = await api.post(
    "http://127.0.0.1:8000/iot/evapotranspiracion/calcular/",
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export default function EvapotranspiracionPage() {
  const [formData, setFormData] = useState({
    fk_bancal_id: "",
    fecha: "",
    latitud: "",
    altitud: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Consulta para obtener bancales
  const {
    data: bancales = [],
    isPending: isPendingBancales,
    error: errorBancales,
  } = useQuery<Bancal[], Error>({
    queryKey: ["bancales"],
    queryFn: fetchBancales,
  });

  // Consulta para obtener datos de evapotranspiración registrados
  const {
    data: evapotranspiracionData = [],
    isPending: isPendingEvapotranspiracion,
    error: errorEvapotranspiracion,
  } = useQuery<EvapotranspiracionData[], Error>({
    queryKey: ["evapotranspiracion"],
    queryFn: fetchEvapotranspiracion,
  });

  // Mutación para calcular evapotranspiración
  const mutation = useMutation({
    mutationFn: calcularEvapotranspiracion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["evapotranspiracion"] });
      addToast({
        title: "Éxito",
        description: "Evapotranspiración calculada con éxito",
        color: "success",
      });
    },
    onError: (err: any) => {
      if (err.response?.status === 401) {
        addToast({
          title: "Sesión expirada",
          description: "Por favor, inicia sesión nuevamente.",
          color: "warning",
        });
        navigate("/login");
      } else {
        const errorMessage = err.response?.data?.error || "Error al calcular la evapotranspiración";
        addToast({
          title: "Error",
          description: errorMessage,
          color: "danger",
        });
      }
    },
  });

  // Manejar cambio de bancal (autocompletar latitud/altitud)
  const handleBancalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bancalId = e.target.value;
    const selectedBancal = bancales.find((bancal) => bancal.id === Number(bancalId));
    setFormData((prev) => ({
      ...prev,
      fk_bancal_id: bancalId,
      latitud: selectedBancal?.posY
        ? selectedBancal.posY.toString()
        : prev.latitud || "0",
      altitud: selectedBancal?.posX
        ? selectedBancal.posX.toString()
        : prev.altitud || "0",
    }));
  };

  // Manejar cambios en inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(`Input ${name} cambió a: ${value}`);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Enviar formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    if (!formData.fk_bancal_id || !formData.fecha) {
      addToast({
        title: "Error",
        description: "Seleccione un bancal y una fecha",
        color: "danger",
      });
      return;
    }
    mutation.mutate({
      fk_bancal_id: Number(formData.fk_bancal_id),
      fecha: formData.fecha,
      latitud: Number(formData.latitud) || 0,
      altitud: Number(formData.altitud) || 0,
    });
  };

  // Alternar visibilidad del formulario
  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  // Columnas para la tabla
  const columns = [
    { name: "ID", uid: "id" },
    { name: "Bancal", uid: "fk_bancal" },
    { name: "Fecha", uid: "fecha" },
    { name: "Valor (mm/día)", uid: "valor" },
    { name: "Creado", uid: "creado" },
  ];

  // Datos formateados para la tabla
  const tableData = useMemo(() => {
    return evapotranspiracionData.map((dato: EvapotranspiracionData, index) => ({
      id: `${dato.id}-${index}`,
      fk_bancal:
        bancales.find((b) => b.id === dato.fk_bancal)?.nombre || dato.fk_bancal,
      fecha: dato.fecha,
      valor: dato.valor,
      creado: new Date(dato.creado).toLocaleString(),
    }));
  }, [evapotranspiracionData, bancales]);

  if (isPendingBancales || isPendingEvapotranspiracion) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <CustomSpinner
            label="Cargando datos..."
            color="primary"
            variant="wave"
            className="text-blue-500"
          />
        </div>
      </DefaultLayout>
    );
  }

  if (errorBancales || errorEvapotranspiracion) {
    return (
      <DefaultLayout>
        <div className="text-center py-12 text-red-500">
          <p className="text-xl font-semibold">Error al cargar los datos</p>
          <p>{(errorBancales || errorEvapotranspiracion)?.message}</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Evapotranspiración
        </h1>

        <div className="mb-6 flex justify-start">
          <motion.button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            onClick={toggleForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isFormOpen ? (
              <>
                <Minus className="mr-2" size={16} />
                Ocultar Registro
              </>
            ) : (
              <>
                <Plus className="mr-2" size={16} />
                Nuevo Cálculo
              </>
            )}
          </motion.button>
        </div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Datos de Evapotranspiración Registrados
          </h3>
          {tableData.length > 0 ? (
            <Tabla columns={columns} data={tableData} />
          ) : (
            <p className="text-gray-600 text-center">
              No hay datos de evapotranspiración registrados.
            </p>
          )}
        </motion.div>

        {isFormOpen && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Calcular Evapotranspiración
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Bancal</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="fk_bancal_id"
                  value={formData.fk_bancal_id}
                  onChange={handleBancalChange}
                  required
                >
                  <option value="">Seleccione un bancal</option>
                  {bancales.map((bancal) => (
                    <option key={bancal.id} value={bancal.id}>
                      {bancal.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <ReuInput
                label="Fecha"
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                min="2000-01-01"
                max="2025-05-15"
              />
              <ReuInput
                label="Latitud"
                type="number"
                step="0.01"
                name="latitud"
                value={formData.latitud}
                onChange={handleChange}
                placeholder="Ej: 4.61"
              />
              <ReuInput
                label="Altitud (metros)"
                type="number"
                name="altitud"
                value={formData.altitud}
                onChange={handleChange}
                placeholder="Ej: 2600"
              />
              <motion.button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                disabled={mutation.isPending}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mutation.isPending ? "Calculando..." : "Calcular"}
              </motion.button>
            </form>
          </motion.div>
        )}
      </div>
    </DefaultLayout>
  );
}