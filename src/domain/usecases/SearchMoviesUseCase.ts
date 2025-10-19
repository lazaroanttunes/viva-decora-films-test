import { MoviesResponse } from '../entities/Movie';
import { MovieRepository } from '../repositories/MovieRepository';

export class SearchMoviesUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(query: string, page: number): Promise<MoviesResponse> {
    return this.movieRepository.searchMovies(query, page);
  }
}