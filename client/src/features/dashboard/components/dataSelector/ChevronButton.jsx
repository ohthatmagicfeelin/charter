export const ChevronButton = ({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
  >
    <svg
      className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 ${
        isOpen ? 'rotate-90' : ''
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
); 