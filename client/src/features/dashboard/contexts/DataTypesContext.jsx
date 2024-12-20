import { createContext, useContext } from 'react';
import { useDataTypes } from '../hooks/dataSelector/useDataTypes';

const DataTypesContext = createContext(null);

export const DataTypesProvider = ({ children }) => {
  const dataTypesHook = useDataTypes();
  
  return (
    <DataTypesContext.Provider value={dataTypesHook}>
      {children}
    </DataTypesContext.Provider>
  );
};

export const useDataTypesContext = () => {
  const context = useContext(DataTypesContext);
  if (!context) {
    throw new Error('useDataTypesContext must be used within a DataTypesProvider');
  }
  return context;
}; 