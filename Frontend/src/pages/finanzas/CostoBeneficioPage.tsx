import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import CustomSpinner from "@/components/globales/Spinner";
import CustomCard from "@/components/globales/Card";
import ReuModal from "@/components/globales/ReuModal";
import { useCosechas } from "@/hooks/cultivo/usecosecha";
import { useAnalisisPorCosecha } from "@/hooks/finanzas/useCostoBeneficio";
import { Cosecha } from "@/types/cultivo/Cosecha";

const formatNumber = (value: number | undefined): string => {
  if (value === undefined) return '0';
  return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const CostoBeneficioPage: React.FC = () => {
  const { 
    data: cosechas, 
    isLoading: loadingCosechas, 
    error: errorCosechas 
  } = useCosechas();
  
  const [selectedCosecha, setSelectedCosecha] = useState<Cosecha | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  
  const { 
    data: analisis, 
    isLoading: loadingAnalisis, 
    error: errorAnalisis 
  } = useAnalisisPorCosecha(selectedCosecha?.id || 0);

  const handleCardClick = (cosecha: Cosecha) => {
    setSelectedCosecha(cosecha);
    setModalOpen(true);
  };

  if (loadingCosechas) {
    return (
      <DefaultLayout>
        <div className="flex justify-center items-center h-screen">
          <CustomSpinner
            label="Cargando cosechas..."
            color="primary"
            variant="wave"
            className="text-primary"
          />
        </div>
      </DefaultLayout>
    );
  }

  if (errorCosechas) {
    return (
      <DefaultLayout>
        <div className="text-center py-12 text-red-500">
          <p className="text-xl">Error al cargar las cosechas</p>
          <p>{errorCosechas.message}</p>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Listado de Cosechas</h1>
        
        {cosechas?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No hay cosechas registradas</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cosechas?.map((cosecha) => (
              <div 
                key={cosecha.id} 
                onClick={() => handleCardClick(cosecha)}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <CustomCard
                  title={`Cosecha #${cosecha.id}`}
                  subtitle={`Cultivo: ${cosecha.cultivo_nombre}`}
                  tracks={`${formatNumber(cosecha.cantidad)} ${cosecha.unidades_de_medida}`}
                  image="/images/default-cosecha.jpg"
                />
              </div>
            ))}
          </div>
        )}

        <ReuModal
          isOpen={modalOpen}
          onOpenChange={setModalOpen}
          title={`Análisis de Costo-Beneficio - Cosecha #${selectedCosecha?.id}`}
          size="lg"
        >
          {loadingAnalisis ? (
            <div className="flex justify-center py-8">
              <CustomSpinner
                label="Calculando análisis..."
                color="primary"
                variant="spinner"
                className="text-primary"
              />
            </div>
          ) : errorAnalisis ? (
            <div className="text-center py-8 text-red-500">
              <p>Error al cargar el análisis</p>
              <p>{errorAnalisis.message}</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Costos</h3>
                  <ul className="space-y-2">
                    {analisis?.costos && Object.entries(analisis.costos).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace('_', ' ')}:</span>
                        <span className="font-medium">COP {formatNumber(value)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Ingresos</h3>
                  <ul className="space-y-2">
                    {analisis?.ingresos && Object.entries(analisis.ingresos).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace('_', ' ')}:</span>
                        <span className="font-medium">COP {formatNumber(value)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Métricas Clave</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Costos</p>
                    <p className="text-xl font-bold text-red-600">
                      COP {formatNumber(analisis?.metricas.total_costos)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Ingresos</p>
                    <p className="text-xl font-bold text-green-600">
                      COP {formatNumber(analisis?.metricas.total_ingresos)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Rentabilidad</p>
                    <p className={`text-xl font-bold ${
                      (analisis?.metricas.rentabilidad || 0) >= 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      COP {formatNumber(analisis?.metricas.rentabilidad)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">ROI</p>
                    <p className={`text-xl font-bold ${
                      (analisis?.metricas.roi || 0) >= 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {formatNumber(analisis?.metricas.roi)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ReuModal>
      </div>
    </DefaultLayout>
  );
};

export default CostoBeneficioPage;