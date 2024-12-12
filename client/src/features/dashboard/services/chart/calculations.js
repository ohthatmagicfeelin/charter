export const calculateMovingAverage = (data, window = 5) => {
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

export const getDefaultYAxisRange = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return { min: 0, max: 100 };
  }

  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  
  const padding = (max - min) * 0.1;
  
  return {
    min: Math.floor(min - padding),
    max: Math.ceil(max + padding)
  };
}; 