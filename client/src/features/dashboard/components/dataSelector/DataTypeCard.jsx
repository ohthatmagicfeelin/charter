import { DeviceSelect } from './DeviceSelect';
import { DataTypeButtons } from './DataTypeButtons';
import { YAxisRange } from './YAxisRange';
import { DataDisplayToggle } from './DataDisplayToggle';
import { RemoveButton } from './RemoveButton';
import { getTypeTheme } from '@/features/dashboard/services/chart/chartTheme';

export const DataTypeCard = ({ 
  dataType, 
  index, 
  showRemove,
  onDeviceChange,
  onTypeChange,
  onRangeChange,
  onDisplayChange,
  onRemove 
}) => {
  const theme = getTypeTheme(dataType.id);
  
  return (
    <div className="relative rounded-lg sm:rounded-2xl overflow-hidden bg-white dark:bg-gray-800
      shadow-[4px_4px_8px_rgba(0,0,0,0.1),_-4px_-4px_8px_rgba(255,255,255,0.9)]
      dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),_-4px_-4px_8px_rgba(255,255,255,0.05)]"
      style={{
        borderLeft: `4px solid ${theme.line}`
      }}
    >
      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          <DeviceSelect 
            deviceId={dataType.deviceId} 
            onChange={(e) => onDeviceChange(index, e.target.value)} 
          />
          <DataTypeButtons 
            activeId={dataType.id} 
            onTypeChange={(id) => onTypeChange(index, id)} 
          />
        </div>

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

      {showRemove && (
        <RemoveButton onClick={() => onRemove(index)} />
      )}
    </div>
  );
}; 