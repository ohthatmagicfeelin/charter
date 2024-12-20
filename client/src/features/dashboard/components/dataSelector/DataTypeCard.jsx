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
import { Label } from './Label';
import { ButtonSkeleton } from './skeletons/ButtonSkeleton';
import { SelectSkeleton } from './skeletons/SelectSkeleton';
import { Skeleton } from '../common/Skeleton';
import { useDeviceList } from '../../hooks/dataSelector/useDeviceList';
import { useSensorTypes } from '../../hooks/dataSelector/useSensorTypes';

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
  const { devices, isLoading: isLoadingDevices } = useDeviceList();
  const { types, isLoading: isLoadingTypes } = useSensorTypes(dataType.deviceId, dataType.sensor);
  
  const isLoading = isLoadingDevices || isLoadingTypes;

  return (
    <div className="relative rounded-lg sm:rounded-2xl overflow-hidden bg-white dark:bg-gray-800
      shadow-[4px_4px_8px_rgba(0,0,0,0.2)]
      dark:shadow-[4px_4px_8px_rgba(0,0,0,0.4)]
      hover:shadow-[4px_4px_12px_rgba(0,0,0,0.3)]
      dark:hover:shadow-[4px_4px_12px_rgba(0,0,0,0.5)]
      transition-shadow duration-200"
      style={{
        borderLeft: `4px solid ${theme.line}`
      }}
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ChevronButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            {isLoading ? (
              <Skeleton className="h-5 w-48" />
            ) : (
              <DataTypeTitle 
                deviceId={dataType.deviceId}
                sensor={dataType.sensor}
                dataType={dataType.id}
              />
            )}
          </div>
          {showRemove && <RemoveButton onClick={() => onRemove(index)} />}
        </div>

        {isOpen && (
          <div className="mt-6 space-y-4 sm:space-y-3">
            <div className="sm:grid sm:grid-cols-[140px_1fr] sm:gap-6 sm:items-center pb-3 border-b border-gray-800">
              <Label>Device</Label>
              <div className="mt-2 sm:mt-0">
                {isLoading ? (
                  <SelectSkeleton />
                ) : (
                  <DeviceSelect 
                    deviceId={dataType.deviceId} 
                    onChange={(e) => onDeviceChange(index, e.target.value)} 
                  />
                )}
              </div>
            </div>
            
            <div className="sm:grid sm:grid-cols-[140px_1fr] sm:gap-6 sm:items-center pb-3 border-b border-gray-800">
              <Label>Sensor</Label>
              <div className="mt-2 sm:mt-0">
                {isLoading ? (
                  <ButtonSkeleton count={3} />
                ) : (
                  <SensorTypeButtons
                    deviceId={dataType.deviceId}
                    activeSensor={dataType.sensor}
                    onSensorChange={(sensor) => onSensorChange(index, sensor)}
                  />
                )}
              </div>
            </div>
            
            {(dataType.sensor || isLoading) && (
              <div className="sm:grid sm:grid-cols-[140px_1fr] sm:gap-6 sm:items-center pb-3 border-b border-gray-800">
                <Label>Data Type</Label>
                <div className="mt-2 sm:mt-0">
                  {isLoading ? (
                    <ButtonSkeleton count={4} />
                  ) : (
                    <DataTypeButtons 
                      activeId={dataType.id}
                      deviceId={dataType.deviceId}
                      sensorType={dataType.sensor}
                      onTypeChange={(id) => onTypeChange(index, id)} 
                    />
                  )}
                </div>
              </div>
            )}

            <div className="sm:grid sm:grid-cols-[140px_1fr] sm:gap-6 sm:items-center pb-3 border-b border-gray-800">
              <Label>Display</Label>
              <div className="mt-2 sm:mt-0">
                {isLoading ? (
                  <ButtonSkeleton count={3} />
                ) : (
                  <DataDisplayToggle 
                    display={dataType.display} 
                    onDisplayChange={(display) => onDisplayChange(index, display)}
                  />
                )}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-[140px_1fr] sm:gap-6 sm:items-center pb-3 border-b border-gray-800">
              <Label>Y-Axis Range</Label>
              <div className="mt-2 sm:mt-0">
                {isLoading ? (
                  <div className="grid grid-cols-2 gap-4">
                    <SelectSkeleton />
                    <SelectSkeleton />
                  </div>
                ) : (
                  <YAxisRange 
                    min={dataType.yMin}
                    max={dataType.yMax}
                    onRangeChange={(type, value) => onRangeChange(index, type, value)}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 