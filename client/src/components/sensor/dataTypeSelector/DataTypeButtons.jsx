import { useTypeList } from '@/hooks/useTypeList';

export const DataTypeButtons = ({ activeId, onTypeChange }) => {
  const { types, isLoading, error } = useTypeList();

  if (error) {
    console.error('Error loading types:', error);
  }

  return (
    <div className="col-span-9 relative">
      <div className="overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex gap-2 min-w-min">
          {types.map((type) => (
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
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-gray-800 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-800 to-transparent pointer-events-none" />
    </div>
  );
}; 