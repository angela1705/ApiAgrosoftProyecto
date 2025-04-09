import { useState, useEffect } from "react";
import { useReporte } from "@/hooks/reportes/useReporte";
import { opcionesModulos, reportesPorModulo } from "@/types/reportes/reportes";
import DefaultLayout from "@/layouts/default";
import ReuModal from "@/components/globales/ReuModal";

export default function Reportes() {
    const [modulo, setModulo] = useState("");
    const [reporte, setReporte] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(100);

    const { data: pdf, isLoading, error, refetch } = useReporte(modulo, reporte, {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
    });

    useEffect(() => {
        if (pdf) {
            const url = window.URL.createObjectURL(pdf);
            setPdfUrl(url);
            return () => window.URL.revokeObjectURL(url);
        } else {
            setPdfUrl(null);
        }
    }, [pdf]);

    const descargarPDF = () => {
        if (pdfUrl) {
            const a = document.createElement("a");
            a.href = pdfUrl;
            a.download = `reporte_${modulo}_${reporte}_${new Date().toISOString().slice(0, 10)}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const generarReporte = () => {
        if (modulo && reporte && fechaInicio && fechaFin) {
            refetch().then(() => {
                setIsModalOpen(true);
            });
        }
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 10, 200));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 10, 50));
    };

    return (
        <DefaultLayout>
            <div className="w-full flex flex-col items-center min-h-screen p-4">
                <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Generar Reporte</h1>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Módulo:</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => {
                                    setModulo(e.target.value);
                                    setReporte("");
                                    setPdfUrl(null);
                                }}
                                value={modulo}
                            >
                                <option value="">Selecciona un módulo...</option>
                                {opcionesModulos.map((opcion) => (
                                    <option key={opcion.modulo} value={opcion.modulo}>
                                        {opcion.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {modulo && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reporte:</label>
                                <select 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => {
                                        setReporte(e.target.value);
                                        setPdfUrl(null);
                                    }} 
                                    value={reporte}
                                >
                                    <option value="">Selecciona un reporte...</option>
                                    {reportesPorModulo[modulo]?.map((opcion) => (
                                        <option key={opcion.reporte} value={opcion.reporte}>
                                            {opcion.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio:</label>
                                <input 
                                    type="date" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={fechaInicio} 
                                    onChange={(e) => {
                                        setFechaInicio(e.target.value);
                                        setPdfUrl(null);
                                    }} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin:</label>
                                <input 
                                    type="date" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={fechaFin} 
                                    onChange={(e) => {
                                        setFechaFin(e.target.value);
                                        setPdfUrl(null);
                                    }} 
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <button 
                                onClick={generarReporte} 
                                disabled={isLoading || !modulo || !reporte || !fechaInicio || !fechaFin}
                                className={`px-4 py-2 rounded-lg font-medium ${(isLoading || !modulo || !reporte || !fechaInicio || !fechaFin) 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generando...
                                    </span>
                                ) : "Generar Reporte"}
                            </button>
                            
                            <button 
                                onClick={descargarPDF} 
                                disabled={isLoading || !pdfUrl}
                                className={`px-4 py-2 rounded-lg font-medium ${(isLoading || !pdfUrl) 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-green-600 hover:bg-green-700 text-white'}`}
                            >
                                Descargar PDF
                            </button>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                Error al generar el reporte: {error.message}
                            </div>
                        )}
                    </div>
                </div>

                <ReuModal
                isOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                title={`Vista previa: ${reportesPorModulo[modulo]?.find(r => r.reporte === reporte)?.nombre}`}
                onConfirm={descargarPDF}
                size="5xl" 
            >
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center bg-gray-100 rounded-md">
                        <button 
                            onClick={handleZoomOut}
                            className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded-l-md"
                            disabled={zoomLevel <= 50}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <span className="px-2 py-1 text-sm">{zoomLevel}%</span>
                        <button 
                            onClick={handleZoomIn}
                            className="px-2 py-1 text-gray-700 hover:bg-gray-200 rounded-r-md"
                            disabled={zoomLevel >= 200}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <iframe 
                        src={pdfUrl || ""} 
                        width={`${zoomLevel}%`}
                        height="500px"
                        className="border-0 mx-auto block"
                        title="Vista previa del PDF"
                    />
                </div>
            </ReuModal>
            </div>
        </DefaultLayout>
    );
}