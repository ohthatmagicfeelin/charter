import { DataTypeCard } from './DataTypeCard';
import { AddButton } from './common/AddButton';

export const DataTypeSelector = ({     
  dataTypes, 
  isLoading,
  onAdd, 
  onRemove, 
  onSensorChange,
  onTypeChange, 
  onDeviceChange,
  onRangeChange,
  onDisplayChange,
  onColorChange
}) => {
  return (
    <div className="space-y-4">
      {dataTypes.map((dataType, index) => (
        <DataTypeCard
          key={index}
          dataType={dataType}
          index={index}
          showRemove={dataTypes.length > 1}
          onDeviceChange={onDeviceChange}
          onSensorChange={onSensorChange}
          onTypeChange={onTypeChange}
          onRangeChange={onRangeChange}
          onDisplayChange={onDisplayChange}
          onColorChange={onColorChange}
          onRemove={onRemove}
          isLoading={isLoading}
        />
      ))}
      <AddButton onClick={onAdd} />
    </div>
  );
}; 