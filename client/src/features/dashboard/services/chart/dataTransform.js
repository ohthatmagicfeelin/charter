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
  console.log('prepareChartData inputs:', { dataTypes, allData });

  if (!dataTypes || dataTypes.length === 0) {
    return {
      labels: [],
      datasets: []
    };
  }

  const datasets = dataTypes.flatMap((type, index) => {
    const data = allData[type.id] || [];
    const display = type.display || 'raw';
    console.log(`Processing type ${type.id}:`, { data, display });
    
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
        pointRadius: 2,
        pointHoverRadius: 5,
        order: 1,
        yAxisID // Add yAxisID to the dataset
      });
    }

    if (display === 'smooth' || display === 'both') {
      const smoothedData = calculateMovingAverage(data, 10);
      datasets.push({
        label: `${formatTypeLabel(type.id)} (Smoothed)`,
        data: smoothedData.map(d => ({
          x: toZonedTime(d.createdAt, 'UTC'),
          y: d.value
        })),
        borderColor: `${theme.line}88`,
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 3,
        borderDash: [],
        order: 0,
        yAxisID // Add yAxisID to the dataset
      });
    }

    console.log(`Datasets for type ${type.id}:`, datasets);
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

  console.log('Final chart data:', result);
  return result;
}; 