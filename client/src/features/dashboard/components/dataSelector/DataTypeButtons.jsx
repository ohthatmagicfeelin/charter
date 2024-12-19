import { useTypeList } from '@/features/dashboard/hooks/dataSelector/useTypeList';

export const DataTypeButtons = ({ activeId, sensorType, onTypeChange }) => {
  const { types, isLoading, error } = useTypeList();

  const filteredTypes = types.filter(type => {
    // Only show types that belong to the selected sensor
    return type.id.startsWith(sensorType + '_');
  });

  if (error) {
    console.error('Error loading types:', error);
  }

  return (
    <div className="col-span-12 relative">
      <div className="overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex gap-2 min-w-min">
          {filteredTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className={`
                whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 
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