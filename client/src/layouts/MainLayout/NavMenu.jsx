import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export function NavMenu({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 w-48 rounded-xl bg-white dark:bg-gray-800 shadow-[4px_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3)] overflow-hidden">
      <div className="py-2">
        {user && (
          <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
            {user.email}
          </div>
        )}
        <Link
          to="/settings"
          onClick={onClose}
          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
} 