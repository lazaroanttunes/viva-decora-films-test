import { Movie, MoviesResponse } from '../../domain/entities/Movie';

export interface MovieDataSource {
  getDiscoverMovies(page: number): Promise<MoviesResponse>;
  searchMovies(query: string, page: number): Promise<MoviesResponse>;
  getMovieDetails(movieId: number): Promise<Movie>;
}