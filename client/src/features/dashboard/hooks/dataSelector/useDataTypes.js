import { useState, useCallback } from 'react';

export const useDataTypes = () => {
  const [dataTypes, setDataTypes] = useState([{ 
    id: 'temperature',
    deviceId: 'Kitchen',
    sensor: 'bme680',
    yMin: null,
    yMax: null,
    display: 'raw',
    color: null
  }]);

  const addDataType = () => {
    setDataTypes(current => [...current, { 
      id: 'temperature',
      deviceId: 'DiningRoom',
      sensor: 'soil_moisture',
      yMin: null,
      yMax: null,
      display: 'raw',
      color: null
    }]);
  };

  const removeDataType = (index) => {
    setDataTypes(current => current.filter((_, i) => i !== index));
  };

  const updateSensorType = (index, sensor) => {
    setDataTypes(current =>
      current.map((dataType, i) =>
        i === index
          ? { ...dataType, sensor, id: null, yMin: null, yMax: null }
          : dataType
      )
    );
  };

  const updateDataType = (index, newType) => {
    setDataTypes(current =>
      current.map((dataType, i) =>
        i === index
          ? { ...dataType, id: newType, yMin: null, yMax: null }
          : dataType
      )
    );
  };

  const updateDeviceId = (index, deviceId) => {
    setDataTypes(current =>
      current.map((dataType, i) =>
        i === index
          ? { ...dataType, deviceId, yMin: null, yMax: null }
          : dataType
      )
    );
  };

  const updateYAxisRange = (index, type, value) => {
    setDataTypes(current =>
      current.map((dataType, i) =>
        i === index
          ? { ...dataType, [type]: value === '' ? null : Number(value) }
          : dataType
      )
    );
  };

  const updateAutoYAxisRange = useCallback((typeId, min, max) => {
    setDataTypes(current =>
      current.map(dataType =>
        dataType.id === typeId ? {
          ...dataType,
          yMin: dataType.yMin === null ? min : dataType.yMin,
          yMax: dataType.yMax === null ? max : dataType.yMax
        } : dataType
      )
    );
  }, []);

  const updateDisplayType = (index, display) => {
    setDataTypes(current =>
      current.map((dataType, i) =>
        i === index ? { ...dataType, display } : dataType
      )
    );
  };

  const updateChartColor = (index, color) => {
    setDataTypes(current =>
      current.map((dataType, i) =>
        i === index ? { ...dataType, color } : dataType
      )
    );
  };

  return {
    dataTypes,
    addDataType,
    removeDataType,
    updateSensorType,
    updateDataType,
    updateDeviceId,
    updateYAxisRange,
    updateAutoYAxisRange,
    updateDisplayType,
    updateChartColor
  };
}; 