import { useState, useEffect } from 'react';
import { sensorApi } from '@/api/sensorApi';
import { getDateRange } from '@/features/dashboard/services/dateService';
import { getDefaultYAxisRange } from '@/features/dashboard/services/chart/index';

export const useSensorData = (dataTypes, dateRange, onYAxisRangeUpdate) => {
  const [sensorData, setSensorData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdateTimes, setLastUpdateTimes] = useState({});

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const updates = await Promise.all(
          dataTypes.map(async (type) => {
            if (!type.id || !type.deviceId) return false;
            
            const lastUpdate = await sensorApi.getLastUpdateTime(
              type.deviceId,
              type.id
            );
            
            const currentLastUpdate = lastUpdateTimes[`${type.deviceId}-${type.id}`];
            return lastUpdate !== currentLastUpdate;
          })
        );

        return updates.some(hasUpdate => hasUpdate);
      } catch (err) {
        console.error('Error checking for updates:', err);
        return true; // Fetch on error to be safe
      }
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const hoursMap = {
          '1d': 24,
          '3d': 72,
          '7d': 168,
          '30d': 720
        };
        const hours = hoursMap[dateRange] || 24;

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
              
              // Store last update time
              setLastUpdateTimes(prev => ({
                ...prev,
                [`${type.deviceId}-${type.id}`]: response.lastUpdate
              }));

              if (type.yMin === null || type.yMax === null) {
                const { min, max } = getDefaultYAxisRange(data);
                onYAxisRangeUpdate(type.id, min, max);
              }

              return { 
                typeId: type.id, 
                deviceId: type.deviceId, 
                data 
              };
            } catch (err) {
              console.error(`Error fetching data for type ${type.id}:`, err);
              return { typeId: type.id, data: [] };
            }
          })
        );
        
        const newData = results.reduce((acc, { typeId, data, deviceId }) => {
          const compositeKey = `${deviceId}_${typeId}`;
          acc[compositeKey] = Array.isArray(data) ? data : [];
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

    const pollForUpdates = async () => {
      const hasUpdates = await checkForUpdates();
      if (hasUpdates) {
        await fetchData();
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(pollForUpdates, 30000);
    
    return () => clearInterval(intervalId);
  }, [dataTypes, dateRange, onYAxisRangeUpdate]);

  return { sensorData, isLoading, error };
}; 