import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Movie } from '../../domain/entities/Movie';
import { GetMovieDetailsUseCase } from '../../domain/usecases/GetMoviesDetailsUseCase';
import { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'MovieDetails'> & {
  getMovieDetailsUseCase: GetMovieDetailsUseCase;
};

const { width: screenWidth } = Dimensions.get('window');
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w780';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const MovieDetailsScreen: React.FC<Props> = ({ route, getMovieDetailsUseCase, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMovieDetails();
  }, [movieId]);

  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const movieDetails = await getMovieDetailsUseCase.execute(movieId);
      setMovie(movieDetails);
    } catch (err) {
      setError('Falha ao carregar detalhes do filme');
      console.error('Error loading movie details:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Não informada';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getYear = (dateString: string) => {
    return dateString ? new Date(dateString).getFullYear() : 'N/A';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#e63946" />
          <Text style={styles.loadingText}>Carregando detalhes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={64} color="#e63946" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadMovieDetails}>
            <Ionicons name="refresh" size={20} color="#fff" style={styles.retryIcon} />
            <Text style={styles.retryText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!movie) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Ionicons name="film-outline" size={64} color="#666" />
          <Text style={styles.errorText}>Filme não encontrado</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Backdrop Image with Gradient */}
        {movie.backdrop_path && (
          <View style={styles.backdropContainer}>
            <Image
              source={{ uri: `${BACKDROP_BASE_URL}${movie.backdrop_path}` }}
              style={styles.backdrop}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
              style={styles.backdropGradient}
            />
            
          </View>
        )}
        
        <View style={styles.content}>
          <View style={styles.headerCard}>
            <View style={styles.posterContainer}>
              {movie.poster_path ? (
                <Image
                  source={{ uri: `${POSTER_BASE_URL}${movie.poster_path}` }}
                  style={styles.poster}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.posterPlaceholder}>
                  <Ionicons name="film-outline" size={40} color="#ccc" />
                  <Text style={styles.posterPlaceholderText}>Sem imagem</Text>
                </View>
              )}
              
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={16} color="#f39c12" />
                <Text style={styles.ratingBadgeText}>{movie.vote_average.toFixed(1)}</Text>
              </View>
            </View>
            
            <View style={styles.basicInfo}>
              <Text style={styles.title}>{movie.title}</Text>
              
              {movie.release_date && (
                <View style={styles.yearContainer}>
                  <MaterialIcons name="date-range" size={16} color="#666" />
                  <Text style={styles.year}>{getYear(movie.release_date)}</Text>
                </View>
              )}
              
              <View style={styles.ratingContainer}>
                <View style={styles.ratingItem}>
                  <Text style={styles.ratingLabel}>Avaliação</Text>
                  <Text style={styles.ratingValue}>{movie.vote_average.toFixed(1)}/10</Text>
                </View>
                
                <View style={styles.ratingDivider} />
                
                <View style={styles.ratingItem}>
                  <Text style={styles.ratingLabel}>Votos</Text>
                  <Text style={styles.ratingValue}>{movie.vote_count.toLocaleString()}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="description" size={20} color="#e63946" />
              <Text style={styles.sectionTitle}>Sinopse</Text>
            </View>
            <Text style={styles.overview}>
              {movie.overview || 'Sinopse não disponível para este filme.'}
            </Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="info" size={20} color="#e63946" />
              <Text style={styles.sectionTitle}>Informações</Text>
            </View>
            
            <View style={styles.additionalInfo}>
              <View style={styles.infoItem}>
                <MaterialIcons name="calendar-today" size={18} color="#666" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Data de Lançamento</Text>
                  <Text style={styles.infoValue}>{formatDate(movie.release_date)}</Text>
                </View>
              </View>
              
              <View style={styles.infoDivider} />
              
              <View style={styles.infoItem}>
                <Ionicons name="stats-chart" size={18} color="#666" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Popularidade</Text>
                  <Text style={styles.infoValue}>{Math.round(movie.vote_average * 10)}%</Text>
                </View>
              </View>
              
              <View style={styles.infoDivider} />
              
              <View style={styles.infoItem}>
                <Ionicons name="people" size={18} color="#666" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Total de Votos</Text>
                  <Text style={styles.infoValue}>{movie.vote_count.toLocaleString()}</Text>
                </View>
              </View>
            </View>
          </View>

          {movie.vote_average > 7.5 && (
            <View style={styles.qualityBadge}>
              <MaterialIcons name="verified" size={20} color="#f39c12" />
              <Text style={styles.qualityText}>Filme Bem Avaliado</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backdropContainer: {
    position: 'relative',
    height: 280,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  content: {
    padding: 20,
    marginTop: -40,
  },
  headerCard: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    marginTop: -80,
  },
  posterContainer: {
    position: 'relative',
    marginRight: 16,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 16,
  },
  posterPlaceholder: {
    width: 120,
    height: 180,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  posterPlaceholderText: {
    marginTop: 8,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#e63946',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  ratingBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 2,
  },
  basicInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 8,
    lineHeight: 26,
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  year: {
    fontSize: 16,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
  },
  ratingItem: {
    flex: 1,
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  ratingDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  sectionCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginLeft: 8,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'left',
  },
  infoCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  additionalInfo: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 4,
  },
  qualityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(243, 156, 18, 0.1)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f39c12',
    marginBottom: 20,
  },
  qualityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f39c12',
    marginLeft: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
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
});