import { useState, useEffect } from 'react';
import { sensorApi } from '@/api/sensorApi';
import { getDateRange } from '@/features/dashboard/services/dateService';
import { getDefaultYAxisRange } from '@/features/dashboard/services/chart/index';

export const useSensorData = (dataTypes, dateRange, onYAxisRangeUpdate) => {
  const [sensorData, setSensorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { hours } = getDateRange(dateRange);

        const results = await Promise.all(
          dataTypes.map(async (type) => {
            if (!type.id || !type.deviceId) return { typeId: type.id, data: [] };
            
            try {
              const response = await sensorApi.getReadingsByDeviceAndType(
                type.deviceId,
                type.id,
                hours
              );

              const data = response?.data || [];
              
              // Calculate default range if not manually set
              if (type.yMin === null || type.yMax === null) {
                const { min, max } = getDefaultYAxisRange(data);
                onYAxisRangeUpdate(type.id, min, max);
              }

              return { 
                typeId: type.id, 
                data 
              };
            } catch (err) {
              console.error(`Error fetching data for type ${type.id}:`, err);
              return { typeId: type.id, data: [] };
            }
          })
        );
        
        const newData = results.reduce((acc, { typeId, data }) => {
          acc[typeId] = Array.isArray(data) ? data : [];
          return acc;
        }, {});

        setSensorData(newData);
      } catch (err) {
        console.error('Error fetching sensor data:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    
    return () => clearInterval(intervalId);
  }, [dataTypes, dateRange, onYAxisRangeUpdate]);

  return { sensorData, isLoading, error };
}; 