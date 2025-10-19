import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMovieListViewModel } from '../viewmodels/MovieListViewModel';
import { MovieListItem } from '../components/MovieListItem';
import { MarvelPromotionItem } from '../components/MarvelPromotionItem';
import { SearchBar } from '../components/SearchBar';
import { RootStackParamList } from '../../../App';
import { GetMoviesUseCase } from '../../domain/usecases/GetMoviesUseCase';
import { SearchMoviesUseCase } from '../../domain/usecases/SearchMoviesUseCase';
import { Movie } from '../../domain/entities/Movie';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieList'> & {
  getMoviesUseCase: GetMoviesUseCase;
  searchMoviesUseCase: SearchMoviesUseCase;
};

const OFFICIAL_MARVEL_MOVIE_IDS = [
  1726,   // Iron Man (2008)
  1724,   // The Incredible Hulk (2008)
  10138,  // Iron Man 2 (2010)
  10195,  // Thor (2011)
  1771,   // Captain America: The First Avenger (2011)
  24428,  // The Avengers (2012)
  
  68721,  // Iron Man 3 (2013)
  76338,  // Thor: The Dark World (2013)
  100402, // Captain America: The Winter Soldier (2014)
  118340, // Guardians of the Galaxy (2014)
  99861,  // Avengers: Age of Ultron (2015)
  102899, // Ant-Man (2015)
  
  271110, // Captain America: Civil War (2016)
  284052, // Doctor Strange (2016)
  283995, // Guardians of the Galaxy Vol. 2 (2017)
  315635, // Spider-Man: Homecoming (2017)
  284053, // Thor: Ragnarok (2017)
  284054, // Black Panther (2018)
  299536, // Avengers: Infinity War (2018)
  363088, // Ant-Man and the Wasp (2018)
  299537, // Captain Marvel (2019)
  299534, // Avengers: Endgame (2019)
  429617, // Spider-Man: Far From Home (2019)
  
  497698, // Black Widow (2021)
  566525, // Shang-Chi and the Legend of the Ten Rings (2021)
  524434, // Eternals (2021)
  634649, // Spider-Man: No Way Home (2021)
  453395, // Doctor Strange in the Multiverse of Madness (2022)
  616037, // Thor: Love and Thunder (2022)
  
  640146, // Ant-Man and the Wasp: Quantumania (2023)
  447365, // Guardians of the Galaxy Vol. 3 (2023)
  565770, // The Marvels (2023)
];

const MARVEL_MOVIE_IDS = OFFICIAL_MARVEL_MOVIE_IDS;

const PROMOTION_INTERVAL = 12; 
const MARVEL_MOVIES_PER_PROMOTION = 3; 

