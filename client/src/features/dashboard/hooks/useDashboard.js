import { useSensorData } from './useSensorData';
import { useDataTypes } from './dataSelector/useDataTypes';
import { useDateRange } from './date/useDateRange';
import { useChartData } from './chart/useChartData';
import { useScrollPreservation } from './utils/useScrollPreservation';

export const useDashboard = () => {
  const {
    dataTypes,
    addDataType,
    removeDataType,
    updateSensorType,
    updateDataType,
    updateDeviceId,
    updateYAxisRange,
    updateAutoYAxisRange,
    updateDisplayType
  } = useDataTypes();

  const {
    dateRange,
    setDateRange
  } = useDateRange();

  const {
    sensorData,
    isLoading,
    error
  } = useSensorData(dataTypes, dateRange, updateAutoYAxisRange);

  const chartDataSets = useChartData(dataTypes, sensorData, dateRange);

  // Preserve scroll position when data changes
  useScrollPreservation([dataTypes, sensorData, dateRange], isLoading);

  return {
    chartDataSets,
    dataTypes,
    dateRange,
    isLoading,
    error,
    addDataType,
    removeDataType,
    updateSensorType,
    updateDataType,
    updateDeviceId,
    updateYAxisRange,
    updateDisplayType,
    setDateRange,
  };
}; 