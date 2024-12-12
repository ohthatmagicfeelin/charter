import { useState, useEffect } from 'react';
import { sensorApi } from '@/api/sensorApi';

export const useTypeList = () => {
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setIsLoading(true);
        const response = await sensorApi.getTypeList();
        // Transform the types into the format expected by the buttons
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
        console.error('Error fetching type list:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return { types, isLoading, error };
}; 