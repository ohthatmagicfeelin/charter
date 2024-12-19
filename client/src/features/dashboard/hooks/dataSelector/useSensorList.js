import { useState, useEffect } from 'react';
import { sensorApi } from '@/api/sensorApi';

export const useSensorList = () => {
  const [sensors, setSensors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        setIsLoading(true);
        const response = await sensorApi.getSensorList();
        const sensorList = response.data.map(sensor => ({
          id: sensor,
          label: sensor
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        }));
        setSensors(sensorList);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching sensor list:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSensors();
  }, []);

  return { sensors, isLoading, error };
};
