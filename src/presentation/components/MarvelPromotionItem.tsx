import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Movie } from '../../domain/entities/Movie';

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface Props {
  movies: Movie[];
  onPressMovie: (movie: Movie) => void;
  onPressSearch: () => void;
  loading?: boolean;
}

export const MarvelPromotionItem: React.FC<Props> = ({ 
  movies, 
  onPressMovie, 
  onPressSearch,
  loading = false 
}) => {
  if (loading || movies.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e63946" />
        <Text style={styles.loadingText}>Carregando filmes Marvel...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialIcons name="local-movies" size={24} color="#e63946" />
          <Text style={styles.promotionTitle}>Universo Marvel</Text>
        </View>
        <Text style={styles.promotionSubtitle}>Destaques do Universo Cinematográfico</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.moviesScroll}
        contentContainerStyle={styles.moviesScrollContent}
      >
        {movies.map((movie, index) => (
          <TouchableOpacity 
            key={`${movie.id}-${index}`} 
            style={styles.movieCard}
            onPress={() => onPressMovie(movie)}
          >
            <Image
              source={{
                uri: movie.poster_path
                  ? `${POSTER_BASE_URL}${movie.poster_path}`
                  : 'https://via.placeholder.com/120x180/1a1a2e/ffffff?text=Marvel',
              }}
              style={styles.poster}
              resizeMode="cover"
            />
            
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle} numberOfLines={2}>
                {movie.title}
              </Text>
              
              <View style={styles.ratingContainer}>
                <View style={styles.rating}>
                  <Ionicons name="star" size={12} color="#f39c12" />
                  <Text style={styles.ratingText}>{movie.vote_average.toFixed(1)}</Text>
                </View>
                <Text style={styles.year}>
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.searchButton} onPress={onPressSearch}>
        <Ionicons name="list" size={18} color="#e63946" style={styles.searchIcon} />
        <Text style={styles.searchButtonText}>
          Ver Todos os Filmes Marvel
        </Text>
        <Ionicons name="arrow-forward" size={16} color="#e63946" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginHorizontal: 8,
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#e63946',
  },
  loadingContainer: {
    width: '100%',
    marginHorizontal: 8,
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#e63946',
  },
  loadingText: {
    color: '#fff',
    marginTop: 16,
    fontSize: 14,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  promotionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
  promotionSubtitle: {
    fontSize: 15,
    color: '#e63946',
    fontWeight: '600',
    textAlign: 'center',
  },
  moviesScroll: {
    marginBottom: 20,
  },
  moviesScrollContent: {
    paddingRight: 20,
    paddingLeft: 4,
  },
  movieCard: {
    width: 150,
    marginRight: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  poster: {
    width: 110,
    height: 165,
    borderRadius: 8,
    marginBottom: 10,
  },
  movieInfo: {
    width: '100%',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
    minHeight: 36,
    lineHeight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(243, 156, 18, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#f39c12',
    marginLeft: 2,
  },
  year: {
    fontSize: 11,
    color: '#ccc',
    fontWeight: '600',
  },
  searchButton: {
    backgroundColor: 'rgba(230, 57, 70, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e63946',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchButtonText: {
    color: '#e63946',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 8,
  },
}); 