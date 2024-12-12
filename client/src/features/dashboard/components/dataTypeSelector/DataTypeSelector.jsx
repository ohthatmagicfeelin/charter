import { DataTypeCard } from './DataTypeCard';
import { AddButton } from './AddButton';

export const DataTypeSelector = ({     
  dataTypes, 
  onAdd, 
  onRemove, 
  onTypeChange, 
  onDeviceChange,
  onRangeChange,
  onDisplayChange 
}) => {

  return (
    <div className="space-y-4">
      {dataTypes.map((dataType, index) => {

        return (
          <DataTypeCard
            key={index}
            dataType={dataType}
            index={index}
            showRemove={dataTypes.length > 1}
            onDeviceChange={onDeviceChange}
            onTypeChange={onTypeChange}
            onRangeChange={onRangeChange}
            onDisplayChange={onDisplayChange}
            onRemove={onRemove}
          />
        );
      })}
      
      <AddButton onClick={onAdd} />
    </div>
  );
}; 