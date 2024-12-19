import { useState } from 'react';
import { DeviceSelect } from './DeviceSelect';
import { DataTypeButtons } from './DataTypeButtons';
import { YAxisRange } from './YAxisRange';
import { DataDisplayToggle } from './DataDisplayToggle';
import { RemoveButton } from './RemoveButton';
import { getTypeTheme } from '@/features/dashboard/services/chart/chartTheme';
import { SensorTypeButtons } from './SensorTypeButtons';
import { DataTypeTitle } from './DataTypeTitle';
import { ChevronButton } from './ChevronButton';

export const DataTypeCard = ({ 
  dataType, 
  index,
  showRemove,
  onDeviceChange,
  onSensorChange,
  onTypeChange,
  onRangeChange,
  onDisplayChange,
  onRemove 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = getTypeTheme(dataType.id);

  return (
    <div className="relative rounded-lg sm:rounded-2xl overflow-hidden bg-white dark:bg-gray-800
      shadow-[4px_4px_8px_rgba(0,0,0,0.1),_-4px_-4px_8px_rgba(255,255,255,0.9)]
      dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),_-4px_-4px_8px_rgba(255,255,255,0.05)]"
      style={{
        borderLeft: `4px solid ${theme.line}`
      }}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center space-x-3">
          <ChevronButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
          <div className="flex-grow">
            <DataTypeTitle 
              deviceId={dataType.deviceId}
              sensor={dataType.sensor}
              dataType={dataType.id}
            />
          </div>
        </div>

        {isOpen && (
          <div className="mt-4 space-y-4">
            <DeviceSelect 
              deviceId={dataType.deviceId} 
              onChange={(e) => onDeviceChange(index, e.target.value)} 
            />
            
            <SensorTypeButtons
              deviceId={dataType.deviceId}
              activeSensor={dataType.sensor}
              onSensorChange={(sensor) => onSensorChange(index, sensor)}
            />
            
            {dataType.sensor && (
              <DataTypeButtons 
                activeId={dataType.id}
                deviceId={dataType.deviceId}
                sensorType={dataType.sensor}
                onTypeChange={(id) => onTypeChange(index, id)} 
              />
            )}

            <div className="space-y-4">
              <DataDisplayToggle 
                display={dataType.display} 
                onDisplayChange={(display) => {
                  onDisplayChange(index, display);
                }}
              />
              <YAxisRange 
                min={dataType.yMin}
                max={dataType.yMax}
                onRangeChange={(type, value) => onRangeChange(index, type, value)}
              />
            </div>
          </div>
        )}
      </div>

      {showRemove && (
        <RemoveButton onClick={() => onRemove(index)} />
      )}
    </div>
  );
}; 