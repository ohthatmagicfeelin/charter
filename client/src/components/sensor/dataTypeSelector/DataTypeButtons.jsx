export const DataTypeButtons = ({ tabs, activeId, onTypeChange }) => (
  <div className="col-span-9 flex justify-center gap-2">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTypeChange(tab.id)}
        className={`px-4 py-2 rounded-full text-sm font-medium
          transition-all duration-200 
          ${activeId === tab.id
            ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg'
            : 'bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200 hover:bg-gray-200 dark:hover:bg-gray-700'
          }
          shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
          dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]`
        }
      >
        {tab.label}
      </button>
    ))}
  </div>
); 