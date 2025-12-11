import { Song, SortBy, SortOrder } from '../types/Song';

/**
 * Filters songs based on search term (searches both song name and album name)
 * Optimized for performance with early returns and efficient string matching
 * @param songs - Array of songs to filter
 * @param searchTerm - Search term to filter by
 * @returns Filtered array of songs
 */
export const filterSongs = (songs: Song[], searchTerm: string): Song[] => {
  if (!searchTerm || !searchTerm.trim()) {
    return songs;
  }

  const term = searchTerm.toLowerCase().trim();
  
  // Early return for empty array
  if (songs.length === 0) {
    return songs;
  }
  
  // Pre-allocate array size for better performance
  const results: Song[] = [];
  
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    // Safe access with fallback to empty string
    const trackName = (song.trackName || '').toLowerCase();
    const albumName = (song.collectionName || '').toLowerCase();
    
    // Fast path: check if term matches start of either field
    if (trackName.startsWith(term) || albumName.startsWith(term)) {
      results.push(song);
    } else if (trackName.includes(term) || albumName.includes(term)) {
      results.push(song);
    }
  }
  
  return results;
};

/**
 * Sorts songs by the specified criteria in ascending or descending order
 * Optimized for performance with efficient comparison
 * @param songs - Array of songs to sort
 * @param sortBy - Sorting criteria (song name or album name)
 * @param sortOrder - Sort order (ascending or descending)
 * @returns Sorted array of songs
 */
export const sortSongs = (songs: Song[], sortBy: SortBy, sortOrder: SortOrder = SortOrder.ASC): Song[] => {
  // Early return for empty or single item arrays
  if (songs.length <= 1) {
    return songs;
  }
  
  // Create a copy and sort in place
  const sorted = [...songs];
  
  // Use Intl.Collator for better performance with locale-aware sorting
  const collator = new Intl.Collator('en', { 
    sensitivity: 'base', 
    numeric: true 
  });
  
  sorted.sort((a, b) => {
    // Safe access with fallback to empty string
    const valueA = (a[sortBy] || '').toString();
    const valueB = (b[sortBy] || '').toString();
    
    // Fast path: if values are equal, return early
    if (valueA === valueB) {
      return 0;
    }
    
    const comparison = collator.compare(valueA.toLowerCase(), valueB.toLowerCase());
    
    // Reverse comparison for descending order
    return sortOrder === SortOrder.DESC ? -comparison : comparison;
  });
  
  return sorted;
};

/**
 * Formats track duration from milliseconds to MM:SS format
 * @param milliseconds - Duration in milliseconds
 * @returns Formatted duration string
 */
export const formatDuration = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Formats release date to a readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatReleaseDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Debounce function to limit the rate of function calls
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
