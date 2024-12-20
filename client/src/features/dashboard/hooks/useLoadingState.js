import { useDataTypesContext } from '../contexts/DataTypesContext';
import { useDateRangeContext } from '../contexts/DateRangeContext';
import { useSensorData } from './useSensorData';

export const useLoadingState = () => {
  const { dataTypes } = useDataTypesContext();
  const { dateRange } = useDateRangeContext();
  const { isLoading: isSensorDataLoading } = useSensorData(dataTypes, dateRange);

  return {
    isLoading: isSensorDataLoading
  };
}; 