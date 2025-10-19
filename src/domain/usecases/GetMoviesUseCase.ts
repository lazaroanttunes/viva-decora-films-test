import { MoviesResponse } from '../entities/Movie';
import { MovieRepository } from '../repositories/MovieRepository';

export class GetMoviesUseCase {
  constructor(public movieRepository: MovieRepository) {}

  async execute(page: number): Promise<MoviesResponse> {
    return this.movieRepository.getDiscoverMovies(page);
  }
}