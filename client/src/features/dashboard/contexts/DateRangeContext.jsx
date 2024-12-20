import { createContext, useContext } from 'react';
import { useDateRange } from '../hooks/date/useDateRange';

const DateRangeContext = createContext(null);

export const DateRangeProvider = ({ children }) => {
  const dateRangeHook = useDateRange();
  
  return (
    <DateRangeContext.Provider value={dateRangeHook}>
      {children}
    </DateRangeContext.Provider>
  );
};

export const useDateRangeContext = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error('useDateRangeContext must be used within a DateRangeProvider');
  }
  return context;
}; 