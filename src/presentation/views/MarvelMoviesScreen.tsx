import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Movie } from '../../domain/entities/Movie';
import { RootStackParamList } from '../../../App';
import { GetMovieDetailsUseCase } from '../../domain/usecases/GetMoviesDetailsUseCase';
import { MovieListItem } from '../components/MovieListItem';

type Props = NativeStackScreenProps<RootStackParamList, 'MarvelMovies'> & {
  getMovieDetailsUseCase: GetMovieDetailsUseCase;
};

const { width: screenWidth } = Dimensions.get('window');

// Lista oficial de IDs dos filmes do Universo Cinematográfico Marvel (MCU)
const OFFICIAL_MARVEL_MOVIE_IDS = [
  // Fase 1
  1726,   // Iron Man (2008)
  1724,   // The Incredible Hulk (2008)
  10138,  // Iron Man 2 (2010)
  10195,  // Thor (2011)
  1771,   // Captain America: The First Avenger (2011)
  24428,  // The Avengers (2012)
  
  // Fase 2
  68721,  // Iron Man 3 (2013)
  76338,  // Thor: The Dark World (2013)
  100402, // Captain America: The Winter Soldier (2014)
  118340, // Guardians of the Galaxy (2014)
  99861,  // Avengers: Age of Ultron (2015)
  102899, // Ant-Man (2015)
  
  // Fase 3
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
  
  // Fase 4
  497698, // Black Widow (2021)
  566525, // Shang-Chi and the Legend of the Ten Rings (2021)
  524434, // Eternals (2021)
  634649, // Spider-Man: No Way Home (2021)
  453395, // Doctor Strange in the Multiverse of Madness (2022)
  616037, // Thor: Love and Thunder (2022)
  
  // Fase 5
  640146, // Ant-Man and the Wasp: Quantumania (2023)
  447365, // Guardians of the Galaxy Vol. 3 (2023)
  565770, // The Marvels (2023)
  
  // Adicionais importantes
  284053, // Thor: Ragnarok
  284054, // Black Panther
  299536, // Avengers: Infinity War
  299534, // Avengers: Endgame
];

export const MarvelMoviesScreen: React.FC<Props> = ({ navigation, getMovieDetailsUseCase }) => {
  const [marvelMovies, setMarvelMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // Quantidade de filmes para carregar por vez (para não sobrecarregar a API)
  const MOVIES_PER_LOAD = 6;

  useEffect(() => {
    loadMarvelMovies();
  }, []);

  const loadMarvelMovies = async (startIndex: number = 0, isLoadMore: boolean = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      // Pega um lote de IDs para carregar
      const endIndex = Math.min(startIndex + MOVIES_PER_LOAD, OFFICIAL_MARVEL_MOVIE_IDS.length);
      const movieIdsToLoad = OFFICIAL_MARVEL_MOVIE_IDS.slice(startIndex, endIndex);
      
      // Carrega os detalhes de cada filme
      const moviePromises = movieIdsToLoad.map(movieId => 
        getMovieDetailsUseCase.execute(movieId)
      );
      
      const newMovies = await Promise.all(moviePromises);
      
      if (isLoadMore) {
        setMarvelMovies(prev => [...prev, ...newMovies]);
      } else {
        setMarvelMovies(newMovies);
      }
      
      setCurrentIndex(endIndex);
      setError('');
    } catch (err) {
      setError('Falha ao carregar filmes da Marvel');
      console.error('Error loading Marvel movies:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreMovies = () => {
    if (currentIndex < OFFICIAL_MARVEL_MOVIE_IDS.length && !loadingMore) {
      loadMarvelMovies(currentIndex, true);
    }
  };

  const handleMoviePress = (movieId: number) => {
    navigation.navigate('MovieDetails', { movieId });
  };

  // Ordena os filmes por data de lançamento (mais recentes primeiro)
  const sortedMovies = [...marvelMovies].sort((a, b) => 
    new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <MaterialIcons name="local-movies" size={32} color="#e63946" />
        <Text style={styles.title}>Universo Cinematográfico Marvel</Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color="#e63946" />
          <Text style={styles.loadingMoreText}>Carregando mais filmes Marvel...</Text>
        </View>
      );
    }
    
    if (currentIndex >= OFFICIAL_MARVEL_MOVIE_IDS.length) {
      return (
        <View style={styles.completeContainer}>
          <Ionicons name="checkmark-done" size={48} color="#4CAF50" />
          <Text style={styles.completeText}>Coleção Marvel Completa!</Text>
          <Text style={styles.completeSubtext}>
            Todos os {OFFICIAL_MARVEL_MOVIE_IDS.length} filmes do MCU carregados
          </Text>
        </View>
      );
    }
    
    return null;
  };

  if (loading && !loadingMore) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e63946" />
          <Text style={styles.loadingText}>Carregando filmes Marvel...</Text>
          <Text style={styles.loadingSubtext}>
            Iniciando coleção do Universo Cinematográfico Marvel
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && !loadingMore) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={64} color="#e63946" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => loadMarvelMovies(0, false)}>
            <Ionicons name="refresh" size={20} color="#fff" style={styles.retryIcon} />
            <Text style={styles.retryText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={sortedMovies}
        renderItem={({ item, index }) => (
          <View style={styles.movieItemContainer}>
            <MovieListItem
              movie={item}
              onPress={() => handleMoviePress(item.id)}
            />
          </View>
        )}
        keyExtractor={(item) => `marvel-movie-${item.id}`}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.3}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="film-outline" size={64} color="#666" />
            <Text style={styles.emptyText}>Nenhum filme Marvel encontrado</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
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
    marginBottom: 16,
    position: 'relative',
  },
  movieNumber: {
    position: 'absolute',
    top: -8,
    left: -8,
    backgroundColor: '#e63946',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  movieNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 20,
    margin: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 3,
    borderColor: '#e63946',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#e63946',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(230, 57, 70, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#e63946',
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  loadingInfo: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  completeContainer: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    margin: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  completeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 12,
    textAlign: 'center',
  },
  completeSubtext: {
    fontSize: 14,
    color: '#388E3C',
    textAlign: 'center',
    marginTop: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  loadingMoreText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    color: '#e63946',
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 12,
  },
  retryButton: {
    backgroundColor: '#e63946',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#e63946',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginTop: 8,
  },
  retryIcon: {
    marginRight: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
  },
});