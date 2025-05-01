import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { BodegaHerramienta } from "@/types/inventario/BodegaHerramienta";
import { useRegistrarBodegaHerramienta } from "@/hooks/inventario/useBodegaHerramienta";
import { useBodegas } from "@/hooks/inventario/useBodega";
import { useHerramientas } from "@/hooks/inventario/useHerramientas";
import Formulario from "@/components/globales/Formulario";
import BodegaHerramientaNotifications from "@/components/inventario/BodegaHerramientaNotifications";
import { useAuth } from "@/context/AuthContext";
import { ReuInput } from "@/components/globales/ReuInput";

const BodegaHerramientaPage: React.FC = () => {
  const { user } = useAuth();
  const [bodegaHerramienta, setBodegaHerramienta] = useState<Omit<BodegaHerramienta, "id" | "costo_total">>({
    bodega: 0,
    herramienta: 0,
    cantidad: 0,
    creador: user?.id,
    cantidad_prestada: 0,
  });

  const { data: bodegas } = useBodegas();
  const { data: herramientas } = useHerramientas();
  const mutation = useRegistrarBodegaHerramienta();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBodegaHerramienta((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bodegaHerramienta.bodega || !bodegaHerramienta.herramienta || !bodegaHerramienta.cantidad) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
    mutation.mutate(bodegaHerramienta, {
      onSuccess: () => {
        setBodegaHerramienta({ bodega: 0, herramienta: 0, cantidad: 0, creador: user?.id, cantidad_prestada: 0 });
        navigate("/inventario/listarbodegaherramienta/");
      },
    });
  };

  return (
    <DefaultLayout>
      <Formulario
        title="Registro de Bodega Herramienta"
        onSubmit={handleSubmit}
        buttonText="Guardar"
        isSubmitting={mutation.isPending}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Bodega</label>
          <select
            name="bodega"
            value={bodegaHerramienta.bodega}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-200"
          >
            <option value="0">Seleccione una Bodega</option>
            {bodegas?.map((bodega: { id: number; nombre: string }) => (
              <option key={bodega.id} value={bodega.id}>
                {bodega.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Herramienta</label>
          <select
            name="herramienta"
            value={bodegaHerramienta.herramienta}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-200"
          >
            <option value="0">Seleccione una Herramienta</option>
            {herramientas?.map((herramienta: { id: number; nombre: string }) => (
              <option key={herramienta.id} value={herramienta.id}>
                {herramienta.nombre}
              </option>
            ))}
          </select>
        </div>
        <ReuInput
          label="Cantidad"
          type="number"
          variant="bordered"
          radius="md"
          value={bodegaHerramienta.cantidad}
          onChange={(e) => setBodegaHerramienta((prev) => ({ ...prev, cantidad: Number(e.target.value) }))}
        />
        <ReuInput
          label="Cantidad Prestada"
          type="number"
          variant="bordered"
          radius="md"
          value={bodegaHerramienta.cantidad_prestada}
          onChange={(e) => setBodegaHerramienta((prev) => ({ ...prev, cantidad_prestada: Number(e.target.value) }))}
        />
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            type="button"
            className="w-full max-w-md px-4 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm uppercase tracking-wide"
            onClick={() => navigate("/inventario/listarbodegaherramienta/")}
          >
            Listar Bodega Herramientas
          </button>
        </div>
      </Formulario>
      {user && <BodegaHerramientaNotifications userId3={user.id} />}
    </DefaultLayout>
  );
};

export default BodegaHerramientaPage;