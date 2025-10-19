import { MovieDataSource } from './MovieDataSource';
import { Movie, MoviesResponse } from '../../domain/entities/Movie';

export class TMDBDataSource implements MovieDataSource {
  private getApiKey(): string {
    const apiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
    
    if (!apiKey) {
      throw new Error('TMDB API Key não configurada. Configure a variável de ambiente EXPO_PUBLIC_TMDB_API_KEY no arquivo .env');
    }
    
    return apiKey;
  }

  async getDiscoverMovies(page: number): Promise<MoviesResponse> {
    const apiKey = this.getApiKey();
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&language=pt-BR`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async searchMovies(query: string, page: number): Promise<MoviesResponse> {
    const apiKey = this.getApiKey();
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}&language=pt-BR`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async getMovieDetails(movieId: number): Promise<Movie> {
    const apiKey = this.getApiKey();
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
}