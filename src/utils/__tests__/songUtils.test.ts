import { describe, it, expect } from 'vitest';
import { filterSongs, sortSongs, formatDuration, formatReleaseDate } from '../songUtils';
import { Song, SortBy } from '../../types/Song';

// Mock song data for testing
const mockSongs: Song[] = [
  {
    trackId: 1,
    trackName: 'Anti-Hero',
    artistName: 'Taylor Swift',
    collectionName: 'Midnights',
    artworkUrl100: 'test-url-1',
    artworkUrl60: 'test-url-1-60',
    previewUrl: 'preview-1',
    trackTimeMillis: 200690,
    releaseDate: '2022-10-21T07:00:00Z',
    primaryGenreName: 'Pop'
  },
  {
    trackId: 2,
    trackName: 'Shake It Off',
    artistName: 'Taylor Swift',
    collectionName: '1989',
    artworkUrl100: 'test-url-2',
    artworkUrl60: 'test-url-2-60',
    previewUrl: 'preview-2',
    trackTimeMillis: 219200,
    releaseDate: '2014-08-18T07:00:00Z',
    primaryGenreName: 'Pop'
  },
  {
    trackId: 3,
    trackName: 'Love Story',
    artistName: 'Taylor Swift',
    collectionName: 'Fearless',
    artworkUrl100: 'test-url-3',
    artworkUrl60: 'test-url-3-60',
    previewUrl: 'preview-3',
    trackTimeMillis: 235466,
    releaseDate: '2008-09-11T07:00:00Z',
    primaryGenreName: 'Country'
  }
];

describe('songUtils', () => {
  describe('filterSongs', () => {
    it('should return all songs when search term is empty', () => {
      const result = filterSongs(mockSongs, '');
      expect(result).toEqual(mockSongs);
    });

    it('should filter songs by track name', () => {
      const result = filterSongs(mockSongs, 'Anti');
      expect(result).toHaveLength(1);
      expect(result[0].trackName).toBe('Anti-Hero');
    });

    it('should filter songs by album name', () => {
      const result = filterSongs(mockSongs, 'Midnights');
      expect(result).toHaveLength(1);
      expect(result[0].collectionName).toBe('Midnights');
    });

    it('should be case insensitive', () => {
      const result = filterSongs(mockSongs, 'SHAKE');
      expect(result).toHaveLength(1);
      expect(result[0].trackName).toBe('Shake It Off');
    });

    it('should return empty array when no matches found', () => {
      const result = filterSongs(mockSongs, 'NonexistentSong');
      expect(result).toHaveLength(0);
    });

    it('should handle partial matches', () => {
      const result = filterSongs(mockSongs, 'Love');
      expect(result).toHaveLength(1);
      expect(result[0].trackName).toBe('Love Story');
    });
  });

  describe('sortSongs', () => {
    it('should sort songs by track name in ascending order', () => {
      const result = sortSongs(mockSongs, SortBy.SONG_NAME);
      expect(result[0].trackName).toBe('Anti-Hero');
      expect(result[1].trackName).toBe('Love Story');
      expect(result[2].trackName).toBe('Shake It Off');
    });

    it('should sort songs by album name in ascending order', () => {
      const result = sortSongs(mockSongs, SortBy.ALBUM_NAME);
      expect(result[0].collectionName).toBe('1989');
      expect(result[1].collectionName).toBe('Fearless');
      expect(result[2].collectionName).toBe('Midnights');
    });

    it('should not mutate the original array', () => {
      const originalOrder = [...mockSongs];
      sortSongs(mockSongs, SortBy.SONG_NAME);
      expect(mockSongs).toEqual(originalOrder);
    });
  });

  describe('formatDuration', () => {
    it('should format milliseconds to MM:SS format', () => {
      expect(formatDuration(200690)).toBe('3:20');
      expect(formatDuration(60000)).toBe('1:00');
      expect(formatDuration(30000)).toBe('0:30');
    });

    it('should handle zero duration', () => {
      expect(formatDuration(0)).toBe('0:00');
    });

    it('should pad seconds with zero when needed', () => {
      expect(formatDuration(65000)).toBe('1:05');
    });
  });

  describe('formatReleaseDate', () => {
    it('should format ISO date string to readable format', () => {
      const result = formatReleaseDate('2022-10-21T07:00:00Z');
      expect(result).toBe('October 21, 2022');
    });

    it('should handle different date formats', () => {
      const result = formatReleaseDate('2014-08-18T07:00:00Z');
      expect(result).toBe('August 18, 2014');
    });
  });
});
