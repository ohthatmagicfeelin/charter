import { DeviceSelect } from './DeviceSelect';
import { DataTypeButtons } from './DataTypeButtons';
import { YAxisRange } from './YAxisRange';
import { RemoveButton } from './RemoveButton';

export const DataTypeCard = ({ 
    dataType, 
    index, 
    showRemove,
    onDeviceChange,
    onTypeChange,
    onRangeChange,
    onRemove 
  }) => {
    console.log('DataTypeCard render:', { dataType, index });
  
    const handleDeviceChange = (deviceId) => {
      console.log('Device change:', { index, deviceId });
      onDeviceChange(index, deviceId);
    };
  
    const handleTypeChange = (typeId) => {
      console.log('Type change:', { index, typeId });
      onTypeChange(index, typeId);
    };
  
    return (
      <div className="relative rounded-lg sm:rounded-2xl overflow-hidden bg-white dark:bg-gray-800
        shadow-[4px_4px_8px_rgba(0,0,0,0.1),_-4px_-4px_8px_rgba(255,255,255,0.9)]
        dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),_-4px_-4px_8px_rgba(255,255,255,0.05)]"
      >
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-12 gap-4 items-center mb-2">
            <DeviceSelect 
              deviceId={dataType.deviceId} 
              onChange={(e) => handleDeviceChange(e.target.value)} 
            />
            <DataTypeButtons 
              activeId={dataType.id} 
              onTypeChange={(id) => handleTypeChange(id)} 
            />
          </div>
          {/* Rest of component */}
        </div>
      </div>
    );
  };