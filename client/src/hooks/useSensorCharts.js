import { useState, useEffect } from 'react';
import { subHours, subDays, addDays } from 'date-fns';
import { sensorApi } from '@/api/sensorApi';

export const useSensorCharts = () => {
  const [sensorData, setSensorData] = useState([]);
  const [dataTypes, setDataTypes] = useState([{ 
    id: 'temperature',
    deviceId: 'esp32_001',
    active: true 
  }]);
  const [dateRange, setDateRange] = useState('1d');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const addDataType = () => {
    setDataTypes(current => [...current, { 
      id: 'temperature',
      deviceId: 'esp32_001',
      active: true 
    }]);
  };

  const removeDataType = (index) => {
    setDataTypes(current => current.filter((_, i) => i !== index));
  };

  const updateDataType = (index, newType) => {
    console.log('updateDataType called:', { index, newType });
    setDataTypes(current => 
      current.map((type, i) => 
        i === index ? { ...type, id: newType } : type
      )
    );
  };

  const updateDeviceId = (index, deviceId) => {
    console.log('updateDeviceId called:', { index, deviceId });
    setDataTypes(current =>
      current.map((type, i) =>
        i === index ? { ...type, deviceId } : type
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
        console.log('Fetching data with:', { dataTypes, dateRange });
        setIsLoading(true);
        setError(null);
        const { start, end } = getDateRange(dateRange);
        const hours = Math.ceil((end - start) / (1000 * 60 * 60));

        const activeType = dataTypes[0];
        if (!activeType.deviceId || !activeType.id) {
          console.log('Skipping fetch - missing deviceId or type:', activeType);
          setSensorData([]);
          return;
        }

        console.log('Making API call with:', { 
          deviceId: activeType.deviceId, 
          type: activeType.id, 
          hours 
        });

        const response = await sensorApi.getReadingsByDeviceAndType(
          activeType.deviceId,
          activeType.id,
          hours
        );

        const validData = response.data
          .filter(reading => (
            reading &&
            typeof reading.value === 'number' &&
            !isNaN(reading.value) &&
            reading.createdAt
          ))
          .map(reading => ({
            ...reading,
            createdAt: new Date(reading.createdAt),
            value: Number(reading.value)
          }))
          .sort((a, b) => a.createdAt - b.createdAt);

        console.log('Sample transformed data point:', validData[0]);
        console.log('Total valid data points:', validData.length);
        
        setSensorData(validData);
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
    updateDeviceId,
    dateRange,
    setDateRange,
    getDateRange,
    isLoading,
    error
  };
}; 