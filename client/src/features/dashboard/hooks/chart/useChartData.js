import { useMemo } from 'react';
import { prepareChartData, getChartOptions } from '@/features/dashboard/services/chartService';
import { getDateRange } from '@/features/dashboard/services/dateService';

export const useChartData = (dataTypes, sensorData, dateRange) => {
  return useMemo(() => {
    return dataTypes.map(type => ({
      type,
      data: prepareChartData(
        type.id,
        sensorData[type.id] || [],
        type.display
      ),
      options: getChartOptions(
        type.id,
        dateRange,
        getDateRange,
        type.yMin,
        type.yMax
      )
    }));
  }, [dataTypes, sensorData, dateRange]);
}; 