import { useState, useEffect } from 'react';
import { subHours, subDays, addDays } from 'date-fns';
import { sensorApi } from '@/api/sensorApi';

export const useSensorCharts = () => {
  const [sensorData, setSensorData] = useState([]);
  const [activeTab, setActiveTab] = useState('temperature');
  const [dateRange, setDateRange] = useState('1d');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const response = await sensorApi.getReadingsByType(activeTab, hours);

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
  }, [activeTab, dateRange]);

  return {
    sensorData,
    activeTab,
    setActiveTab,
    dateRange,
    setDateRange,
    getDateRange,
    isLoading,
    error
  };
}; 