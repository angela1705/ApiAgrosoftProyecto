import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { usePago } from "@/hooks/finanzas/usePago";
import { ReuInput } from "@/components/globales/ReuInput";
import { Pago } from "@/types/finanzas/Pago";

const PagoPage: React.FC = () => {
  const [pago, setPago] = useState<Pago>({
    horas_trabajadas: 0,
    salario: 0,
    total_a_pagar: null,
    usuario: 0,
    periodo_inicio: "",
    periodo_fin: "",
    horas_extras: 0,
    auxilio_transporte: null,
  });

  const { registrarPago, isRegistrando } = usePago();
  const navigate = useNavigate();

  const handleChange = (field: keyof Pago) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    // Para campos de fecha dejamos el string, para los numéricos se convierte en Number
    setPago((prev) => ({
      ...prev,
      [field]:
        field === "periodo_inicio" || field === "periodo_fin"
          ? value
          : Number(value),
    }));
  };

  return (
    <DefaultLayout>
      <div className="w-full flex flex-col items-center min-h-screen p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Registro de Pago</h2>

          <ReuInput
            label="Horas Trabajadas"
            placeholder="Ingrese las horas trabajadas"
            type="number"
            value={pago.horas_trabajadas}
            onChange={handleChange("horas_trabajadas")}
          />

          <ReuInput
            label="Salario (ID o valor)"
            placeholder="Ingrese el salario"
            type="number"
            value={pago.salario}
            onChange={handleChange("salario")}
          />

          <ReuInput
            label="Total a Pagar"
            placeholder="Ingrese el total a pagar"
            type="number"
            value={pago.total_a_pagar ?? ""}
            onChange={handleChange("total_a_pagar")}
          />

          <ReuInput
            label="Usuario (ID)"
            placeholder="Ingrese el ID del usuario"
            type="number"
            value={pago.usuario}
            onChange={handleChange("usuario")}
          />

          <ReuInput
            label="Periodo Inicio"
            type="date"
            value={pago.periodo_inicio}
            onChange={handleChange("periodo_inicio")}
          />

          <ReuInput
            label="Periodo Fin"
            type="date"
            value={pago.periodo_fin}
            onChange={handleChange("periodo_fin")}
          />

          <ReuInput
            label="Horas Extras"
            placeholder="Ingrese las horas extras"
            type="number"
            value={pago.horas_extras}
            onChange={handleChange("horas_extras")}
          />

          <ReuInput
            label="Auxilio de Transporte"
            placeholder="Ingrese el auxilio de transporte"
            type="number"
            value={pago.auxilio_transporte ?? ""}
            onChange={handleChange("auxilio_transporte")}
          />

          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg mt-4 hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
            type="submit"
            disabled={isRegistrando}
            onClick={(e) => {
              e.preventDefault();
              registrarPago(pago, {
                onSuccess: () => {
                  // Reseteamos el state una vez registrado el pago
                  setPago({
                    horas_trabajadas: 0,
                    salario: 0,
                    total_a_pagar: null,
                    usuario: 0,
                    periodo_inicio: "",
                    periodo_fin: "",
                    horas_extras: 0,
                    auxilio_transporte: null,
                  });
                },
              });
            }}
          >
            {isRegistrando ? "Registrando..." : "Guardar"}
          </button>

          <button
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg mt-4 hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-105"
            onClick={() => navigate("/finanzas/listarpagos/")}
          >
            Listar Pagos
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PagoPage;
