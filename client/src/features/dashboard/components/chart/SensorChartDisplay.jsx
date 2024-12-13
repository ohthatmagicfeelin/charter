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

const SensorChartDisplay = ({ options, data, isLoading }) => {
  console.log('SensorChartDisplay render:', { options, data, isLoading });
  
  if (isLoading) {
    return <p className="text-center">Loading data...</p>;
  }

  return (
    <div className="relative w-full h-72 sm:h-80 md:h-96 lg:h-[32rem] xl:h-[36rem]
      p-0 sm:p-4 rounded-none sm:rounded-xl bg-white dark:bg-gray-800
      shadow-[4px_4px_8px_rgba(0,0,0,0.1),_-4px_-4px_8px_rgba(255,255,255,0.9)]
      dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),_-4px_-4px_4px_rgba(255,255,255,0.05)]"
    >
      <Line options={options} data={data} />
    </div>
  );
};

export default SensorChartDisplay; 