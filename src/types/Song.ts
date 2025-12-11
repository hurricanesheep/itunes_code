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

// Enum for sorting options
export enum SortBy {
  SONG_NAME = 'trackName',
  ALBUM_NAME = 'collectionName'
}

// Enum for sort order
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

// Interface for search and filter state
export interface SearchState {
  searchTerm: string;
  sortBy: SortBy;
  filteredSongs: Song[];
}
