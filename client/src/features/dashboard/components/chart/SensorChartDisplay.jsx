import React, { memo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ChartSkeleton } from './ChartSkeleton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export const SensorChartDisplay = memo(({ options, data, isLoading }) => {
  if (isLoading) {
    return <ChartSkeleton />;
  }

  return (
    <div className="w-full h-[400px] p-4">
      <Line 
        data={data}
        options={{
          ...options,
          animation: false,
          transitions: {
            active: {
              animation: {
                duration: 0
              }
            }
          }
        }}
      />
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  if (prevProps.isLoading !== nextProps.isLoading) return false;
  if (!prevProps.data || !nextProps.data) return false;
  
  // Deep compare the data structure
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
});

SensorChartDisplay.displayName = 'SensorChartDisplay';

export default SensorChartDisplay; 