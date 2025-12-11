import { iTunesApiResponse, Song } from '../types/Song';

/**
 * Service class for interacting with the iTunes API
 * Uses only real iTunes API - no mock data
 */
export class iTunesApiService {
  private static readonly BASE_URL = 'https://itunes.apple.com/search';
  
  /**
   * List of CORS proxies to try in order
   */
  private static readonly CORS_PROXIES = [
    'https://api.allorigins.win/get?url=',
    'https://corsproxy.io/?',
    'https://api.codetabs.com/v1/proxy?quest=',
  ];
  
  /**
   * Fetches songs from iTunes API with the specified search term
   * Tries multiple CORS proxy methods to ensure success
   * @param term - Search term (default: "Taylor+Swift")
   * @param limit - Number of results to fetch (default: 200)
   * @returns Promise<Song[]> - Array of songs from iTunes API
   * @throws Error if all methods fail
   */
  static async fetchSongs(
    term: string = 'Taylor+Swift',
    limit: number = 200
  ): Promise<Song[]> {
    const apiUrl = `${this.BASE_URL}?term=${encodeURIComponent(term)}&limit=${limit}&media=music`;
    
    console.log('🎵 Fetching from iTunes API:', apiUrl);
    
    // Try allorigins.win proxy first (most reliable)
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
      console.log('📡 Trying allorigins.win proxy...');
      
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const proxyData = await response.json();
      const data: iTunesApiResponse = JSON.parse(proxyData.contents);
      
      if (data.results && data.results.length > 0) {
        console.log('✅ Successfully fetched from iTunes API via allorigins:', data.resultCount, 'results');
        return data.results;
      }
      
      throw new Error('No results returned from API');
    } catch (error) {
      console.warn('❌ allorigins.win proxy failed:', error);
    }
    
    // Try corsproxy.io as backup
    try {
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;
      console.log('📡 Trying corsproxy.io...');
      
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: iTunesApiResponse = await response.json();
      
      if (data.results && data.results.length > 0) {
        console.log('✅ Successfully fetched from iTunes API via corsproxy.io:', data.resultCount, 'results');
        return data.results;
      }
      
      throw new Error('No results returned from API');
    } catch (error) {
      console.warn('❌ corsproxy.io failed:', error);
    }
    
    // Try codetabs proxy as last resort
    try {
      const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(apiUrl)}`;
      console.log('📡 Trying codetabs proxy...');
      
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: iTunesApiResponse = await response.json();
      
      if (data.results && data.results.length > 0) {
        console.log('✅ Successfully fetched from iTunes API via codetabs:', data.resultCount, 'results');
        return data.results;
      }
      
      throw new Error('No results returned from API');
    } catch (error) {
      console.warn('❌ codetabs proxy failed:', error);
    }
    
    // If all proxies fail, throw error
    throw new Error('Failed to fetch from iTunes API. All CORS proxy methods failed. Please check your internet connection or try again later.');
  }

}
