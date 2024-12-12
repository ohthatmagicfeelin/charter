import { useState, useEffect } from 'react';
import { subHours, subDays, addDays } from 'date-fns';
import { sensorApi } from '@/api/sensorApi';
import { prepareChartData, getChartOptions } from '@/features/dashboard/services/chartService';
import { useScrollPreservation } from './useScrollPreservation';

export const useDashboard = () => {
  const [sensorData, setSensorData] = useState({});
  const [dataTypes, setDataTypes] = useState([{ 
    id: 'temperature',
    deviceId: 'esp32_002',
    yMin: null,
    yMax: null,
    display: 'raw'
  }]);
  const [dateRange, setDateRange] = useState('1d');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add scroll preservation
  useScrollPreservation([dataTypes, sensorData, dateRange], isLoading);

  const addDataType = () => {
    setDataTypes(current => [...current, { 
      id: 'temperature',
      deviceId: 'esp32_002',
      yMin: null,
      yMax: null,
      active: true 
    }]);
  };

  const removeDataType = (index) => {
    setDataTypes(current => current.filter((_, i) => i !== index));
  };

  const updateDataType = (index, newType) => {
    setDataTypes(current =>
      current.map((dataType, i) =>
        i === index
          ? { ...dataType, id: newType, yMin: null, yMax: null }
          : dataType
      )
    );
  };

  const updateDeviceId = (index, deviceId) => {
    setDataTypes(current =>
      current.map((dataType, i) =>
        i === index
          ? { ...dataType, deviceId, yMin: null, yMax: null }
          : dataType
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

  const updateYAxisRange = (index, type, value) => {
    setDataTypes(current =>
      current.map((dataType, i) =>
        i === index
          ? { ...dataType, [type]: value === '' ? null : Number(value) }
          : dataType
      )
    );
  };

  const getDefaultYAxisRange = (data) => {
    if (!data || data.length === 0) return { min: 0, max: 100 };
    
    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    
    const range = maxValue - minValue;
    const padding = range * 0.1;
    
    return {
      min: Math.floor(minValue - padding),
      max: Math.ceil(maxValue + padding)
    };
  };

  const updateDisplayType = (index, display) => {

    setDataTypes(current =>
      current.map((dataType, i) =>
        i === index ? { ...dataType, display } : dataType
      )
    );
  };

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

              const dataArray = response?.data || [];
              
              // Calculate default range if not manually set
              if (type.yMin === null || type.yMax === null) {
                const { min, max } = getDefaultYAxisRange(dataArray);
                setDataTypes(current =>
                  current.map((t, i) =>
                    t.id === type.id ? { 
                      ...t, 
                      yMin: t.yMin === null ? min : t.yMin,
                      yMax: t.yMax === null ? max : t.yMax
                    } : t
                  )
                );
              }
              
              return { typeId: type.id, data: dataArray };
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
  }, [dataTypes, dateRange]);

  // Prepare chart data
  const chartDataSets = dataTypes.map(type => ({
    type,
    data: prepareChartData(
      type.id,
      sensorData[type.id] || [],
      type.display
    ),
    options: getChartOptions(
      type.id,
      dateRange,
      getDateRange,
      type.yMin,
      type.yMax
    )
  }));

  return {
    chartDataSets,
    dataTypes,
    dateRange,
    isLoading,
    error,
    addDataType,
    removeDataType,
    updateDataType,
    updateDeviceId,
    updateYAxisRange,
    updateDisplayType,
    setDateRange,
  };
}; 