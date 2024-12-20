import { useDataTypesContext } from '../../contexts/DataTypesContext';
import { useDateRangeContext } from '../../contexts/DateRangeContext';
import { useSensorDataContext } from '../../contexts/SensorDataContext';
import { useChartData } from '../../hooks/chart/useChartData';
import SensorChartDisplay from './SensorChartDisplay';

export const ChartContainer = () => {
  const { dataTypes } = useDataTypesContext();
  const { dateRange } = useDateRangeContext();
  const { sensorData, isLoading } = useSensorDataContext();
  const chartDataSets = useChartData(dataTypes, sensorData, dateRange);

  return (
    <div className="rounded-lg sm:rounded-2xl overflow-hidden bg-white dark:bg-gray-800 
      shadow-[4px_4px_8px_rgba(0,0,0,0.1),_-4px_-4px_8px_rgba(255,255,255,0.9)]
      dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),_-4px_-4px_8px_rgba(255,255,255,0.05)]"
    >
      <SensorChartDisplay 
        options={chartDataSets[0].options} 
        data={chartDataSets[0].data} 
        isLoading={isLoading} 
      />
    </div>
  );
}; 