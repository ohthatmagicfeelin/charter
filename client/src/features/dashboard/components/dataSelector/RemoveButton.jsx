export const RemoveButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
  >
    <svg
      className="w-5 h-5 text-gray-500 dark:text-gray-400"
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