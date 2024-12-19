import { useSensorList } from '@/features/dashboard/hooks/dataSelector/useSensorList';

export const SensorTypeButtons = ({ activeSensor, onSensorChange }) => {
  const { sensors, isLoading, error } = useSensorList();

  if (error) {
    console.error('Error loading sensors:', error);
  }

  return (
    <div className="col-span-12 relative">
      <div className="overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex gap-2 min-w-min">
          {sensors.map((sensor) => (
            <button
              key={sensor.id}
              onClick={() => onSensorChange(sensor.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 
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
