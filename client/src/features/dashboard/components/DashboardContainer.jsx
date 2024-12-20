import { DashboardProvider } from '../contexts/DashboardProvider';
import { DashboardDisplay } from './DashboardDisplay';
import { ChartContainer } from './chart/ChartContainer';
import { DateRangeSelectorContainer } from './date/DateRangeSelectorContainer';
import { DataTypeSelectorContainer } from './dataSelector/DataTypeSelectorContainer';

export const DashboardContainer = () => {
  return (
    <DashboardProvider>
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
          <ChartContainer />
          <DateRangeSelectorContainer />
          <DataTypeSelectorContainer />
        </div>
      </div>
    </DashboardProvider>
  );
}; 