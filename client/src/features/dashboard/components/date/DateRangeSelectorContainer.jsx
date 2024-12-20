import { useDateRangeContext } from '../../contexts/DateRangeContext';
import { DateRangeSelector } from './DateRangeSelector';

const dateRanges = [
  { id: '1d', label: '1 Day' },
  { id: '3d', label: '3 Days' },
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' }
];

export const DateRangeSelectorContainer = () => {
  const { dateRange, setDateRange } = useDateRangeContext();
  
  return (
    <DateRangeSelector
      dateRanges={dateRanges}
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
    />
  );
}; 