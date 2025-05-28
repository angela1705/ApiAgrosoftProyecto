export interface SensorData {
  id: number;
  fk_sensor: number;
  temperatura: number | null;
  humedad_ambiente: number | null;
  fecha_medicion: string;
}

export interface DataType {
  label: string;
  key: keyof SensorData;
  icon: React.ReactElement;
  sensorId: number;
  decimals: number;
}

export interface ViewMode {
  id: string;
  label: string;
}

export interface DataTypeSelectorProps {
  selectedDataType: DataType;
  setSelectedDataType: (type: DataType) => void;
}

export interface ViewModeSelectorProps {
  selectedViewMode: ViewMode;
  setSelectedViewMode: (mode: ViewMode) => void;
}

export interface SensorStatsProps {
  realTimeData: SensorData[];
}

export interface SensorChartsProps {
  realTimeData: SensorData[];
  selectedDataType: DataType;
}

export interface SensorTableProps {
  realTimeData: SensorData[];
}