export const MovieListScreen: React.FC<Props> = ({
  getMoviesUseCase,
  searchMoviesUseCase,
  navigation,
}) => {
  const viewModel = useMovieListViewModel(getMoviesUseCase, searchMoviesUseCase);
  const [promotionMarvelMovies, setPromotionMarvelMovies] = useState<{[key: number]: Movie[]}>({});
  const [loadingPromotions, setLoadingPromotions] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    viewModel.loadMovies();
  }, []);

  const loadMarvelMoviesForPromotion = async (promotionIndex: number) => {
    if (promotionMarvelMovies[promotionIndex]) {
      return;
    }

    try {
      setLoadingPromotions(prev => ({ ...prev, [promotionIndex]: true }));

      const startIndex = (promotionIndex * MARVEL_MOVIES_PER_PROMOTION) % MARVEL_MOVIE_IDS.length;
      const selectedMovieIds: number[] = [];
      
      for (let i = 0; i < MARVEL_MOVIES_PER_PROMOTION; i++) {
        const movieIndex = (startIndex + i) % MARVEL_MOVIE_IDS.length;
        selectedMovieIds.push(MARVEL_MOVIE_IDS[movieIndex]);
      }
      
      const moviePromises = selectedMovieIds.map(movieId => 
        getMoviesUseCase.movieRepository.getMovieDetails(movieId)
      );
      
      const movies = await Promise.all(moviePromises);
      
      setPromotionMarvelMovies(prev => ({
        ...prev,
        [promotionIndex]: movies
      }));
      
    } catch (error) {
      console.warn(`Failed to load Marvel movies for promotion ${promotionIndex}:`, error);
      try {
        const response = await searchMoviesUseCase.execute('marvel', 1);
        if (response.results.length > 0) {
          const startIndex = (promotionIndex * MARVEL_MOVIES_PER_PROMOTION) % response.results.length;
          const fallbackMovies = response.results.slice(startIndex, startIndex + MARVEL_MOVIES_PER_PROMOTION);
          
          setPromotionMarvelMovies(prev => ({
            ...prev,
            [promotionIndex]: fallbackMovies
          }));
        }
      } catch (fallbackError) {
        console.warn('Fallback Marvel loading also failed:', fallbackError);
      }
    } finally {
      setLoadingPromotions(prev => ({ ...prev, [promotionIndex]: false }));
    }
  };

  const dataWithPromotions = useMemo(() => {
    const movies = viewModel.movies || [];
    const data: any[] = [];
    
    let movieCountSinceLastPromotion = 0;
    let promotionCount = 0;
    
    movies.forEach((movie, index) => {
      data.push({ ...movie, type: 'movie' });
      movieCountSinceLastPromotion++;
      if (movieCountSinceLastPromotion >= PROMOTION_INTERVAL) {
        loadMarvelMoviesForPromotion(promotionCount);
        data.push({ 
          type: 'marvel_promotion', 
          id: `marvel-promotion-${promotionCount}`,
          movies: promotionMarvelMovies[promotionCount] || [],
          promotionIndex: promotionCount
        });
        movieCountSinceLastPromotion = 0;
        promotionCount++;
      }
    });
    
    return data;
  }, [viewModel.movies, promotionMarvelMovies]);

  const handleMarvelMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movieId: movie.id });
  };

  const handleMarvelSearchPress = () => {
    navigation.navigate('MarvelMovies');
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (item.type === 'marvel_promotion') {
      const isLoading = loadingPromotions[item.promotionIndex] || false;
      
      return (
        <View style={styles.promotionContainer}>
          <MarvelPromotionItem
            movies={item.movies}
            onPressMovie={handleMarvelMoviePress}
            onPressSearch={handleMarvelSearchPress}
            loading={isLoading}
          />
        </View>
      );
    }
    
    return (
      <View style={styles.movieItemContainer}>
        <MovieListItem
          movie={item}
          onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
        />
      </View>
    );
  };

  const renderFooter = () => {
    if (viewModel.viewState === 'loading' && viewModel.currentPage > 1) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="large" color="#e63946" />
        </View>
      );
    }
    return null;
  };

  if (viewModel.viewState === 'loading' && viewModel.currentPage === 1) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e63946" />
        <Text style={styles.loadingText}>Carregando filmes...</Text>
      </View>
    );
  }

  if (viewModel.viewState === 'error') {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{viewModel.error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={viewModel.refreshMovies}>
          <Text style={styles.retryText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar
        value={viewModel.searchQuery}
        onChangeText={viewModel.setSearchQuery}
        onSearch={() => viewModel.searchMovies(viewModel.searchQuery)}
        onClear={() => {
          viewModel.setSearchQuery('');
          viewModel.setIsSearching(false);
          viewModel.loadMovies(1, false);
        }}
      />
      
      {viewModel.isSearching && (
        <View style={styles.searchInfo}>
          <Text style={styles.searchText}>
            Buscando por: "{viewModel.searchQuery}"
          </Text>
        </View>
      )}
      
      <FlatList
        data={dataWithPromotions}
        renderItem={renderItem}
        keyExtractor={(item, index) => 
          item.type === 'marvel_promotion' ? item.id : `movie-${item.id}-${index}`
        }
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        onEndReached={viewModel.loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum filme encontrado</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listContent: {
    padding: 8,
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  movieItemContainer: {
    flex: 1,
    maxWidth: '48%',
  },
  promotionContainer: {
    width: '100%',
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#e63946',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  retryButton: {
    backgroundColor: '#e63946',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#e63946',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  searchInfo: {
    padding: 12,
    backgroundColor: '#e63946',
    alignItems: 'center',
  },
  searchText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
});