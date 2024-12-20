import { useMemo } from 'react';
import { prepareChartData, getChartOptions } from '@/features/dashboard/services/chart/index';
import { getDateRange } from '@/features/dashboard/services/dateService';

export const useChartData = (dataTypes, sensorData, dateRange) => {
  return useMemo(() => {
    return [{
      data: prepareChartData(dataTypes, sensorData),
      options: {
        ...getChartOptions(
          dataTypes.map(t => t.id),
          dateRange,
          getDateRange,
          null,
          null
        ),
        animation: false,
        transitions: {
          active: {
            animation: {
              duration: 0
            }
          }
        },
        responsiveAnimationDuration: 0
      }
    }];
  }, [
    JSON.stringify(dataTypes.map(t => ({ 
      id: t.id, 
      yMin: t.yMin, 
      yMax: t.yMax,
      color: t.color 
    }))),
    JSON.stringify(sensorData),
    dateRange
  ]);
}; 