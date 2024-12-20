import { useSensorTypes } from '@/features/dashboard/hooks/dataSelector/useSensorTypes';

export const DataTypeButtons = ({ activeId, deviceId, sensorType, onTypeChange }) => {
  const { types, isLoading, error } = useSensorTypes(deviceId, sensorType);

  if (isLoading) return <div className="text-sm text-gray-500">Loading types...</div>;
  if (error) return <div className="text-sm text-red-500">Error loading types</div>;
  if (types.length === 0) return <div className="text-sm text-gray-500">No types available</div>;

  return (
    <div className="relative">
      <div className="overflow-x-auto -mx-5 sm:mx-0">
        <div className="flex flex-wrap gap-2 px-5 sm:px-0 min-w-min pb-2">
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 flex-shrink-0
                ${activeId === type.id
                  ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
                shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
              `}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 