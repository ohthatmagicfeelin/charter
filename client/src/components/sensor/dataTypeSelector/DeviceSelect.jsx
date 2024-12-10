import { useDeviceList } from '@/hooks/useDeviceList';

export const DeviceSelect = ({ deviceId, onChange }) => {
  const { devices, isLoading, error } = useDeviceList();

  if (error) {
    console.error('Error loading devices:', error);
  }

  return (
    <div className="col-span-3 relative">
      <select
        value={deviceId || ''}
        onChange={onChange}
        disabled={isLoading}
        className="w-full px-4 py-3 rounded-full text-sm font-medium appearance-none
          bg-gray-50/80 dark:bg-gray-700/40 text-gray-700 dark:text-teal-100
          border-0 cursor-pointer
          hover:bg-gray-100/90 dark:hover:bg-gray-700/60
          transition-all duration-300 ease-in-out
          shadow-[0_2px_8px_rgba(0,0,0,0.05)]
          dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)]
          focus:ring-2 focus:ring-teal-400/30 focus:ring-offset-0
          outline-none pr-10
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <option value="">Loading devices...</option>
        ) : error ? (
          <option value="">Error loading devices</option>
        ) : devices.length === 0 ? (
          <option value="">No devices found</option>
        ) : (
          devices.map(device => (
            <option key={device.id} value={device.id}>
              {device.label}
            </option>
          ))
        )}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400 dark:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}; 