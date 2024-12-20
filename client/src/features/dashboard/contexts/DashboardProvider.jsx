import { DateRangeProvider } from './DateRangeContext.jsx';
import { DataTypesProvider } from './DataTypesContext.jsx';
import { SensorDataProvider } from './SensorDataContext.jsx';

export const DashboardProvider = ({ children }) => {
  return (
    <DateRangeProvider>
      <DataTypesProvider>
        <SensorDataProvider>
          {children}
        </SensorDataProvider>
      </DataTypesProvider>
    </DateRangeProvider>
  );
}; 