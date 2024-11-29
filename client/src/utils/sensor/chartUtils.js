import { enUS } from 'date-fns/locale';

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

export const prepareChartData = (dataType, sensorData) => {

  const createGradient = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, chartTheme[dataType].gradient.start);
    gradient.addColorStop(1, chartTheme[dataType].gradient.end);
    return gradient;
  };

  const baseDataset = {
    borderWidth: 2,
    tension: 0.4,
    fill: true,
    pointRadius: 0,
    pointHoverRadius: 6,
    borderColor: chartTheme[dataType].line,
  };

  const filteredData = sensorData
    .filter(reading => reading.type === dataType)
    .map(reading => ({
      x: new Date(reading.createdAt),
      y: parseFloat(reading.value)
    }))
    .sort((a, b) => a.x - b.x);

  const smoothedData = calculateMovingAverage(filteredData, 7);

  return {
    datasets: [{
      ...baseDataset,
      label: getDataLabel(dataType),
      data: smoothedData,
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        return createGradient(ctx);
      },
    }],
  };
};

export const getChartOptions = (dataType, dateRange, getDateRange) => {
  const { start, end } = getDateRange(dateRange);
  const isMobile = window.innerWidth < 480;
  
  const getTimeConfig = () => {
    if (dateRange === '1d') {
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
      
      return {
        min: startOfDay.toISOString(),
        max: endOfDay.toISOString(),
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm'
          },
          stepSize: 3,
        }
      };
    }

    return {
      min: start.toISOString(),
      max: end.toISOString(),
      time: {
        unit: 'day',
        displayFormats: {
          day: 'MMM d'
        },
      }
    };
  };

  const timeConfig = getTimeConfig();

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1a202c',
        bodyColor: '#4a5568',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          size: 14
        },
        position: 'nearest',
        yAlign: 'top',
        xAlign: 'center',
        caretSize: 8,
        caretPadding: 10,
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y.toFixed(1);
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        ...timeConfig,
        adapters: {
          date: {
            locale: enUS,
          },
        },
        grid: {
          display: false
        },
        ticks: {
          maxRotation: isMobile ? 0 : 45,
          autoSkipPadding: isMobile ? 4 : 8,
          padding: isMobile ? 4 : 8,
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          padding: isMobile ? 4 : 8,
          font: {
            size: isMobile ? 10 : 12
          }
        },
        title: {
          display: !isMobile,
          text: getYAxisLabel(dataType),
          padding: { bottom: 10, top: 10 },
          font: {
            size: 13,
            weight: 'normal'
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };
};

const getDataLabel = (dataType) => {
  switch (dataType) {
    case 'temperature':
      return 'Temperature (°C)';
    case 'humidity':
      return 'Humidity (%)';
    case 'pressure':
      return 'Pressure (hPa)';
    case 'air_quality':
      return 'Air Quality (AQI)';
    default:
      return '';
  }
};

const getYAxisLabel = (dataType) => {
  switch (dataType) {
    case 'temperature':
      return '°C';
    case 'humidity':
      return '%';
    case 'pressure':
      return 'hPa';
    case 'air_quality':
      return 'AQI';
    default:
      return '';
  }
}; 
