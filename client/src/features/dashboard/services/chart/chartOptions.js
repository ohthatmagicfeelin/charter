const getAxisTitle = (typeId) => {
  const titles = {
    temperature: 'Temperature (°C)',
    humidity: 'Humidity (%)',
    pressure: 'Pressure (hPa)',
    air_quality: 'Air Quality (PPM)',
    default: 'Value'
  };
  return titles[typeId] || titles.default;
};

export const getChartOptions = (dataTypes, dateRange, getDateRange) => {
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

  const yAxes = dataTypes.reduce((acc, typeId, index) => {
    acc[`y${index}`] = {
      type: 'linear',
      display: true,
      position: index === 0 ? 'left' : 'right',
      grid: {
        drawOnChartArea: index === 0 // only show grid for first axis
      },
      title: {
        display: true,
        text: getAxisTitle(typeId)
      }
    };
    return acc;
  }, {});

  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
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
      ...yAxes
    }
  };
}; 