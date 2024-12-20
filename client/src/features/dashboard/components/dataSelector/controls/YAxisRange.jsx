export const YAxisRange = ({ min, max, onRangeChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      <div className="flex-1 min-w-[120px]">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 px-1">
          Y-Axis Min
        </label>
        <input
          type="number"
          value={min ?? ''}
          onChange={(e) => onRangeChange('yMin', e.target.value)}
          className="w-full px-4 py-2.5 rounded-full text-sm font-medium
            transition-all duration-200
            bg-gray-100 dark:bg-gray-700/50
            text-gray-700 dark:text-teal-200
            placeholder-gray-400 dark:placeholder-gray-500
            shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
            hover:bg-gray-200 dark:hover:bg-gray-700
            focus:ring-2 focus:ring-teal-400/30 focus:outline-none"
          placeholder="Auto"
        />
      </div>
      <div className="flex-1 min-w-[120px]">
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 px-1">
          Y-Axis Max
        </label>
        <input
          type="number"
          value={max ?? ''}
          onChange={(e) => onRangeChange('yMax', e.target.value)}
          className="w-full px-4 py-2.5 rounded-full text-sm font-medium
            transition-all duration-200
            bg-gray-100 dark:bg-gray-700/50
            text-gray-700 dark:text-teal-200
            placeholder-gray-400 dark:placeholder-gray-500
            shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
            dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
            hover:bg-gray-200 dark:hover:bg-gray-700
            focus:ring-2 focus:ring-teal-400/30 focus:outline-none"
          placeholder="Auto"
        />
      </div>
    </div>
  );
}; 