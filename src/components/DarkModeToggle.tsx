import React, { memo } from 'react';

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = memo(({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 touch-manipulation group ${
        isDark ? 'bg-gray-800' : 'bg-white border-2 border-gray-200'
      }`}
      style={{ position: 'fixed', right: '0.75rem', top: '0.75rem', zIndex: 9999 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <span className="material-symbols-outlined text-yellow-400 text-xl sm:text-2xl group-hover:text-yellow-300 transition-colors">light_mode</span>
      ) : (
        <span className="material-symbols-outlined text-gray-700 text-xl sm:text-2xl group-hover:text-gray-800 transition-colors">dark_mode</span>
      )}
    </button>
  );
});

