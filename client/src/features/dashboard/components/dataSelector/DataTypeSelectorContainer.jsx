import { useDataTypesContext } from '../../contexts/DataTypesContext';
import { DataTypeSelector } from './DataTypeSelector';

export const DataTypeSelectorContainer = () => {
  const {
    dataTypes,
    addDataType,
    removeDataType,
    updateSensorType,
    updateDataType,
    updateDeviceId,
    updateYAxisRange,
    updateDisplayType,
    updateChartColor
  } = useDataTypesContext();

  return (
    <DataTypeSelector
      dataTypes={dataTypes}
      onAdd={addDataType}
      onRemove={removeDataType}
      onSensorChange={updateSensorType}
      onTypeChange={updateDataType}
      onDeviceChange={updateDeviceId}
      onRangeChange={updateYAxisRange}
      onDisplayChange={updateDisplayType}
      onColorChange={updateChartColor}
    />
  );
}; 