export const Label = ({ children, className = '' }) => (
  <div className={`text-sm font-medium text-gray-400 dark:text-gray-500 mb-3 ${className}`}>
    {children}
  </div>
); 