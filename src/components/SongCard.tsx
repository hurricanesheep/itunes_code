import React, { useState, memo, useCallback, useRef, useEffect } from 'react';
import { Song } from '../types/Song';
import { formatDuration, formatReleaseDate } from '../utils/songUtils';

interface SongCardProps {
  song: Song;
  index: number;
  currentlyPlaying: string | null;
  onPlay: (previewUrl: string) => void;
  onStop: () => void;
  isDark?: boolean;
}

/**
 * Individual song card component displaying song information
 * Memoized to prevent unnecessary re-renders
 */
export const SongCard: React.FC<SongCardProps> = memo(({ song, index, currentlyPlaying, onPlay, onStop, isDark = false }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlaying = currentlyPlaying === song.previewUrl;

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handlePreviewClick = useCallback(() => {
    if (song.previewUrl) {
      if (isPlaying) {
        onStop();
      } else {
        onPlay(song.previewUrl);
      }
    }
  }, [song.previewUrl, isPlaying, onPlay, onStop]);

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
          onStop();
        });
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [isPlaying, onStop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border group animate-fadeIn hover:scale-[1.02] spotify-card w-full ${
      isDark
        ? 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-[rgba(0,243,255,0.3)]'
        : 'bg-white border-gray-200 hover:border-blue-300'
    }`}>
      {/* Hidden Audio Element */}
      {song.previewUrl && (
        <audio
          ref={audioRef}
          src={song.previewUrl}
          preload="none"
          onEnded={onStop}
        />
      )}
      
      <div className="flex p-2 sm:p-3 md:p-5 items-start sm:items-center w-full max-w-full overflow-visible">
        {/* Song Number */}
        <div className="flex-shrink-0 mr-1.5 sm:mr-2 md:mr-4 flex items-center justify-center mt-0.5 sm:mt-0">
          <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 ${
            isDark
              ? 'bg-gradient-to-br from-[#00f3ff] to-[#b347ff] glow-blue'
              : 'bg-gradient-to-br from-blue-500 to-indigo-600'
          }`}>
            <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white">
              {index + 1}
            </span>
          </div>
        </div>
        
        {/* Album Art */}
        <div className="flex-shrink-0 mr-2 sm:mr-3 md:mr-5">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg sm:rounded-xl overflow-hidden relative shadow-lg border-2 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl ${
            isDark
              ? 'bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-[#2a2a2a] group-hover:border-[rgba(0,243,255,0.5)] group-hover:glow-blue'
              : 'bg-gradient-to-br from-blue-100 to-purple-100 border-gray-100 group-hover:border-blue-300'
          }`}>
            {imageLoading && (
              <div className={`absolute inset-0 flex items-center justify-center bg-opacity-80 ${
                isDark ? 'bg-[#0a0a0a]' : 'bg-white'
              }`}>
                <div className={`animate-spin rounded-full h-6 w-6 border-b-2 ${
                  isDark ? 'border-[#00f3ff]' : 'border-blue-500'
                }`}></div>
              </div>
            )}
            
            {!imageError ? (
              <img
                src={song.artworkUrl100}
                alt={`${song.collectionName} album art`}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  imageLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                } hover:scale-105`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                crossOrigin="anonymous"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${
                isDark
                  ? 'bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]'
                  : 'bg-gradient-to-br from-gray-200 to-gray-300'
              }`}>
                <span className={`material-symbols-outlined text-4xl ${
                  isDark ? 'text-gray-500' : 'text-gray-600'
                }`}>library_music</span>
              </div>
            )}
            
            {/* Album art overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-lg"></div>
          </div>
        </div>

        {/* Song Information */}
        <div className="flex-1 min-w-0 flex flex-col overflow-visible">
          <div className="flex justify-between items-start mb-1 sm:mb-2 md:mb-3 gap-1 sm:gap-1.5 sm:gap-2">
            <div className="flex-1 min-w-0 pr-1 sm:pr-2 md:pr-3 overflow-visible">
              <h3 className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold break-words transition-colors duration-200 mb-0.5 sm:mb-1 ${
                isDark
                  ? 'text-gray-100 group-hover:text-[#00f3ff]'
                  : 'text-gray-900 group-hover:text-blue-600'
              }`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                {song.trackName}
              </h3>
              <p className={`text-[10px] sm:text-xs md:text-sm font-medium break-words ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                {song.artistName}
              </p>
            </div>
            
            {/* Preview Button - Perfect Circle */}
            {song.previewUrl && (
              <button
                onClick={handlePreviewClick}
                className="flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 touch-manipulation play-button-circle"
                style={{ 
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '50%',
                  minWidth: '2.25rem',
                  minHeight: '2.25rem',
                  ...(isPlaying 
                    ? isDark
                      ? { 
                          backgroundColor: '#9333ea',
                          color: 'white',
                          boxShadow: '0 0 15px rgba(147, 51, 234, 0.5)',
                          transform: 'scale(1.1)'
                        }
                      : { 
                          backgroundColor: '#7c3aed',
                          color: 'white',
                          boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)',
                          transform: 'scale(1.1)'
                        }
                    : isDark
                      ? { 
                          backgroundColor: '#6366f1',
                          color: 'white',
                        }
                      : { 
                          backgroundColor: '#4f46e5',
                          color: 'white',
                        }
                  )
                }}
                onMouseEnter={(e) => {
                  if (!isPlaying) {
                    e.currentTarget.style.backgroundColor = isDark ? '#818cf8' : '#6366f1';
                    e.currentTarget.style.boxShadow = isDark 
                      ? '0 0 20px rgba(129, 140, 248, 0.6)' 
                      : '0 0 20px rgba(99, 102, 241, 0.6)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isPlaying) {
                    e.currentTarget.style.backgroundColor = isDark ? '#6366f1' : '#4f46e5';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
                title={isPlaying ? "Pause preview" : "Play preview"}
                aria-label={isPlaying ? `Pause preview of ${song.trackName}` : `Play preview of ${song.trackName}`}
              >
                {isPlaying ? (
                  <span className="material-symbols-outlined text-lg sm:text-xl md:text-2xl">pause</span>
                ) : (
                  <span className="material-symbols-outlined text-lg sm:text-xl md:text-2xl ml-0.5">play_arrow</span>
                )}
              </button>
            )}
          </div>

          <div className="mb-1 sm:mb-2 md:mb-3">
            <p className={`text-[10px] sm:text-xs md:text-sm break-words ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`} style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              <span className={`font-semibold ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>Album:</span> <span>{song.collectionName}</span>
            </p>
          </div>

          {/* Additional Information */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-5 mb-1 sm:mb-2">
            {song.trackTimeMillis && (
              <span className={`inline-flex items-center text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 rounded-full ${
                isDark
                  ? 'text-gray-300 bg-[#2a2a2a]'
                  : 'text-gray-700 bg-gray-50'
              }`}>
                <span className={`material-symbols-outlined text-[10px] sm:text-xs md:text-sm mr-1 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>schedule</span>
                {formatDuration(song.trackTimeMillis)}
              </span>
            )}
            
            {song.primaryGenreName && (
              <span className={`inline-flex items-center text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 rounded-full border ${
                isDark
                  ? 'text-[#b347ff] bg-[rgba(179,71,255,0.1)] border-[rgba(179,71,255,0.3)]'
                  : 'text-indigo-700 bg-indigo-50 border-indigo-100'
              }`}>
                {song.primaryGenreName}
              </span>
            )}
            
            {song.trackPrice && song.currency && (
              <span className={`inline-flex items-center text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 rounded-full ${
                isDark
                  ? 'text-green-400 bg-[rgba(74,222,128,0.1)]'
                  : 'text-green-700 bg-green-50'
              }`}>
                ${song.trackPrice} {song.currency}
              </span>
            )}
          </div>

          {/* Release Date */}
          {song.releaseDate && (
            <div className={`text-[10px] sm:text-xs font-medium ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`}>
              Released {formatReleaseDate(song.releaseDate)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
