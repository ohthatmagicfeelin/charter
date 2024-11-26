import { useState, useEffect } from 'react';
import { sensorApi } from '@/api/sensorApi';

export const useSensorData = (type, hours = 24) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await sensorApi.getReadingsByType(type, hours);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [type, hours]);

  return { data, loading, error };
}; 