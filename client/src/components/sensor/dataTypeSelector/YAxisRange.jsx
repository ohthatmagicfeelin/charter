export const YAxisRange = ({ min, max, onRangeChange }) => (
  <div className="grid grid-cols-12 gap-4 items-center">
    <div className="col-span-3">
      <span className="text-sm font-medium text-gray-600 dark:text-teal-200/70">
        Y-Axis Range:
      </span>
    </div>

    <div className="col-span-9 flex items-center gap-2">
      <input
        type="number"
        placeholder="Min"
        value={min || ''}
        onChange={(e) => onRangeChange('min', e.target.value)}
        className="w-24 px-3 py-2 rounded-full text-sm font-medium
          bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200
          border-0
          hover:bg-gray-200 dark:hover:bg-gray-700
          transition-all duration-200
          shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
          focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
          outline-none"
      />
      <span className="text-gray-400 dark:text-gray-500 px-2">to</span>
      <input
        type="number"
        placeholder="Max"
        value={max || ''}
        onChange={(e) => onRangeChange('max', e.target.value)}
        className="w-24 px-3 py-2 rounded-full text-sm font-medium
          bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200
          border-0
          hover:bg-gray-200 dark:hover:bg-gray-700
          transition-all duration-200
          shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
          focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
          outline-none"
      />
    </div>
  </div>
); 