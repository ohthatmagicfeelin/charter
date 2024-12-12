import { toZonedTime } from 'date-fns-tz';
import { calculateMovingAverage } from './calculations';
import { getTypeTheme } from './chartTheme';

const formatTypeLabel = (type) => {
  return type
    ? type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Unknown Type';
};

const formatDateTime = (dateTime) => {
  return toZonedTime(dateTime, 'UTC').toLocaleString('en-AU', {
    hour: '2-digit',
    minute: '2-digit', 
    hour12: false,
    timeZone: 'Australia/Sydney'
  });
};

export const prepareChartData = (type, data, displayType = 'raw') => {
  const safeData = Array.isArray(data) ? data : [];
  
  if (!type || safeData.length === 0) {
    return {
      labels: [],
      datasets: [{
        label: type ? formatTypeLabel(type) : 'No Data',
        data: [],
        borderColor: getTypeTheme(type).line,
        backgroundColor: getTypeTheme(type).gradient.start,
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5
      }]
    };
  }

  const theme = getTypeTheme(type);
  const datasets = [];

  if (displayType === 'raw' || displayType === 'both') {
    datasets.push({
      label: `${formatTypeLabel(type)} (Raw)`,
      data: safeData.map(d => ({
        x: toZonedTime(d.createdAt, 'UTC'),
        y: d.value
      })),
      borderColor: theme.line,
      backgroundColor: theme.gradient.start,
      fill: displayType === 'raw',
      tension: 0.4,
      pointRadius: 2,
      pointHoverRadius: 5,
      order: 1
    });
  }

  if (displayType === 'smooth' || displayType === 'both') {
    const smoothedData = calculateMovingAverage(safeData, 10);
    datasets.push({
      label: `${formatTypeLabel(type)} (Smoothed)`,
      data: smoothedData.map(d => ({
        x: toZonedTime(d.createdAt, 'UTC'),
        y: d.value
      })),
      borderColor: '#FF6B6B',
      backgroundColor: 'transparent',
      fill: false,
      tension: 0.4,
      pointRadius: 0,
      borderWidth: 3,
      borderDash: [],
      order: 0,
      zIndex: 2
    });
  }

  return {
    labels: safeData.map(d => formatDateTime(d.createdAt)),
    datasets
  };
}; 