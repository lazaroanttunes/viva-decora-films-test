import { MovieRepository } from '../../domain/repositories/MovieRepository';
import { Movie, MoviesResponse } from '../../domain/entities/Movie';
import { MovieDataSource } from '../datasources/MovieDataSource';

export class MovieRepositoryImpl implements MovieRepository {
  constructor(private dataSource: MovieDataSource) {}

  async getDiscoverMovies(page: number): Promise<MoviesResponse> {
    return this.dataSource.getDiscoverMovies(page);
  }

  async searchMovies(query: string, page: number): Promise<MoviesResponse> {
    return this.dataSource.searchMovies(query, page);
  }

  async getMovieDetails(movieId: number): Promise<Movie> {
    return this.dataSource.getMovieDetails(movieId);
  }
}