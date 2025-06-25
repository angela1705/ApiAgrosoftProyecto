 
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import { SensorData, DataType } from "@/types/iot/iotmqtt";
import { SensorCharts } from "./SensorCharts";

interface GenerateReportProps {
  realTimeData: SensorData[];
  dataTypes: DataType[];
}

export const GenerateReport: React.FC<GenerateReportProps> = ({ realTimeData, dataTypes }) => {
  // Refs para capturar gráficos
  const chartRefs = useRef<React.RefObject<HTMLDivElement>[]>(dataTypes.map(() => React.createRef<HTMLDivElement>()));
  // Estado para controlar la generación del PDF
  const [isGenerating, setIsGenerating] = useState(false);

  // Filtro por ESP32_001
  const filteredData = realTimeData.filter((d) => d.device_code === "ESP32_001");

  const generatePDF = async () => {
    if (isGenerating) return; // Evitar múltiples clics
    setIsGenerating(true);

    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const currentDate = new Date().toLocaleString("es-ES", { dateStyle: "full", timeStyle: "medium" });
      const margin = 10;
      let yPosition = margin;

      // Portada
      doc.setFontSize(18);
      doc.text("Reporte de Sensores IoT", margin, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      doc.text(`Generado el ${currentDate}`, margin, yPosition);
      yPosition += 10;
      doc.text("Proyecto Agrosoft", margin, yPosition);
      yPosition += 10;
      doc.setFontSize(10);
      doc.text("Análisis completo de datos recolectados por sensores IoT.", margin, yPosition);
      yPosition += 10;

      // Resumen estadístico
      doc.addPage();
      yPosition = margin;
      doc.setFontSize(14);
      doc.text("Resumen Estadístico", margin, yPosition);
      yPosition += 10;
      doc.setFontSize(10);

      const statsTable = [
        ["Sensor", "Máximo", "Mínimo", "Promedio", "Umbral Mínimo", "Umbral Máximo", "Fuera de Rango"],
        ...dataTypes.map((type) => {
          const values = filteredData
            .filter((d) => d[type.key] !== null && d[type.key] !== undefined)
            .map((d) => d[type.key] as number);
          const max = values.length ? Math.max(...values) : "N/A";
          const min = values.length ? Math.min(...values) : "N/A";
          const avg = values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(type.decimals) : "N/A";
          const outOfRange = values.filter(
            (v) => (type.medida_minima !== undefined && v < type.medida_minima) || (type.medida_maxima !== undefined && v > type.medida_maxima)
          ).length;
          return [
            type.nombre,
            max !== "N/A" ? max.toFixed(type.decimals) : "N/A",
            min !== "N/A" ? min.toFixed(type.decimals) : "N/A",
            avg,
            type.medida_minima?.toFixed(type.decimals) ?? "N/A",
            type.medida_maxima?.toFixed(type.decimals) ?? "N/A",
            outOfRange,
          ];
        }),
      ];

      autoTable(doc, {
        head: [statsTable[0]],
        body: statsTable.slice(1),
        startY: yPosition,
        margin: { left: margin, right: margin },
        styles: { fontSize: 8, cellPadding: 2 },
        headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
      });
      yPosition = (doc as any).lastAutoTable.finalY + 10;

      // Tablas y gráficos por sensor
      for (let index = 0; index < dataTypes.length; index++) {
        const type = dataTypes[index];
        doc.addPage();
        yPosition = margin;
        doc.setFontSize(14);
        doc.text(`Datos de ${type.nombre}`, margin, yPosition);
        yPosition += 10;

        // Tabla de datos
        const tableData = filteredData
          .filter((d) => d[type.key] !== null && d[type.key] !== undefined)
          .map((d) => [
            d.device_code || "N/A",
            d.fecha_medicion ? new Date(d.fecha_medicion).toLocaleString("es-ES") : "N/A",
            typeof d[type.key] === "number" ? (d[type.key] as number).toFixed(type.decimals) : "N/A",
          ]);
        autoTable(doc, {
          head: [["Sensor", "Fecha", type.nombre]],
          body: tableData,
          startY: yPosition,
          margin: { left: margin, right: margin },
          styles: { fontSize: 8, cellPadding: 2 },
          headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
        });
        yPosition = (doc as any).lastAutoTable.finalY + 10;

        // Gráfico
        doc.setFontSize(12);
        doc.text(`Gráfico de ${type.nombre}`, margin, yPosition);
        yPosition += 10;
        const chartRef = chartRefs.current[index];
        if (chartRef?.current) {
          try {
            // Asegurar que el gráfico esté visible temporalmente para la captura
            chartRef.current.style.opacity = "1";
            chartRef.current.style.position = "relative";
            // Esperar a que el gráfico se renderice completamente
            await new Promise((resolve) => setTimeout(resolve, 500));
            const canvas = await html2canvas(chartRef.current, { scale: 2, useCORS: true });
            const imgData = canvas.toDataURL("image/png");
            doc.addImage(imgData, "PNG", margin, yPosition, 190, 95);
            chartRef.current.style.opacity = "0";
            chartRef.current.style.position = "absolute";
          } catch (error) {
            console.error(`Error al capturar gráfico para ${type.nombre}:`, error);
            doc.text(`No se pudo generar el gráfico para ${type.nombre}`, margin, yPosition);
            yPosition += 20;
          }
        } else {
          console.warn(`Ref no encontrado para el gráfico de ${type.nombre}`);
          doc.text(`No se encontró el gráfico para ${type.nombre}`, margin, yPosition);
          yPosition += 20;
        }
        yPosition += 100;
      }

      // Conclusión
      doc.addPage();
      yPosition = margin;
      doc.setFontSize(14);
      doc.text("Conclusión y Recomendaciones", margin, yPosition);
      yPosition += 10;
      doc.setFontSize(10);
      const recommendations = dataTypes.map((type) => {
        const values = filteredData
          .filter((d) => d[type.key] !== null && d[type.key] !== undefined)
          .map((d) => d[type.key] as number);
        const outOfRange = values.filter(
          (v) => (type.medida_minima !== undefined && v < type.medida_minima) || (type.medida_maxima !== undefined && v > type.medida_maxima)
        ).length;
        return outOfRange > 0 ? `- Revisar ${type.nombre.toLowerCase()} (${outOfRange} valores fuera de rango).` : "";
      }).filter(Boolean);
      doc.text(
        [
          "Los datos muestran condiciones generalmente estables.",
          "Recomendaciones:",
          ...recommendations,
          "- Ajustar el riego según los niveles de humedad del suelo.",
          "- Monitorear la calidad del aire para detectar valores atípicos.",
          "- Optimizar la exposición lumínica en horas pico.",
        ].join("\n"),
        margin,
        yPosition
      );

      doc.save(`reporte_sensores_${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("No se pudo generar el reporte. Por favor, revisa la consola para más detalles.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <motion.button
        className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center text-lg font-semibold text-gray-700 hover:bg-gray-100 h-32 w-full"
        onClick={generatePDF}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        disabled={isGenerating}
      >
        {isGenerating ? "Generando..." : "Descargar Reporte"}
      </motion.button>
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        {dataTypes.map((type, index) => (
          <div
            key={type.key}
            ref={chartRefs.current[index]}
            style={{ width: "800px", height: "400px", opacity: 0, position: "absolute" }}
          >
            <SensorCharts realTimeData={filteredData} selectedDataType={type} selectedSensor="todos" />
          </div>
        ))}
      </div>
    </>
  );
};

export default GenerateReport; 