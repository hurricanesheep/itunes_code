import React, { memo, useCallback } from 'react';
import { SortBy, SortOrder } from '../types/Song';

interface SortControlsProps {
  sortBy: SortBy;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortBy) => void;
  onSortOrderToggle: () => void;
  isDark?: boolean;
}

/**
 * Sort controls component with radio buttons for sorting options
 * Memoized to prevent unnecessary re-renders
 */
export const SortControls: React.FC<SortControlsProps> = memo(({
  sortBy,
  sortOrder,
  onSortChange,
  onSortOrderToggle,
  isDark = false
}) => {
  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSortChange(e.target.value as SortBy);
  }, [onSortChange]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-4 sm:mb-8 animate-slideIn">
      <div className={`rounded-xl border-2 shadow-sm p-4 sm:p-6 hover:shadow-md transition-all duration-300 ${
        isDark
          ? 'bg-[#1a1a1a] border-[#2a2a2a] spotify-card'
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-base sm:text-lg font-bold mb-3 sm:mb-4 text-center ${
          isDark ? 'text-gray-100' : 'text-gray-800'
        }`}>
          Sort By
        </h3>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mb-3 sm:mb-4">
          {/* Sort by Song Name */}
          <label className={`flex items-center cursor-pointer group px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 touch-manipulation min-h-[44px] ${
            isDark 
              ? 'hover:bg-[rgba(0,243,255,0.1)] active:bg-[rgba(0,243,255,0.15)]' 
              : 'hover:bg-blue-50 active:bg-blue-100'
          }`}>
            <input
              type="radio"
              name="sortBy"
              value={SortBy.SONG_NAME}
              checked={sortBy === SortBy.SONG_NAME}
              onChange={handleSortChange}
              className={`w-5 h-5 cursor-pointer touch-manipulation ${
                isDark
                  ? 'text-[#00f3ff] bg-[#1a1a1a] border-[#2a2a2a] focus:ring-[#00f3ff] focus:ring-2'
                  : 'text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
              }`}
            />
            <span className={`ml-3 text-sm font-semibold transition-colors duration-200 ${
              sortBy === SortBy.SONG_NAME 
                ? isDark ? 'text-[#00f3ff]' : 'text-blue-600'
                : isDark ? 'text-gray-300 group-hover:text-[#00f3ff]' : 'text-gray-700 group-hover:text-blue-600'
            }`}>
              Song Name
            </span>
          </label>

          {/* Sort by Album Name */}
          <label className={`flex items-center cursor-pointer group px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 touch-manipulation min-h-[44px] ${
            isDark 
              ? 'hover:bg-[rgba(0,243,255,0.1)] active:bg-[rgba(0,243,255,0.15)]' 
              : 'hover:bg-blue-50 active:bg-blue-100'
          }`}>
            <input
              type="radio"
              name="sortBy"
              value={SortBy.ALBUM_NAME}
              checked={sortBy === SortBy.ALBUM_NAME}
              onChange={handleSortChange}
              className={`w-5 h-5 cursor-pointer touch-manipulation ${
                isDark
                  ? 'text-[#00f3ff] bg-[#1a1a1a] border-[#2a2a2a] focus:ring-[#00f3ff] focus:ring-2'
                  : 'text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2'
              }`}
            />
            <span className={`ml-3 text-sm font-semibold transition-colors duration-200 ${
              sortBy === SortBy.ALBUM_NAME 
                ? isDark ? 'text-[#00f3ff]' : 'text-blue-600'
                : isDark ? 'text-gray-300 group-hover:text-[#00f3ff]' : 'text-gray-700 group-hover:text-blue-600'
            }`}>
              Album Name
            </span>
          </label>
        </div>

        {/* Sort Order Toggle */}
        <div className={`text-center pt-3 sm:pt-4 border-t ${
          isDark ? 'border-[#2a2a2a]' : 'border-gray-200'
        }`}>
          <button
            onClick={onSortOrderToggle}
            className={`inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 touch-manipulation min-h-[44px] ${
              isDark
                ? sortOrder === SortOrder.ASC
                  ? 'text-white bg-gradient-to-r from-[#00f3ff] to-[#b347ff] hover:from-[#00ffff] hover:to-[#c855ff] glow-blue'
                  : 'text-white bg-gradient-to-r from-[#b347ff] to-[#ff00ff] hover:from-[#c855ff] hover:to-[#ff1aff] glow-purple'
                : sortOrder === SortOrder.ASC
                  ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-100'
                  : 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-100'
            }`}
            title={`Toggle to ${sortOrder === SortOrder.ASC ? 'Descending' : 'Ascending'} order`}
          >
            {sortOrder === SortOrder.ASC ? (
              <>
                <span className="material-symbols-outlined text-lg mr-2">arrow_upward</span>
                Ascending (A-Z)
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg mr-2">arrow_downward</span>
                Descending (Z-A)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});
