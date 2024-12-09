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
  Legend
} from 'chart.js';
import { useSensorData } from '@/hooks/useSensorData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Australia/Sydney'
  });
};

const SensorChart = ({ type, hours = 24 }) => {
  const { data, loading, error } = useSensorData(type, hours);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: data.map(d => formatDateTime(d.createdAt)),
    datasets: [
      {
        label: type,
        data: data.map(d => d.value),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: `${type.charAt(0).toUpperCase() + type.slice(1)} Readings`
      }
    }
  };

  return <Line options={options} data={chartData} />;
};

export default SensorChart; 