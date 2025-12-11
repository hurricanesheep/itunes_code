import React, { memo, useCallback } from 'react';

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClear: () => void;
  totalResults: number;
  filteredResults: number;
  isDark?: boolean;
}

/**
 * Search input component with real-time filtering
 * Memoized to prevent unnecessary re-renders
 */
export const SearchInput: React.FC<SearchInputProps> = memo(({
  searchTerm,
  onSearchChange,
  onClear,
  totalResults,
  filteredResults,
  isDark = false
}) => {
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  const handleClear = useCallback(() => {
    onClear();
  }, [onClear]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-4 sm:mb-8 animate-slideIn">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search by song name or album name..."
          className={`w-full px-4 py-3 sm:px-5 sm:py-4 pl-4 sm:pl-5 pr-12 sm:pr-14 rounded-xl focus:outline-none shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base border-2 touch-manipulation ${
            isDark
              ? 'bg-[#1a1a1a] text-gray-100 border-[#2a2a2a] placeholder-gray-500 focus:border-[#00f3ff] focus:ring-2 focus:ring-[rgba(0,243,255,0.2)]'
              : 'text-gray-800 bg-white border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
          }`}
          aria-label="Search songs"
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className={`absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-5 w-10 sm:w-auto transition-all duration-200 hover:scale-110 active:scale-95 animate-scaleIn touch-manipulation ${
              isDark 
                ? 'text-gray-400 hover:text-red-400' 
                : 'text-gray-500 hover:text-red-600'
            }`}
            aria-label="Clear search"
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
          </button>
        )}
      </div>

      {/* Results Counter */}
      <div className={`mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-center ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {searchTerm ? (
          <span className={`inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border animate-scaleIn flex-wrap justify-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs md:text-sm ${
            isDark
              ? 'bg-[rgba(0,243,255,0.1)] text-[#00f3ff] border-[rgba(0,243,255,0.3)]'
              : 'bg-blue-50 text-blue-700 border-blue-100'
          }`}>
            Showing <span className="font-bold"> {filteredResults} </span> of <span className="font-bold"> {totalResults} </span> songs
            {filteredResults === 0 && (
              <span className={`ml-1 sm:ml-2 flex items-center text-[10px] sm:text-xs ${
                isDark ? 'text-orange-400' : 'text-orange-600'
              }`}>
                <span className="material-symbols-outlined text-[10px] sm:text-xs md:text-sm mr-0.5 sm:mr-1">info</span>
                Try a different search term
              </span>
            )}
          </span>
        ) : (
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full ${
            isDark
              ? 'bg-[rgba(255,255,255,0.05)] text-gray-300'
              : 'bg-gray-50 text-gray-700'
          }`}>
            Total: <span className="font-bold ml-1">{totalResults}</span> songs
          </span>
        )}
      </div>
    </div>
  );
});
