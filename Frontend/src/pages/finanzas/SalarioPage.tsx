import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { useSalario } from "@/hooks/finanzas/useSalario";
import { ReuInput } from "@/components/globales/ReuInput";
import { Salario } from "@/types/finanzas/Salario";

const SalarioPage: React.FC = () => {
  const [salario, setSalario] = useState<Salario>({
    fecha_de_implementacion: "",
    fecha_de_vencimiento: "",
    salario_minimo: 0,
    auxilio_transporte: 0,
    horas_laborales_mes: 0,
    valor_hora_ordinaria: 0,
  });

  const { registrarSalario, isRegistrando } = useSalario();
  const navigate = useNavigate();

  const handleChange = (field: keyof Salario) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setSalario((prev) => ({
      ...prev,
      [field]: field.includes("fecha") ? value : Number(value),
    }));
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Salario</h2>

          <ReuInput
            label="Fecha de Implementación"
            type="date"
            value={salario.fecha_de_implementacion}
            onChange={handleChange("fecha_de_implementacion")}
          />
          
          <ReuInput
            label="Fecha de Vencimiento"
            type="date"
            value={salario.fecha_de_vencimiento}
            onChange={handleChange("fecha_de_vencimiento")}
          />

          <ReuInput
            label="Salario Mínimo"
            placeholder="Ingrese el salario mínimo"
            type="number"
            value={salario.salario_minimo}
            onChange={handleChange("salario_minimo")}
          />

          <ReuInput
            label="Auxilio de Transporte"
            placeholder="Ingrese el auxilio de transporte"
            type="number"
            value={salario.auxilio_transporte}
            onChange={handleChange("auxilio_transporte")}
          />

          <ReuInput
            label="Horas Laborales por Mes"
            placeholder="Ingrese las horas laborales por mes"
            type="number"
            value={salario.horas_laborales_mes}
            onChange={handleChange("horas_laborales_mes")}
          />

          <ReuInput
            label="Valor Hora Ordinaria"
            placeholder="Ingrese el valor por hora ordinaria"
            type="number"
            value={salario.valor_hora_ordinaria}
            onChange={handleChange("valor_hora_ordinaria")}
          />

          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4 hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
            type="submit"
            disabled={isRegistrando}
            onClick={(e) => {
              e.preventDefault();
              registrarSalario(salario, {
                onSuccess: () => {
                  setSalario({
                    fecha_de_implementacion: "",
                    fecha_de_vencimiento: "",
                    salario_minimo: 0,
                    auxilio_transporte: 0,
                    horas_laborales_mes: 0,
                    valor_hora_ordinaria: 0,
                  });
                },
              });
            }}
          >
            {isRegistrando ? "Registrando..." : "Guardar"}
          </button>

          <button
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={() => navigate("/finanzas/listarsalarios/")}
          >
            Listar Salarios
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SalarioPage;