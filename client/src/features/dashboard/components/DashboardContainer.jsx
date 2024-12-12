import React from 'react';
import { DashboardDisplay } from './DashboardDisplay';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';

const dateRanges = [
  { id: '1d', label: '1 Day' },
  { id: '3d', label: '3 Days' },
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' }
];

export const DashboardContainer = () => {
  const {
    chartDataSets,
    dateRange,
    dataTypes,
    isLoading,
    addDataType,
    removeDataType,
    updateDataType,
    updateDeviceId,
    updateYAxisRange,
    updateDisplayType,
    setDateRange,
  } = useDashboard();

  return (
    <DashboardDisplay
      chartDataSets={chartDataSets}
      dateRanges={dateRanges}
      dateRange={dateRange}
      dataTypes={dataTypes}
      isLoading={isLoading}
      onDateRangeChange={setDateRange}
      onAddDataType={addDataType}
      onRemoveDataType={removeDataType}
      onTypeChange={updateDataType}
      onDeviceChange={updateDeviceId}
      onRangeChange={updateYAxisRange}
      onDisplayChange={updateDisplayType}
    />
  );
}; 