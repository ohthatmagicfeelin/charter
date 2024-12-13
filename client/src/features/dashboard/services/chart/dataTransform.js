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

export const prepareChartData = (dataTypes, allData) => {

  if (!dataTypes || dataTypes.length === 0) {
    return {
      labels: [],
      datasets: []
    };
  }

  const datasets = dataTypes.flatMap((type, index) => {
    const data = allData[type.id] || [];
    const display = type.display || 'raw';
    
    const theme = getTypeTheme(type.id);
    const datasets = [];

    // Use different y-axis for each data type
    const yAxisID = `y${index}`;

    if (display === 'raw' || display === 'both') {
      datasets.push({
        label: `${formatTypeLabel(type.id)} (Raw)`,
        data: data.map(d => ({
          x: toZonedTime(d.createdAt, 'UTC'),
          y: d.value
        })),
        borderColor: theme.line,
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 3,
        order: 1,
        yAxisID // Add yAxisID to the dataset
      });
    }

    if (display === 'smooth' || display === 'both') {
      // Convert the RGB color to RGBA with 0.4 opacity
      const smoothedColor = theme.line.replace('rgb', 'rgba').replace(')', ', 0.4)');
      
      datasets.push({
        label: `${formatTypeLabel(type.id)} (Smoothed)`,
        data: calculateMovingAverage(data, 10).map(d => ({
          x: toZonedTime(d.createdAt, 'UTC'),
          y: d.value
        })),
        borderColor: smoothedColor,
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 3,
        borderDash: [],
        order: 0,
        yAxisID // Add yAxisID to the dataset
      });
    }

    return datasets;
  });

  const result = {
    labels: [...new Set(
      Object.values(allData)
        .flat()
        .map(d => formatDateTime(d.createdAt))
    )].sort(),
    datasets
  };

  return result;
}; 