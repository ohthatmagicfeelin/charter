import React, { useLayoutEffect, useRef } from 'react';
import SensorChartDisplay from '@/components/sensor/SensorChartDisplay';
import { DateRangeSelector } from '@/components/sensor/DateRangeSelector';
import { DataTypeSelector } from '@/components/sensor/DataTypeSelector';
import { useSensorCharts } from '@/hooks/useSensorCharts.js';
import { prepareChartData, getChartOptions } from '@/utils/sensor/chartUtils';

const tabs = [
  { id: 'temperature', label: 'Temperature' },
  { id: 'humidity', label: 'Humidity' },
  { id: 'pressure', label: 'Pressure' },
  { id: 'air_quality', label: 'Air Quality' }
];

const dateRanges = [
  { id: '1d', label: '1 Day' },
  { id: '3d', label: '3 Days' },
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' }
];

const Dashboard = () => {
  const {
    sensorData,
    dataTypes,
    addDataType,
    removeDataType,
    updateDataType,
    updateDeviceId,
    dateRange,
    setDateRange,
    getDateRange,
    isLoading
  } = useSensorCharts();

  const scrollPositionRef = useRef(0);
  
  // Disable browser's automatic scroll restoration
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  // Handle scroll position preservation
  useLayoutEffect(() => {
    if (isLoading) return; // Don't restore scroll while loading
    
    scrollPositionRef.current = window.scrollY;
    
    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(() => {
        window.scrollTo(0, scrollPositionRef.current);
      });
      return () => cancelAnimationFrame(frame2);
    });
    return () => cancelAnimationFrame(frame1);
  }, [dataTypes, sensorData, dateRange, isLoading]);

  const chartData = prepareChartData(dataTypes[0].id, sensorData);
  const options = getChartOptions(dataTypes[0].id, dateRange, getDateRange);

  // Add logging
  console.log('Dashboard render:', { dataTypes, dateRange });

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6 sm:py-12">
      <div className="text-center mb-8 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-teal-50 mb-4 sm:mb-6">
          ESP32 Sensor Dashboard
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-teal-200/70 mb-4 sm:mb-8">
          Real-time environmental monitoring data
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="rounded-lg sm:rounded-2xl overflow-hidden bg-white dark:bg-gray-800 
          shadow-[4px_4px_8px_rgba(0,0,0,0.1),_-4px_-4px_8px_rgba(255,255,255,0.9)]
          dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),_-4px_-4px_8px_rgba(255,255,255,0.05)]"
        >
          <SensorChartDisplay options={options} data={chartData} isLoading={isLoading} />
        </div>
        
        <DateRangeSelector
          dateRanges={dateRanges}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
        
        <DataTypeSelector
          tabs={tabs}
          dataTypes={dataTypes}
          onAdd={addDataType}
          onRemove={removeDataType}
          onTypeChange={updateDataType}
          onDeviceChange={updateDeviceId}
        />
      </div>
    </div>
  );
};

export default Dashboard; 