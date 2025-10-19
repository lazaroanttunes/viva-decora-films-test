import { Movie } from '../entities/Movie';
import { MovieRepository } from '../repositories/MovieRepository';

export class GetMovieDetailsUseCase {
  constructor(private movieRepository: MovieRepository) {}

  async execute(movieId: number): Promise<Movie> {
    return this.movieRepository.getMovieDetails(movieId);
  }
}