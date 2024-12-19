import { useDeviceList } from '@/features/dashboard/hooks/dataSelector/useDeviceList';

export const DataTypeTitle = ({ deviceId, sensor, dataType }) => {
  const { devices } = useDeviceList();
  
  const deviceLabel = devices.find(d => d.id === deviceId)?.label || 'Unknown Device';
  const sensorLabel = sensor ? sensor
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') : '';
  const typeLabel = dataType ? dataType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') : '';

  return (
    <div className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-gray-300">
      <span>{deviceLabel}</span>
      {sensorLabel && (
        <>
          <span className="text-gray-400 dark:text-gray-500">•</span>
          <span>{sensorLabel}</span>
        </>
      )}
      {typeLabel && (
        <>
          <span className="text-gray-400 dark:text-gray-500">•</span>
          <span>{typeLabel}</span>
        </>
      )}
    </div>
  );
}; 