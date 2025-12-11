import React from 'react';
import { useSongs } from './hooks/useSongs';
import { useDarkMode } from './hooks/useDarkMode';
import { SearchInput } from './components/SearchInput';
import { SortControls } from './components/SortControls';
import { SongList } from './components/SongList';
import { DarkModeToggle } from './components/DarkModeToggle';

/**
 * Main App component - iTunes Song Search Application
 * Apple Music / Spotify inspired design with dark mode and neon elements
 */
function App() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const {
    songs,
    searchTerm,
    sortBy,
    sortOrder,
    loading,
    error,
    totalSongs,
    filteredCount,
    updateSearchTerm,
    updateSortBy,
    toggleSortOrder,
    clearSearch,
    refreshSongs
  } = useSongs();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a0a1a]' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Dark Mode Toggle */}
      <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />

      {/* Header - Spotify/Apple Music Style */}
      <header className={`sticky top-0 z-10 backdrop-blur-xl transition-all duration-300 ${
        isDark 
          ? 'bg-[rgba(10,10,10,0.8)] border-b border-[rgba(255,255,255,0.1)]' 
          : 'bg-white shadow-md border-b border-gray-200 bg-opacity-95'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 md:py-6">
          <div className="flex items-center justify-between pr-12 sm:pr-14 md:pr-16">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
              <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                isDark 
                  ? 'bg-gradient-to-br from-[#00f3ff] to-[#b347ff] glow-blue' 
                  : 'bg-gradient-to-br from-blue-500 to-indigo-600'
              }`}>
                <span className="material-symbols-outlined text-white text-2xl sm:text-3xl">library_music</span>
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl md:text-3xl font-extrabold transition-colors duration-300 ${
                  isDark 
                    ? 'text-[#00f3ff]' 
                    : 'text-gray-900'
                }`} style={isDark ? { textShadow: '0 0 10px rgba(0, 243, 255, 0.6), 0 0 20px rgba(0, 243, 255, 0.4)' } : {}}>
                  Music Library
                </h1>
                <p className={`text-xs sm:text-sm mt-0.5 sm:mt-1 transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {totalSongs} songs available
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Apple Music/Spotify Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 pb-8 w-full">
        {/* Search and Sort Controls - Compact Design */}
        <div className="mb-4 sm:mb-6 md:mb-8 space-y-3 sm:space-y-4">
          <SearchInput
            searchTerm={searchTerm}
            onSearchChange={updateSearchTerm}
            onClear={clearSearch}
            totalResults={totalSongs}
            filteredResults={filteredCount}
            isDark={isDark}
          />
          
          <SortControls
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={updateSortBy}
            onSortOrderToggle={toggleSortOrder}
            isDark={isDark}
          />
        </div>

        {/* Song List */}
        <SongList
          songs={songs}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          onRefresh={refreshSongs}
          isDark={isDark}
        />
      </main>

      {/* Footer - Minimal Design - Always at bottom */}
      <footer className={`mt-auto transition-all duration-300 ${
        isDark 
          ? 'bg-[rgba(10,10,10,0.8)] border-t border-[rgba(255,255,255,0.1)]' 
          : 'bg-white border-t border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className={`text-center text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <p className="mb-1 font-medium">
              Built with React, TypeScript
            </p>
            <p>
              Data provided by iTunes API • 
              <a 
                href="https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className={`ml-1 font-medium transition-all duration-200 ${
                  isDark 
                    ? 'text-[#00ffff] hover:text-[#00f3ff]' 
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Learn more
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
