import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { MovieListScreen } from './src/presentation/views/MovieListScreen';
import { MovieDetailsScreen } from './src/presentation/views/MovieDetailsScreen';
import { MarvelMoviesScreen } from './src/presentation/views/MarvelMoviesScreen';
import { GetMoviesUseCase } from './src/domain/usecases/GetMoviesUseCase';
import { SearchMoviesUseCase } from './src/domain/usecases/SearchMoviesUseCase';
import { GetMovieDetailsUseCase } from './src/domain/usecases/GetMoviesDetailsUseCase';
import { MovieRepositoryImpl } from './src/data/repositories/MovieRepositoryImpl';
import { TMDBDataSource } from './src/data/datasources/TMDBDataSource';

export type RootStackParamList = {
  MovieList: { autoSearch?: string };
  MovieDetails: { movieId: number };
  MarvelMovies: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#e63946',
    background: '#ffffff',
    card: '#1a1a2e',
    text: '#ffffff',
    border: '#e63946',
  },
};
const movieDataSource = new TMDBDataSource();
const movieRepository = new MovieRepositoryImpl(movieDataSource);
const getMoviesUseCase = new GetMoviesUseCase(movieRepository);
const searchMoviesUseCase = new SearchMoviesUseCase(movieRepository);
const getMovieDetailsUseCase = new GetMovieDetailsUseCase(movieRepository);

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#1a1a2e" 
      />
      <Stack.Navigator
        initialRouteName="MovieList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a2e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerShadowVisible: true,
          contentStyle: {
            backgroundColor: '#f8f9fa',
          },
        }}
      >
        <Stack.Screen
          name="MovieList"
          options={{
            title: 'Viva Decora Filmes',
            headerTitleAlign: 'center',
          }}
        >
          {(props) => (
            <MovieListScreen
              {...props}
              getMoviesUseCase={getMoviesUseCase}
              searchMoviesUseCase={searchMoviesUseCase}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="MovieDetails"
          options={{
            title: 'Detalhes do Filme',
            headerTitleAlign: 'center',
            headerBackTitle: 'Voltar',
          }}
        >
          {(props) => (
            <MovieDetailsScreen
              {...props}
              getMovieDetailsUseCase={getMovieDetailsUseCase}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="MarvelMovies"
          options={{
            title: 'Filmes Marvel',
            headerTitleAlign: 'center',
            headerBackTitle: 'Voltar',
          }}
        >
          {(props) => (
            <MarvelMoviesScreen
              {...props}
              getMovieDetailsUseCase={getMovieDetailsUseCase}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}