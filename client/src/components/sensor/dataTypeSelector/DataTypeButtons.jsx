import { useTypeList } from '@/hooks/useTypeList';

export const DataTypeButtons = ({ activeId, onTypeChange }) => {
  const { types, isLoading, error } = useTypeList();

  if (error) {
    console.error('Error loading types:', error);
  }

  const handleTypeChange = (typeId) => {
    if (typeId !== activeId) {
      onTypeChange(typeId);
    }
  };

  if (isLoading) {
    return (
      <div className="col-span-9 flex justify-center gap-2">
        <div className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700/50 text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="col-span-9 flex justify-center gap-2">
      {types.map((type) => (
        <button
          key={type.id}
          onClick={() => handleTypeChange(type.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium
            transition-all duration-200 
            ${activeId === type.id
              ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
            shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]`
          }
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}; 