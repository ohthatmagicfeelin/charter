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
  }
};

const calculateMovingAverage = (data, windowSize = 5) => {
  return data.map((point, index, array) => {
    const start = Math.max(0, index - Math.floor(windowSize / 2));
    const end = Math.min(array.length, index + Math.floor(windowSize / 2) + 1);
    const window = array.slice(start, end);
    
    const validValues = window
      .map(p => parseFloat(p.y))
      .filter(y => !isNaN(y));
    
    if (validValues.length === 0) return { x: point.x, y: null };
    
    const average = validValues.reduce((acc, curr) => acc + curr, 0) / validValues.length;
    return {
      x: point.x,
      y: Number(average.toFixed(2))
    };
  }).filter(point => point.y !== null);
};

export const prepareChartData = (type, data) => {
  if (!data || data.length === 0) {
    return {
      labels: [],
      datasets: []
    };
  }

  return {
    labels: data.map(d => toZonedTime(d.createdAt, 'UTC').toLocaleString('en-AU', {
      hour: '2-digit',
      minute: '2-digit', 
      hour12: false,
      timeZone: 'Australia/Sydney'
    })),
    datasets: [
      {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        data: data.map(d => ({
          x: toZonedTime(d.createdAt, 'UTC'),
          y: d.value
        })),
        borderColor: chartTheme[type].line,
        backgroundColor: chartTheme[type].gradient.start,
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5
      }
    ]
  };
};

export const getChartOptions = (type, dateRange, getDateRange) => {
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
        }
      }
    }
  };
}; 
