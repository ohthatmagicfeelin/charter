export const RemoveButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-2 right-2 p-1.5 rounded-full
      text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400
      bg-gray-100 dark:bg-gray-700/50 
      hover:bg-red-50 dark:hover:bg-red-900/20
      transition-all duration-200
      shadow-[2px_2px_4px_rgba(0,0,0,0.1)]
      dark:shadow-[2px_2px_4px_rgba(0,0,0,0.3)]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
); 