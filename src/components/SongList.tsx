import React, { useState, useCallback } from 'react';
import { Song } from '../types/Song';
import { SongCard } from './SongCard';

interface SongListProps {
  songs: Song[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  onRefresh: () => void;
  isDark?: boolean;
}

/**
 * Song list component that displays all songs or empty state
 */
export const SongList: React.FC<SongListProps> = ({
  songs,
  loading,
  error,
  searchTerm,
  onRefresh,
  isDark = false
}) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const handlePlay = useCallback((previewUrl: string) => {
    setCurrentlyPlaying(previewUrl);
  }, []);

  const handleStop = useCallback(() => {
    setCurrentlyPlaying(null);
  }, []);
  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className={`animate-spin rounded-full h-16 w-16 border-4 ${
            isDark 
              ? 'border-[rgba(0,243,255,0.2)] border-t-[#00f3ff]' 
              : 'border-blue-200 border-t-blue-600'
          }`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`material-symbols-outlined text-3xl animate-pulse ${
              isDark ? 'text-[#00f3ff]' : 'text-blue-600'
            }`}>library_music</span>
          </div>
        </div>
        <p className={`text-xl font-semibold mb-2 animate-pulse ${
          isDark ? 'text-gray-200' : 'text-gray-700'
        }`}>Loading songs...</p>
        <p className={isDark ? 'text-gray-400 text-sm' : 'text-gray-500 text-sm'}>Fetching data from iTunes API</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className={`rounded-full p-6 mb-6 border-2 animate-bounce ${
          isDark 
            ? 'bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.3)]' 
            : 'bg-red-50 border-red-100'
        }`}>
          <span className={`material-symbols-outlined text-6xl ${
            isDark ? 'text-red-400' : 'text-red-500'
          }`}>error</span>
        </div>
        <h3 className={`text-2xl font-bold mb-3 ${
          isDark ? 'text-gray-100' : 'text-gray-900'
        }`}>Oops! Something went wrong</h3>
        <p className={`text-center mb-8 max-w-md leading-relaxed ${
          isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {error}
        </p>
        <button
          onClick={onRefresh}
          className={`inline-flex items-center text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 focus:outline-none shadow-lg hover:shadow-xl transform hover:scale-105 ${
            isDark
              ? 'bg-gradient-to-r from-[#00f3ff] to-[#b347ff] hover:from-[#00ffff] hover:to-[#c855ff] glow-blue focus:ring-4 focus:ring-[rgba(0,243,255,0.3)]'
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-100'
          }`}
        >
          <span className="material-symbols-outlined text-xl mr-2">refresh</span>
          Try Again
        </button>
      </div>
    );
  }

  // Empty State (No Results)
  if (songs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className={`rounded-full p-8 mb-6 animate-pulse ${
          isDark
            ? 'bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]'
            : 'bg-gradient-to-br from-gray-100 to-gray-200'
        }`}>
          <span className={`material-symbols-outlined text-7xl ${
            isDark ? 'text-gray-400' : 'text-gray-700'
          }`}>queue_music</span>
        </div>
        
        {searchTerm ? (
          <>
            <h3 className={`text-2xl font-bold mb-3 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>No songs found</h3>
            <p className={`text-center mb-6 max-w-md leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We couldn't find any songs matching <span className={`font-semibold ${
                isDark ? 'text-gray-200' : 'text-gray-800'
              }`}>"{searchTerm}"</span>. Try searching for a different song or album name.
            </p>
            <div className={`text-sm p-6 rounded-xl max-w-md shadow-sm border-2 ${
              isDark
                ? 'text-gray-300 bg-[#1a1a1a] border-[#2a2a2a]'
                : 'text-gray-600 bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-center mb-3">
                <span className={`material-symbols-outlined text-xl mr-2 ${
                  isDark ? 'text-yellow-400' : 'text-yellow-500'
                }`}>lightbulb</span>
                <p className={`font-bold ${
                  isDark ? 'text-gray-200' : 'text-gray-800'
                }`}>Search Tips</p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className={`mr-2 ${
                    isDark ? 'text-[#00f3ff]' : 'text-blue-500'
                  }`}>•</span>
                  <span>Check your spelling</span>
                </li>
                <li className="flex items-start">
                  <span className={`mr-2 ${
                    isDark ? 'text-[#00f3ff]' : 'text-blue-500'
                  }`}>•</span>
                  <span>Try different keywords</span>
                </li>
                <li className="flex items-start">
                  <span className={`mr-2 ${
                    isDark ? 'text-[#00f3ff]' : 'text-blue-500'
                  }`}>•</span>
                  <span>Search by artist name or album title</span>
                </li>
                <li className="flex items-start">
                  <span className={`mr-2 ${
                    isDark ? 'text-[#00f3ff]' : 'text-blue-500'
                  }`}>•</span>
                  <span>Use partial words (e.g., "shake" for "Shake It Off")</span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <h3 className={`text-2xl font-bold mb-3 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>No songs available</h3>
            <p className={`text-center mb-8 max-w-md leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              It looks like there are no songs to display. This might be a temporary issue.
            </p>
            <button
              onClick={onRefresh}
              className={`inline-flex items-center text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 focus:outline-none shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isDark
                  ? 'bg-gradient-to-r from-[#00f3ff] to-[#b347ff] hover:from-[#00ffff] hover:to-[#c855ff] glow-blue focus:ring-4 focus:ring-[rgba(0,243,255,0.3)]'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-100'
              }`}
            >
              <span className="material-symbols-outlined text-xl mr-2">refresh</span>
              Refresh
            </button>
          </>
        )}
      </div>
    );
  }

  // Song List
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Results Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-0.5 sm:mb-1 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {searchTerm ? `Search Results` : 'All Songs'}
            </h2>
            <p className={`text-xs sm:text-sm font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {songs.length} {songs.length === 1 ? 'song' : 'songs'} found
            </p>
          </div>
        </div>
      </div>

      {/* Song Cards Grid - Vertical only for mobile */}
      <div className="grid gap-3 sm:gap-4 md:gap-5">
        {songs.map((song, index) => (
          <div 
            key={song.trackId}
            className="animate-fadeIn"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <SongCard 
              song={song} 
              index={index}
              currentlyPlaying={currentlyPlaying}
              onPlay={handlePlay}
              onStop={handleStop}
              isDark={isDark}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
