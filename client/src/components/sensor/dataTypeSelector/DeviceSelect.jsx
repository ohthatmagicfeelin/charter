const mockDevices = [
  { id: 'esp32_001', label: 'Living Room' },
  { id: 'esp32_002', label: 'Garden' },
  { id: 'esp32_003', label: 'Balcony' },
];

export const DeviceSelect = ({ deviceId, onChange }) => (
  <div className="col-span-3">
    <select
      value={deviceId || 'esp32_002'}
      onChange={onChange}
      className="w-full px-3 py-2 rounded-full text-sm font-medium
        bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200
        border-0 cursor-pointer
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-all duration-200
        shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
        dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]
        focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50
        outline-none"
    >
      {mockDevices.map(device => (
        <option key={device.id} value={device.id}>
          {device.label}
        </option>
      ))}
    </select>
  </div>
); 