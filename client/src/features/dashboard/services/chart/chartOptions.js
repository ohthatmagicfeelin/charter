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
        min: yMin ?? 0,
        max: yMax ?? 100
      }
    }
  };
}; 