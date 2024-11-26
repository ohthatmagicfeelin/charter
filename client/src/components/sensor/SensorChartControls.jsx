import React from 'react';

const SensorChartControls = ({ 
  tabs,
  dateRanges,
  activeTab, 
  dateRange, 
  onTabChange, 
  onDateRangeChange
}) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium
              transition-all duration-200 flex-1 sm:flex-none min-w-[80px] sm:min-w-0
              ${activeTab === tab.id
                ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white'
                : 'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-teal-200'
              }
              shadow-[2px_2px_4px_rgba(0,0,0,0.1),_-2px_-2px_4px_rgba(255,255,255,0.9)]
              dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3),_-2px_-2px_4px_rgba(255,255,255,0.05)]`
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        {dateRanges.map((range) => (
          <button
            key={range.id}
            onClick={() => onDateRangeChange(range.id)}
            className={`px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium
              transition-all duration-200 flex-1 sm:flex-none min-w-[60px] sm:min-w-0
              ${dateRange === range.id
                ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white'
                : 'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-teal-200'
              }
              shadow-[2px_2px_4px_rgba(0,0,0,0.1),_-2px_-2px_4px_rgba(255,255,255,0.9)]
              dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3),_-2px_-2px_4px_rgba(255,255,255,0.05)]`
            }
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SensorChartControls; 