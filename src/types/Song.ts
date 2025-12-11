// Interface representing a song from the iTunes API
export interface Song {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  artworkUrl60: string;
  previewUrl: string;
  trackTimeMillis: number;
  releaseDate: string;
  primaryGenreName: string;
  trackPrice?: number;
  currency?: string;
}

// Interface for the iTunes API response
export interface iTunesApiResponse {
  resultCount: number;
  results: Song[];
}

// Constants for sorting options
export const SortBy = {
  SONG_NAME: 'trackName',
  ALBUM_NAME: 'collectionName'
} as const;

export type SortBy = typeof SortBy[keyof typeof SortBy];

// Constants for sort order
export const SortOrder = {
  ASC: 'asc',
  DESC: 'desc'
} as const;

export type SortOrder = typeof SortOrder[keyof typeof SortOrder];

// Interface for search and filter state
export interface SearchState {
  searchTerm: string;
  sortBy: SortBy;
  filteredSongs: Song[];
}
