import { useDeviceSensors } from '@/features/dashboard/hooks/dataSelector/useDeviceSensors';

export const SensorTypeButtons = ({ deviceId, activeSensor, onSensorChange }) => {
  const { sensors, isLoading, error } = useDeviceSensors(deviceId);

  if (isLoading) return <div className="text-sm text-gray-500">Loading sensors...</div>;
  if (error) return <div className="text-sm text-red-500">Error loading sensors</div>;
  if (sensors.length === 0) return <div className="text-sm text-gray-500">No sensors available</div>;

  return (
    <div className="relative">
      <div className="overflow-x-auto -mx-5 sm:mx-0">
        <div className="flex flex-wrap gap-2 px-5 sm:px-0 min-w-min pb-2">
          {sensors.map((sensor) => (
            <button
              key={sensor.id}
              onClick={() => onSensorChange(sensor.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 flex-shrink-0
                ${activeSensor === sensor.id
                  ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
                shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]`
              }
            >
              {sensor.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};