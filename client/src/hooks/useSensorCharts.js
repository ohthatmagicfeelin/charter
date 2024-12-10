import { useState, useEffect } from 'react';
import { subHours, subDays, addDays } from 'date-fns';
import { sensorApi } from '@/api/sensorApi';

export const useSensorCharts = () => {
  const [sensorData, setSensorData] = useState([]);
  const [dataTypes, setDataTypes] = useState([{ id: 'temperature', active: true }]);
  const [dateRange, setDateRange] = useState('1d');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const addDataType = () => {
    setDataTypes(current => [...current, { id: 'temperature', active: true }]);
  };

  const removeDataType = (index) => {
    setDataTypes(current => current.filter((_, i) => i !== index));
  };

  const updateDataType = (index, newType) => {
    setDataTypes(current => 
      current.map((type, i) => 
        i === index ? { ...type, id: newType } : type
      )
    );
  };

  const getDateRange = (range) => {
    const now = new Date();
    
    const hoursMap = {
      '1d': 24,
      '3d': 72,
      '7d': 168,
      '30d': 720,
    };

    let start, end;

    if (range === '1d') {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end = addDays(start, 1);
    } else {
      const hours = hoursMap[range];
      start = subHours(now, hours);
      end = now;
    }

    return { start, end };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { start, end } = getDateRange(dateRange);
        
        const hours = Math.ceil((end - start) / (1000 * 60 * 60));
        const response = await sensorApi.getReadingsByType(dataTypes[0].id, hours);

        setSensorData(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching sensor data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [dataTypes, dateRange]);

  return {
    sensorData,
    dataTypes,
    addDataType,
    removeDataType,
    updateDataType,
    dateRange,
    setDateRange,
    getDateRange,
    isLoading,
    error
  };
}; 