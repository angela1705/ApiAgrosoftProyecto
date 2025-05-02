import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { ReuInput } from "@/components/globales/ReuInput";
import { useRegistrarCosecha } from "@/hooks/cultivo/usecosecha";
import { useCultivos } from "@/hooks/cultivo/useCultivo";
import { useNavigate } from "react-router-dom";
import Formulario from "@/components/globales/Formulario";

const CosechaPage: React.FC = () => {

    const [cosecha, setCosecha] = useState({
        id_cultivo: 0,
        cantidad: 0,
        unidades_de_medida: "",
        fecha: "",
    });

    const mutation = useRegistrarCosecha();
    const { data: cultivos } = useCultivos();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCosecha((prev) => ({
            ...prev,
            [name]: name === "unidades_de_medida" || name === "fecha" ? value : Number(value),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(cosecha);
    };

    return (
        <DefaultLayout>
            <Formulario title="Registrar Cosecha"
            onSubmit={handleSubmit}
            >

            <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                        Cultivo
                    </label>
                    <select
                        name="id_cultivo"
                        value={cosecha.id_cultivo || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    >
                        <option value="">Seleccione un cultivo</option>
                        {cultivos?.map((cultivo) => (
                        <option key={cultivo.id} value={cultivo.id}>
                            {cultivo.nombre}
                        </option>
                        ))}
                    </select>
                    </div>

                        <ReuInput
                            label="Cantidad"
                            type="number"
                            value={cosecha.cantidad}
                            onChange={(e) => setCosecha({ ...cosecha, cantidad: Number(e.target.value) })}
                        />

                        <ReuInput
                            label="Unidades de Medida"
                            type="text"
                            value={cosecha.unidades_de_medida}
                            onChange={(e) => setCosecha({ ...cosecha, unidades_de_medida: e.target.value })}
                        />

                        <ReuInput
                            label="Fecha de recolección"
                            type="date"
                            value={cosecha.fecha}
                            onChange={(e) => setCosecha({ ...cosecha, fecha: e.target.value })}
                        />

                      

                            <div className="col-span-1 md:col-span-2 flex justify-center">
                            <button
                                className="w-full max-w-md px-4 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm uppercase tracking-wide"
                                type="button"
                                onClick={() => navigate("/cultivo/listarcosechas/")}
                            >
                                Listar cosechas
                            </button>
                            </div>

            </Formulario>
           
        </DefaultLayout>
    );
};

export default CosechaPage;