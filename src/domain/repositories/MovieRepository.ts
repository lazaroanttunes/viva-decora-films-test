import { Movie, MoviesResponse } from '../entities/Movie';

export interface MovieRepository {
  getDiscoverMovies(page: number): Promise<MoviesResponse>;
  searchMovies(query: string, page: number): Promise<MoviesResponse>;
  getMovieDetails(movieId: number): Promise<Movie>;
}