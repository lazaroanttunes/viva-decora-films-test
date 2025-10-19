import { useState, useCallback, useEffect } from 'react';
import { Movie } from '../../domain/entities/Movie';
import { GetMoviesUseCase } from '../../domain/usecases/GetMoviesUseCase';
import { SearchMoviesUseCase } from '../../domain/usecases/SearchMoviesUseCase';

type ViewState = 'loading' | 'error' | 'success' | 'idle';

interface ViewModelProps {
  initialSearch?: string;
}

export const useMovieListViewModel = (
  getMoviesUseCase: GetMoviesUseCase,
  searchMoviesUseCase: SearchMoviesUseCase,
  props?: ViewModelProps
) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [viewState, setViewState] = useState<ViewState>('idle');
  const [error, setError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState(props?.initialSearch || '');

  useEffect(() => {
    if (props?.initialSearch) {
      setSearchQuery(props.initialSearch);
      setIsSearching(true);
      loadMovies(1, false);
    }
  }, [props?.initialSearch]);

  const loadMovies = useCallback(async (page: number = 1, isLoadMore: boolean = false) => {
    try {
      setViewState('loading');
      
      const response = isSearching && searchQuery
        ? await searchMoviesUseCase.execute(searchQuery, page)
        : await getMoviesUseCase.execute(page);

      if (isLoadMore) {
        setMovies(prev => [...prev, ...response.results]);
      } else {
        setMovies(response.results || []);
      }
      
      setCurrentPage(response.page);
      setTotalPages(response.total_pages);
      setViewState('success');
    } catch (err) {
      setError('Falha ao carregar filmes');
      setViewState('error');
      setMovies([]);
    }
  }, [isSearching, searchQuery, getMoviesUseCase, searchMoviesUseCase]);

  const searchMovies = useCallback(async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    await loadMovies(1, false);
  }, [loadMovies]);

  const loadMoreMovies = useCallback(async () => {
    if (currentPage < totalPages && viewState !== 'loading') {
      await loadMovies(currentPage + 1, true);
    }
  }, [currentPage, totalPages, viewState, loadMovies]);

  const refreshMovies = useCallback(async () => {
    await loadMovies(1, false);
  }, [loadMovies]);

  const clearSearch = useCallback(async () => {
    setSearchQuery('');
    setIsSearching(false);
    await loadMovies(1, false);
  }, [loadMovies]);

  return {
    movies,
    viewState,
    error,
    currentPage,
    totalPages,
    isSearching,
    searchQuery,
    loadMovies,
    searchMovies,
    loadMoreMovies,
    refreshMovies,
    clearSearch,
    setSearchQuery,
    setIsSearching,
  };
};