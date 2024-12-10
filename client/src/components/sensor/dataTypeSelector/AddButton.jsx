export const AddButton = ({ onClick }) => (
  <div className="flex justify-center">
    <button
      onClick={onClick}
      className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium
        bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-teal-200 
        hover:bg-gray-200 dark:hover:bg-gray-700
        transition-all duration-200
        shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
        dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 transition-transform group-hover:rotate-90" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 4v16m8-8H4" 
        />
      </svg>
      Add Data Type
    </button>
  </div>
); 