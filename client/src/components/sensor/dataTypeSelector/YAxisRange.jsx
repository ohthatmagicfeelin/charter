export const YAxisRange = ({ min, max, onRangeChange }) => {
  return (
    <div className="flex gap-4 mt-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Y-Axis Min
        </label>
        <input
          type="number"
          value={min ?? ''}
          onChange={(e) => onRangeChange('yMin', e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm
            bg-gray-50/80 dark:bg-gray-700/40
            text-gray-700 dark:text-gray-200
            border border-gray-200 dark:border-gray-600
            focus:ring-2 focus:ring-teal-400/30 focus:border-transparent
            outline-none"
          placeholder="Auto"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Y-Axis Max
        </label>
        <input
          type="number"
          value={max ?? ''}
          onChange={(e) => onRangeChange('yMax', e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm
            bg-gray-50/80 dark:bg-gray-700/40
            text-gray-700 dark:text-gray-200
            border border-gray-200 dark:border-gray-600
            focus:ring-2 focus:ring-teal-400/30 focus:border-transparent
            outline-none"
          placeholder="Auto"
        />
      </div>
    </div>
  );
}; 