import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/common/hooks/useTheme';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { NavMenu } from './NavMenu';

export function Header() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to={user ? "/" : "/signup"} 
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
          >
            Charter
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-xl bg-white dark:bg-gray-800 shadow-[2px_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.15)] dark:hover:shadow-[4px_4px_12px_rgba(0,0,0,0.4)] transition-all duration-200"
                >
                  <svg
                    className="w-6 h-6 text-gray-700 dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <NavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-[2px_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.15)] dark:hover:shadow-[4px_4px_12px_rgba(0,0,0,0.4)] transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-[2px_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 