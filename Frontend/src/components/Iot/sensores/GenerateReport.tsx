import React, { useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { SensorData, TipoSensor, Sensor } from '@/types/iot/type';
import { SensorCharts } from '@/components/Iot/sensores/SensorCharts'; 
import agrosoftLogo from "../../../assets/Agrosoft_Logo.png";
import senaLogo from "../../../assets/logo sena.png";

interface GenerateReportProps {
  realTimeData: SensorData[];
  dataTypes: TipoSensor[];
  sensores: Sensor[];
}

export const GenerateReport: React.FC<GenerateReportProps> = ({ realTimeData, dataTypes, sensores }) => {
  const chartRefs = useRef<Array<React.RefObject<HTMLDivElement | null>>>(
    dataTypes.map(() => React.createRef<HTMLDivElement | null>())
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredData = useMemo((): SensorData[] => {
    return realTimeData
      .filter((d) => d.fk_sensor !== null)
      .map((d) => ({
        ...d,
        device_code: sensores.find((s) => s.id === d.fk_sensor)?.device_code || `sensor_${d.fk_sensor}`,
        bancal_nombre: d.bancal_nombre ?? undefined,
      }));
  }, [realTimeData, sensores]);

  const addLogos = (doc: jsPDF, margin: number, yPosition: number) => {
    try {
      doc.addImage(agrosoftLogo, 'PNG', margin, yPosition, 30, 15);
      doc.addImage(senaLogo, 'PNG', 170, yPosition, 30, 15);
    } catch (error) {
      doc.setFontSize(8);
      doc.text('No se pudieron cargar los logos.', margin, yPosition + 18);
    }
    return yPosition + 20;
  };

  const addDecorativeLines = (doc: jsPDF, margin: number, yPosition: number) => {
    doc.setDrawColor(34, 139, 34);
    doc.setLineWidth(0.3);
    doc.line(margin, yPosition, 210 - margin, yPosition);
    return yPosition + 5;
  };

  const addPageNumber = (doc: jsPDF, page: number) => {
    doc.setFontSize(8);
    doc.setTextColor(0, 0, 0);
    doc.text(`Página ${page}`, 190, 290, { align: 'right' });
  };

  const generateStatsTable = (doc: jsPDF, margin: number, yPosition: number) => {
    const statsTable = [
      ['Sensor', 'Máximo', 'Mínimo', 'Promedio', 'Umbral Mínimo', 'Umbral Máximo', 'Fuera de Rango'],
      ...dataTypes.map((type) => {
        const values = filteredData
          .filter((d) => d[type.key] !== null && d[type.key] !== undefined)
          .map((d) => d[type.key] as number);
        const max = values.length ? Math.max(...values).toFixed(type.decimals) : 'N/A';
        const min = values.length ? Math.min(...values).toFixed(type.decimals) : 'N/A';
        const avg = values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(type.decimals) : 'N/A';
        const outOfRange = values.filter(
          (v) => (type.medida_minima !== undefined && v < type.medida_minima) || (type.medida_maxima !== undefined && v > type.medida_maxima)
        ).length;
        return [
          type.label,
          max,
          min,
          avg,
          type.medida_minima?.toFixed(type.decimals) ?? 'N/A',
          type.medida_maxima?.toFixed(type.decimals) ?? 'N/A',
          outOfRange.toString(),
        ];
      }),
    ];

    autoTable(doc, {
      head: [statsTable[0]],
      body: statsTable.slice(1),
      startY: yPosition,
      margin: { left: margin, right: margin },
      styles: { fontSize: 8, cellPadding: 2, halign: 'center', font: 'helvetica' },
      headStyles: { fillColor: [34, 139, 34], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      tableLineColor: [34, 139, 34],
      tableLineWidth: 0.1,
    });
    return (doc as any).lastAutoTable.finalY + 6;
  };

  const generateSensorSection = async (doc: jsPDF, margin: number, yPosition: number, type: TipoSensor, index: number) => {
    doc.addPage();
    yPosition = margin;
    addPageNumber(doc, doc.getNumberOfPages());

    doc.setFontSize(14);
    doc.setTextColor(34, 139, 34);
    doc.text(`Análisis de ${type.label}`, margin, yPosition);
    yPosition += 8;
    yPosition = addDecorativeLines(doc, margin, yPosition);

    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    const purposeText = [
      `Descripción: ${type.label} mide ${getSensorDescription(type.key)}`,
      `Propósito: Visualizar tendencias de ${type.label.toLowerCase()} para identificar picos, caídas o desviaciones que afecten el crecimiento de cultivos.`,
      `Qué se espera: Detectar anomalías para ajustar condiciones como riego, ventilación o iluminación, optimizando la productividad agrícola.`,
    ];
    doc.text(purposeText, margin, yPosition, { maxWidth: 190 });
    yPosition += 18;

    const tableData = filteredData
      .filter((d) => d[type.key] !== null && d[type.key] !== undefined)
      .map((d) => [
        d.device_code || 'N/A',
        d.fecha_medicion ? new Date(d.fecha_medicion).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'medium' }) : 'N/A',
        typeof d[type.key] === 'number' ? (d[type.key] as number).toFixed(type.decimals) : 'N/A',
      ]);
    autoTable(doc, {
      head: [['Sensor', 'Fecha', type.label]],
      body: tableData.slice(0, 10),
      startY: yPosition,
      margin: { left: margin, right: margin },
      styles: { fontSize: 8, cellPadding: 2, halign: 'center', font: 'helvetica' },
      headStyles: { fillColor: [34, 139, 34], textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      tableLineColor: [34, 139, 34],
      tableLineWidth: 0.1,
    });
    yPosition = (doc as any).lastAutoTable.finalY + 6;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Gráfico de ${type.label}`, margin, yPosition);
    yPosition += 8;
    const chartRef = chartRefs.current[index];
    if (chartRef?.current) {
      try {
        chartRef.current.style.opacity = '1';
        chartRef.current.style.position = 'relative';
        chartRef.current.style.width = '800px';
        chartRef.current.style.height = '400px';
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const canvas = await html2canvas(chartRef.current, { scale: 2, useCORS: true, logging: true });
        const imgData = canvas.toDataURL('image/png');
        const imgHeight = 70;
        const imgWidth = 190;
        doc.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
        chartRef.current.style.opacity = '0';
        chartRef.current.style.position = 'absolute';
        yPosition += imgHeight + 6;
      } catch (error) {
        doc.setFontSize(9);
        doc.text(`No se pudo generar el gráfico para ${type.label}.`, margin, yPosition);
        yPosition += 10;
      }
    } else {
      doc.setFontSize(9);
      doc.text(`No se encontró el gráfico para ${type.label}.`, margin, yPosition);
      yPosition += 10;
    }

    doc.setFontSize(10);
    doc.setTextColor(34, 139, 34);
    doc.text(`Recomendaciones para ${type.label}`, margin, yPosition);
    yPosition += 6;
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    const values = filteredData
      .filter((d) => d[type.key] !== null && d[type.key] !== undefined)
      .map((d) => d[type.key] as number);
    const outOfRange = values.filter(
      (v) => (type.medida_minima !== undefined && v < type.medida_minima) || (type.medida_maxima !== undefined && v > type.medida_maxima)
    ).length;
    const avg = values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(type.decimals) : 'N/A';
    const recommendation = outOfRange > 0
      ? `Se detectaron ${outOfRange} valores fuera de rango (${type.medida_minima ?? 'N/A'} - ${type.medida_maxima ?? 'N/A'}). Promedio: ${avg}. ${getSpecificRecommendation(type, outOfRange, avg)}`
      : `Valores dentro de rango. Promedio: ${avg}. Mantener monitoreo regular.`;
    doc.text(recommendation, margin, yPosition, { maxWidth: 190 });
    yPosition += 15;

    return yPosition;
  };

  const generatePDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const currentDate = new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'medium' });
      const margin = 10;
      let yPosition = 30;

      doc.setFillColor(245, 245, 245);
      doc.rect(0, 0, 210, 297, 'F');
      yPosition = addLogos(doc, margin, yPosition);
      yPosition = addDecorativeLines(doc, margin, yPosition);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(34, 139, 34);
      doc.text('Reporte de Monitoreo Meteorológico', 105, yPosition, { align: 'center' });
      yPosition += 8;
      doc.setFontSize(12);
      doc.text('Proyecto Agrosoft', 105, yPosition, { align: 'center' });
      yPosition += 10;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text(`Generado el ${currentDate}`, 105, yPosition, { align: 'center' });
      yPosition += 12;
      doc.setFontSize(9);
      doc.text(
        [
          'Este reporte presenta datos meteorológicos recopilados por sensores IoT (HTTP/WebSocket) para optimizar condiciones agrícolas.',
          'Incluye estadísticas, gráficos de tendencias y recomendaciones basadas en umbrales definidos.',
        ],
        margin,
        yPosition,
        { maxWidth: 190 }
      );
      yPosition += 18;
      doc.setFontSize(10);
      doc.text('Sensores Monitoreados:', margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.text(dataTypes.map((type) => type.label).join(', '), margin, yPosition, { maxWidth: 190 });
      yPosition += 10;
      doc.setFontSize(10);
      doc.text('Objetivo del Reporte:', margin, yPosition);
      yPosition += 6;
      doc.setFontSize(9);
      doc.text(
        [
          '- Proveer análisis detallado de condiciones ambientales.',
          '- Identificar valores fuera de rango para acciones correctivas.',
          '- Optimizar riego, ventilación e iluminación para maximizar la productividad.',
        ],
        margin,
        yPosition,
        { maxWidth: 190 }
      );
      yPosition += 18;

      doc.setFontSize(14);
      doc.setTextColor(34, 139, 34);
      doc.text('Resumen Estadístico', margin, yPosition);
      yPosition += 8;
      yPosition = addDecorativeLines(doc, margin, yPosition);
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      doc.text('Descripción de Sensores:', margin, yPosition);
      yPosition += 6;
      const sensorDescriptions = [
        '- Temperatura (°C): Temperatura ambiental en °C (rango: 10–40 °C).',
        '- Humedad Ambiente (%): Humedad relativa del aire en % (rango: 20–90 %).',
        '- Calidad del Aire: Nivel de calidad del aire (rango definido por el sensor).',
      ];
      doc.text(sensorDescriptions, margin, yPosition, { maxWidth: 190 });
      yPosition += sensorDescriptions.length * 6 + 6;
      doc.setFontSize(12);
      doc.setTextColor(34, 139, 34);
      doc.text('Estadísticas Generales', margin, yPosition);
      yPosition += 8;
      yPosition = generateStatsTable(doc, margin, yPosition);
      addPageNumber(doc, 1);

      for (let index = 0; index < dataTypes.length; index++) {
        yPosition = await generateSensorSection(doc, margin, yPosition, dataTypes[index], index);
      }

      doc.addPage();
      yPosition = margin;
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 0, 210, 297, 'F');
      doc.setFontSize(14);
      doc.setTextColor(34, 139, 34);
      doc.text('Conclusión y Recomendaciones', margin, yPosition);
      yPosition += 8;
      yPosition = addDecorativeLines(doc, margin, yPosition);
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 0);
      const recommendations = dataTypes.map((type) => {
        const values = filteredData
          .filter((d) => d[type.key] !== null && d[type.key] !== undefined)
          .map((d) => d[type.key] as number);
        const outOfRange = values.filter(
          (v) => (type.medida_minima !== undefined && v < type.medida_minima) || (type.medida_maxima !== undefined && v > type.medida_maxima)
        ).length;
        const avg = values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(type.decimals) : 'N/A';
        return outOfRange > 0
          ? `- **${type.label}**: ${outOfRange} valores fuera de rango (${type.medida_minima ?? 'N/A'} - ${type.medida_maxima ?? 'N/A'}). Promedio: ${avg}. ${getSpecificRecommendation(type, outOfRange, avg)}`
          : `- **${type.label}**: Valores dentro de rango. Promedio: ${avg}. Mantener monitoreo regular.`;
      });
      doc.text(
        [
          'El análisis de datos meteorológicos indica un monitoreo estable con las siguientes observaciones:',
          'Recomendaciones específicas:',
          ...recommendations,
          '',
          'Acciones generales:',
          '- Implementar ajustes en riego según niveles de humedad ambiental.',
          '- Monitorear temperatura para proteger cultivos.',
          '- Realizar mantenimiento periódico de sensores para garantizar precisión.',
        ],
        margin,
        yPosition,
        { maxWidth: 190 }
      );
      yPosition += recommendations.length * 8 + 30;

      doc.setFontSize(12);
      doc.setTextColor(34, 139, 34);
      doc.text('Resumen de Anomalías', margin, yPosition);
      yPosition += 8;
      const anomalyTable = [
        ['Sensor', 'Valores Fuera de Rango', 'Recomendación'],
        ...dataTypes.map((type) => {
          const values = filteredData
            .filter((d) => d[type.key] !== null && d[type.key] !== undefined)
            .map((d) => d[type.key] as number);
          const outOfRange = values.filter(
            (v) => (type.medida_minima !== undefined && v < type.medida_minima) || (type.medida_maxima !== undefined && v > type.medida_maxima)
          ).length;
          return [
            type.label,
            outOfRange.toString(),
            getSpecificRecommendation(type, outOfRange, 'N/A'),
          ];
        }).filter((row) => Number(row[1]) > 0),
      ];
      if (anomalyTable.length > 1) {
        autoTable(doc, {
          head: [anomalyTable[0]],
          body: anomalyTable.slice(1),
          startY: yPosition,
          margin: { left: margin, right: margin },
          styles: { fontSize: 8, cellPadding: 2, halign: 'center', font: 'helvetica' },
          headStyles: { fillColor: [34, 139, 34], textColor: [255, 255, 255], fontStyle: 'bold' },
          alternateRowStyles: { fillColor: [245, 245, 245] },
          tableLineColor: [34, 139, 34],
          tableLineWidth: 0.1,
        });
        yPosition = (doc as any).lastAutoTable.finalY + 6;
      } else {
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.text('No se detectaron valores fuera de rango.', margin, yPosition);
        yPosition += 10;
      }
      addPageNumber(doc, doc.getNumberOfPages());

      doc.save(`reporte_meteorologico_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getSensorDescription = (key: string) => {
    switch (key) {
      case 'temperatura':
        return 'Temperatura ambiental en °C (rango: 10–40 °C).';
      case 'humedad_ambiente':
        return 'Humedad relativa del aire en % (rango: 20–90 %).';
      case 'calidad_aire':
        return 'Nivel de calidad del aire (rango definido por el sensor).';
      default:
        return 'Parámetro ambiental.';
    }
  };

  const getSpecificRecommendation = (type: TipoSensor, outOfRange: number, avg: string) => {
    switch (type.key) {
      case 'temperatura':
        return outOfRange > 0
          ? `Revisar ventilación o calefacción (promedio: ${avg} °C). Implementar sistemas de control térmico si excede 40 °C o cae por debajo de 10 °C.`
          : 'Mantener monitoreo de temperatura para evitar fluctuaciones.';
      case 'humedad_ambiente':
        return outOfRange > 0
          ? `Ajustar ventilación o humidificadores (promedio: ${avg} %). Verificar sistemas de riego si está fuera de 20–90 %.`
          : 'Continuar monitoreo de humedad ambiental.';
      case 'calidad_aire':
        return outOfRange > 0
          ? `Mejorar ventilación o implementar filtros (promedio: ${avg}). Verificar fuentes de contaminación.`
          : 'Continuar monitoreo de calidad del aire.';
      default:
        return 'Realizar ajustes según las necesidades del cultivo.';
    }
  };

  const mapToDataType = (tipoSensor: TipoSensor): TipoSensor => ({
    id: tipoSensor.id,
    label: tipoSensor.label,
    key: tipoSensor.key,
    icon: tipoSensor.icon,
    tipo_sensor_id: tipoSensor.tipo_sensor_id,
    decimals: tipoSensor.decimals,
    unidad_medida: tipoSensor.unidad_medida || '',
    medida_minima: tipoSensor.medida_minima,
    medida_maxima: tipoSensor.medida_maxima,
    nombre: tipoSensor.nombre || tipoSensor.label, // Asegurar que nombre no sea undefined
    tipo_sensor: tipoSensor.tipo_sensor || tipoSensor.key,
  });

  return (
    <>
      <motion.button
        className='bg-green-600 text-white rounded-lg shadow-lg p-4 flex items-center justify-center text-sm font-semibold hover:bg-green-700 transition-colors'
        onClick={generatePDF}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generando Reporte...' : 'Descargar Reporte'}
      </motion.button>
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        {dataTypes.map((type, index) => (
          <div
            key={type.key}
            ref={chartRefs.current[index]}
            style={{ width: '800px', height: '400px', opacity: 0, position: 'absolute' }}
          >
            <SensorCharts
              realTimeData={filteredData}
              selectedDataType={mapToDataType(type)}
              selectedSensor='todos'
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default GenerateReport;