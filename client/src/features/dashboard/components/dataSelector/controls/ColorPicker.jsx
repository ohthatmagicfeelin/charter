import { Label } from '../common/Label';

// Helper function to convert RGB to Hex
const rgbToHex = (rgb) => {
  // Handle rgb(r, g, b) format
  const matches = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!matches) return rgb; // Return as-is if not RGB format
  
  const r = parseInt(matches[1]);
  const g = parseInt(matches[2]);
  const b = parseInt(matches[3]);
  
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const ColorPicker = ({ color, defaultColor, onChange }) => {
  const currentColor = color || defaultColor;
  const hexColor = rgbToHex(currentColor);
  
  return (
    <div className="mt-2 sm:mt-0 flex items-center space-x-4">
      <input
        type="color"
        value={hexColor}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-20 rounded cursor-pointer bg-transparent"
      />
      <span className="text-sm text-gray-600 dark:text-gray-300">{currentColor}</span>
      {color && (
        <button
          onClick={() => onChange(null)}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Reset to Default
        </button>
      )}
    </div>
  );
}; 