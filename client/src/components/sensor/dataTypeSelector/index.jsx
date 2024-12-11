import { DataTypeCard } from './DataTypeCard';
import { AddButton } from './AddButton';

export const DataTypeSelector = ({ 
  tabs, 
  dataTypes, 
  onAdd, 
  onRemove, 
  onTypeChange, 
  onDeviceChange = () => {}, 
  onRangeChange = () => {},
  onDisplayChange = () => {}
}) => {
  return (
    <div className="space-y-4">
      {dataTypes.map((dataType, index) => (
        <DataTypeCard
          key={index}
          dataType={dataType}
          tabs={tabs}
          index={index}
          showRemove={dataTypes.length > 1}
          onDeviceChange={onDeviceChange}
          onTypeChange={onTypeChange}
          onRangeChange={onRangeChange}
          onDisplayChange={onDisplayChange}
          onRemove={onRemove}
        />
      ))}
      <AddButton onClick={onAdd} />
    </div>
  );
}; 