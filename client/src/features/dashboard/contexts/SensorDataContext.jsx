import { createContext, useContext } from 'react';
import { useSensorData } from '../hooks/useSensorData';
import { useDataTypesContext } from './DataTypesContext';
import { useDateRangeContext } from './DateRangeContext';

const SensorDataContext = createContext(null);

export const SensorDataProvider = ({ children }) => {
  const { dataTypes, updateAutoYAxisRange } = useDataTypesContext();
  const { dateRange } = useDateRangeContext();
  
  const sensorDataHook = useSensorData(dataTypes, dateRange, updateAutoYAxisRange);
  
  return (
    <SensorDataContext.Provider value={sensorDataHook}>
      {children}
    </SensorDataContext.Provider>
  );
};

export const useSensorDataContext = () => {
  const context = useContext(SensorDataContext);
  if (!context) {
    throw new Error('useSensorDataContext must be used within a SensorDataProvider');
  }
  return context;
}; 