import { subHours, addDays } from 'date-fns';

export const getDateRange = (range) => {
  const now = new Date();
  
  const hoursMap = {
    '1d': 24,
    '3d': 72,
    '7d': 168,
    '30d': 720,
  };

  let start, end;

  if (range === '1d') {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    end = addDays(start, 1);
  } else {
    const hours = hoursMap[range];
    start = subHours(now, hours);
    end = now;
  }

  return { start, end };
}; 