import { DateRangeSkeleton } from './DateRangeSkeleton';

export const DateRangeSelector = ({ dateRanges, dateRange, onDateRangeChange, isLoading }) => {
  if (isLoading) {
    return <DateRangeSkeleton />;
  }

  return (
    <div className="mt-4 sm:mt-6 rounded-lg sm:rounded-2xl overflow-hidden bg-white dark:bg-gray-800
      shadow-[4px_4px_8px_rgba(0,0,0,0.1),_-4px_-4px_8px_rgba(255,255,255,0.9)]
      dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),_-4px_-4px_8px_rgba(255,255,255,0.05)]"
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2 sm:px-4">
          {dateRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => onDateRangeChange(range.id)}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm font-medium
                transition-all duration-200
                ${dateRange === range.id
                  ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
                shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
                dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]`
              }
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 