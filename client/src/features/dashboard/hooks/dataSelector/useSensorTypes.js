import { useState, useEffect } from 'react';
import { sensorApi } from '@/api/sensorApi';

export const useSensorTypes = (deviceId, sensor) => {
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypes = async () => {
      if (!sensor || !deviceId) {
        setTypes([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await sensorApi.getTypesBySensorAndDevice(deviceId, sensor);

        const typeList = response.data.map(type => ({
          id: type,
          label: type
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        }));
        setTypes(typeList);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching sensor types:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTypes();
  }, [deviceId, sensor]);

  return { types, isLoading, error };
}; 