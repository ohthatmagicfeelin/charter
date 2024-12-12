import { format, toZonedTime } from 'date-fns-tz';

const chartTheme = {
  temperature: {
    gradient: {
      start: 'rgba(255, 182, 85, 0.8)',    // Warm orange
      end: 'rgba(255, 99, 132, 0.2)'       // Soft pink
    },
    line: 'rgb(255, 99, 132)'
  },
  humidity: {
    gradient: {
      start: 'rgba(53, 162, 235, 0.8)',    // Deep blue
      end: 'rgba(53, 162, 235, 0.1)'       // Light blue
    },
    line: 'rgb(53, 162, 235)'
  },
  pressure: {
    gradient: {
      start: 'rgba(75, 192, 192, 0.8)',    // Teal
      end: 'rgba(75, 192, 192, 0.1)'       // Light teal
    },
    line: 'rgb(75, 192, 192)'
  },
  air_quality: {
    gradient: {
      start: 'rgba(153, 102, 255, 0.8)',   // Purple
      end: 'rgba(153, 102, 255, 0.1)'      // Light purple
    },
    line: 'rgb(153, 102, 255)'
  },
  // Default theme for unknown types
  default: {
    gradient: {
      start: 'rgba(156, 163, 175, 0.8)',   // Gray
      end: 'rgba(156, 163, 175, 0.1)'      // Light gray
    },
    line: 'rgb(156, 163, 175)'
  }
};

const calculateMovingAverage = (data, window = 5) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    const start = Math.max(0, i - Math.floor(window / 2));
    const end = Math.min(data.length, i + Math.floor(window / 2) + 1);
    const values = data.slice(start, end).map(d => d.value);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    result.push({
      createdAt: data[i].createdAt,
      value: avg
    });
  }
  return result;
};

const getTypeTheme = (type) => {
  return chartTheme[type] || chartTheme.default;
};

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

  // Add raw data FIRST (so it's underneath)
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
      order: 1  // Lower order means drawn first
    });
  }

  // Add smoothed data LAST (so it's on top)
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
      order: 0,  // Higher order means drawn last
      zIndex: 2
    });
  }

  return {
    labels: safeData.map(d => formatDateTime(d.createdAt)),
    datasets
  };
};

export const getChartOptions = (type, dateRange, getDateRange, yMin, yMax) => {
  const { start, end } = getDateRange(dateRange);

  let timeUnit = 'hour';
  let maxTicksLimit = 12;

  switch(dateRange) {
    case '3d':
      timeUnit = 'day';
      maxTicksLimit = 3;
      break;
    case '7d':
      timeUnit = 'day';
      maxTicksLimit = 7;
      break;
    case '30d':
      timeUnit = 'week';
      maxTicksLimit = 4;
      break;
    default: // '1d'
      timeUnit = 'hour';
      maxTicksLimit = 12;
  }

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        type: 'time',
        grid: {
          display: false
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit
        },
        min: start,
        max: end
      },
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        min: yMin ?? 0,  // Default to 0 if null
        max: yMax ?? 100 // Default to 100 if null
      }
    }
  };
}; 
