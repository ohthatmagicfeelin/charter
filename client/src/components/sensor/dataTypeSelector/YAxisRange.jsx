export const YAxisRange = ({ min, max, onRangeChange }) => (
  <div className="grid grid-cols-12 gap-4 items-center mt-4">
    <div className="col-span-3">
      <div className="px-4">
        <span className="text-sm font-medium text-gray-500 dark:text-teal-100/70">
          Y-Axis Range:
        </span>
      </div>
    </div>

    <div className="col-span-9 flex justify-center items-center gap-3">
      <input
        type="number"
        placeholder="Min"
        value={min || ''}
        onChange={(e) => onRangeChange('min', e.target.value)}
        className="w-28 px-4 py-3 rounded-full text-sm font-medium
          bg-gray-50/80 dark:bg-gray-700/40 text-gray-700 dark:text-teal-100
          border-0
          hover:bg-gray-100/90 dark:hover:bg-gray-700/60
          transition-all duration-300 ease-in-out
          shadow-[0_2px_8px_rgba(0,0,0,0.05)]
          dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]
          focus:ring-2 focus:ring-teal-400/30 focus:ring-offset-0
          outline-none"
      />
      <span className="text-gray-400 dark:text-gray-500">to</span>
      <input
        type="number"
        placeholder="Max"
        value={max || ''}
        onChange={(e) => onRangeChange('max', e.target.value)}
        className="w-28 px-4 py-3 rounded-full text-sm font-medium
          bg-gray-50/80 dark:bg-gray-700/40 text-gray-700 dark:text-teal-100
          border-0
          hover:bg-gray-100/90 dark:hover:bg-gray-700/60
          transition-all duration-300 ease-in-out
          shadow-[0_2px_8px_rgba(0,0,0,0.05)]
          dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]
          focus:ring-2 focus:ring-teal-400/30 focus:ring-offset-0
          outline-none"
      />
    </div>
  </div>
); 