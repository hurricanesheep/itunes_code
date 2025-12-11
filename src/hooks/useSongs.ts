import { useState, useEffect, useCallback, useMemo } from 'react';
import { Song, SortBy, SortOrder } from '../types/Song';
import { iTunesApiService } from '../services/iTunesApi';
import { filterSongs, sortSongs, debounce } from '../utils/songUtils';

/**
 * Custom hook for managing song data, search, and sorting functionality
 * Optimized for performance with memoization and efficient filtering
 */
export const useSongs = () => {
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.SONG_NAME);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches initial song data from iTunes API
   * Uses only real iTunes API - no mock data
   */
  const fetchSongs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🎵 Fetching songs from iTunes API...');
      
      // Fetch from real iTunes API (tries multiple CORS proxies internally)
      const songs = await iTunesApiService.fetchSongs();
      
      console.log('✅ Successfully fetched', songs.length, 'songs from iTunes API');
      
      setAllSongs(songs);
      
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to load songs from iTunes API. Please check your internet connection and try again.';
      
      setError(errorMessage);
      setAllSongs([]);
      
      console.error('❌ Error fetching songs from iTunes API:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoized filtered songs - only recalculates when searchTerm or allSongs change
  const filteredSongs = useMemo(() => {
    if (!searchTerm || !searchTerm.trim()) {
      return allSongs;
    }
    return filterSongs(allSongs, searchTerm);
  }, [allSongs, searchTerm]);

  // Memoized sorted songs - only recalculates when filteredSongs, sortBy, or sortOrder change
  const sortedSongs = useMemo(() => {
    if (!filteredSongs || filteredSongs.length === 0) {
      return filteredSongs;
    }
    return sortSongs(filteredSongs, sortBy, sortOrder);
  }, [filteredSongs, sortBy, sortOrder]);

  /**
   * Updates the search term immediately
   * Filtering is optimized with useMemo
   */
  const updateSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  /**
   * Updates the sorting criteria - instant response
   */
  const updateSortBy = useCallback((newSortBy: SortBy) => {
    setSortBy(newSortBy); // Update immediately
  }, []);

  /**
   * Toggles sort order between ascending and descending
   */
  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
  }, []);

  /**
   * Clears the search term
   */
  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  /**
   * Refreshes the song data by fetching from API again
   */
  const refreshSongs = useCallback(() => {
    fetchSongs();
  }, [fetchSongs]);

  // Fetch songs on component mount
  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  return {
    songs: sortedSongs,
    searchTerm: searchTerm,
    sortBy: sortBy,
    sortOrder: sortOrder,
    loading,
    error,
    totalSongs: allSongs.length,
    filteredCount: sortedSongs.length,
    updateSearchTerm: updateSearchTerm, // Immediate update, filtering is memoized
    updateSortBy,
    toggleSortOrder,
    clearSearch,
    refreshSongs
  };
};
