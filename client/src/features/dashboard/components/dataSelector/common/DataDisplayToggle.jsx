export const DataDisplayToggle = ({ display = 'raw', onDisplayChange }) => {
  return (
    <div className="relative">
      <div className="overflow-x-auto -mx-5 sm:mx-0">
        <div className="flex flex-wrap gap-2 px-5 sm:px-0 min-w-min pb-2">
          <button
            onClick={() => onDisplayChange?.('raw')}
            className={`px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200 flex-shrink-0
              ${display === 'raw'
                ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
              shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
              dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]`
            }
          >
            Raw Data
          </button>
          <button
            onClick={() => onDisplayChange?.('smooth')}
            className={`px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200 flex-shrink-0
              ${display === 'smooth'
                ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
              shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
              dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]`
            }
          >
            Smoothed
          </button>
          <button
            onClick={() => onDisplayChange?.('both')}
            className={`px-4 py-2 rounded-full text-sm font-medium
              transition-all duration-200 flex-shrink-0
              ${display === 'both'
                ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
              shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
              dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]`
            }
          >
            Both
          </button>
        </div>
      </div>
    </div>
  );
}; 