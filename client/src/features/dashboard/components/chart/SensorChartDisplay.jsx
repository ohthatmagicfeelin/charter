import React from 'react';
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

export const SensorChartDisplay = ({ options, data, isLoading }) => {
  if (isLoading) {
    return <ChartSkeleton />;
  }

  return (
    <div className="w-full h-[400px] p-4">
      <Line options={options} data={data} />
    </div>
  );
};

export default SensorChartDisplay; 