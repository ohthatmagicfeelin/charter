import React from 'react';
import SensorChartDisplay from '@/features/dashboard/components/chart/SensorChartDisplay';
import { DateRangeSelector } from '@/features/dashboard/components/date/DateRangeSelector.jsx';
import { DataTypeSelector } from '@/features/dashboard/components/dataSelector/DataTypeSelector';

export const DashboardDisplay = ({
  chartDataSets,
  dateRanges,
  dateRange,
  dataTypes,
  isLoading,
  onDateRangeChange,
  onAddDataType,
  onRemoveDataType,
  onSensorChange,
  onTypeChange,
  onDeviceChange,
  onRangeChange,
  onDisplayChange
}) => {
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
          <SensorChartDisplay 
            options={chartDataSets[0].options} 
            data={chartDataSets[0].data} 
            isLoading={isLoading} 
          />
        </div>
        
        <DateRangeSelector
          dateRanges={dateRanges}
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
          isLoading={isLoading}
        />
        
        <DataTypeSelector
          dataTypes={dataTypes}
          isLoading={isLoading}
          onAdd={onAddDataType}
          onRemove={onRemoveDataType}
          onSensorChange={onSensorChange}
          onTypeChange={onTypeChange}
          onDeviceChange={onDeviceChange}
          onRangeChange={onRangeChange}
          onDisplayChange={onDisplayChange}
        />
      </div>
    </div>
  );
}; 