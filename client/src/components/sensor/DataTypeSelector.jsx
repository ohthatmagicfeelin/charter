export const DataTypeSelector = ({ tabs, dataTypes, onAdd, onRemove, onTypeChange }) => {
  return (
    <div className="space-y-4">
      {dataTypes.map((dataType, index) => (
        <div 
          key={index}
          className="relative rounded-lg sm:rounded-2xl overflow-hidden bg-white dark:bg-gray-800
            shadow-[4px_4px_8px_rgba(0,0,0,0.1),_-4px_-4px_8px_rgba(255,255,255,0.9)]
            dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),_-4px_-4px_8px_rgba(255,255,255,0.05)]"
        >
          {dataTypes.length > 1 && (
            <button
              onClick={() => onRemove(index)}
              className="absolute top-2 right-2 p-1.5 rounded-full
                text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400
                bg-gray-100 dark:bg-gray-700/50 
                hover:bg-red-50 dark:hover:bg-red-900/20
                transition-all duration-200
                shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2 sm:px-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTypeChange(index, tab.id)}
                  className={`px-4 py-2.5 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-medium
                    transition-all duration-200 
                    ${dataType.id === tab.id
                      ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }
                    shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
                    dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]`
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button
          onClick={onAdd}
          className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium
            bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200 
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition-all duration-200
            shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 transition-transform group-hover:rotate-90" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
          Add Data Type
        </button>
      </div>
    </div>
  );
}; 