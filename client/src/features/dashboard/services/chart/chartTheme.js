export const chartTheme = {
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
  default: {
    gradient: {
      start: 'rgba(156, 163, 175, 0.8)',   // Gray
      end: 'rgba(156, 163, 175, 0.1)'      // Light gray
    },
    line: 'rgb(156, 163, 175)'
  }
};

export const getTypeTheme = (type) => {
  return chartTheme[type] || chartTheme.default;
}; 