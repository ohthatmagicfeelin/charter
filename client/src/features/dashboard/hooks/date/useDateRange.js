import { useState } from 'react';

export const useDateRange = () => {
  const [dateRange, setDateRange] = useState('1d');
  
  return { dateRange, setDateRange };
}; 