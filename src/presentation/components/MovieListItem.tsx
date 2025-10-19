import React from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Movie } from '../../domain/entities/Movie';

const { width: screenWidth } = Dimensions.get('window');
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface Props {
  movie: Movie;
  onPress: () => void;
}

export const MovieListItem: React.FC<Props> = ({ movie, onPress }) => {
  const getYear = (dateString: string) => {
    return dateString ? new Date(dateString).getFullYear() : 'N/A';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={{
            uri: movie.poster_path
              ? `${POSTER_BASE_URL}${movie.poster_path}`
              : 'https://via.placeholder.com/150x225/1a1a2e/ffffff?text=No+Image',
          }}
          style={styles.poster}
          resizeMode="cover"
        />
        
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#f39c12" />
              <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
            </View>
            
            <Text style={styles.year}>
              {getYear(movie.release_date)}
            </Text>
          </View>
        </View>
        
        {/* Badge de destaque para filmes populares */}
        {movie.vote_average > 7.5 && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>TOP</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    height: 260,
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 8,
    lineHeight: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(230, 57, 70, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
  },
  rating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 4,
  },
  year: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#f39c12',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
  },
  popularText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
});