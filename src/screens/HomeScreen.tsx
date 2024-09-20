import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {Searchbar, ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import MovieCard from '../components/MovieCard';
import {useMovieSearch} from '../hooks/useMovieSearch';
import {useFocusEffect} from '@react-navigation/native';
import {useFavorites} from '../context/FavoritesContext';

const DEFAULT_SEARCH = 'Marvel';
const SEARCH_DELAY = 300;

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {movies, loading, error, searchMovies} = useMovieSearch(DEFAULT_SEARCH);
  const navigation = useNavigation();
  const {isFavorite} = useFavorites();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchMovies(searchQuery || DEFAULT_SEARCH);
    }, SEARCH_DELAY);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchMovies]);

  useFocusEffect(
    useCallback(() => {
      setSearchQuery(prevQuery => prevQuery);
    }, []),
  );

  const handleSearch = useCallback(() => {
    searchMovies(searchQuery);
  }, [searchQuery, searchMovies]);

  const renderMovieItem = useCallback(
    ({item}) => (
      <MovieCard
        movie={item}
        onPress={() => navigation.navigate('Detail', {imdbID: item.imdbID})}
        isFavorite={isFavorite(item.imdbID)}
      />
    ),
    [navigation, isFavorite],
  );

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator animating size="large" style={styles.loader} />;
    }
    if (error) {
      return <Text style={styles.error}>{error}</Text>;
    }
    if (movies.length === 0) {
      return (
        <Text style={styles.noResults}>
          Tidak ada hasil pencarian ditemukan.
        </Text>
      );
    }
    return (
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        keyExtractor={item => item.imdbID}
        numColumns={2}
        contentContainerStyle={styles.movieList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search movies..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchBar}
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  searchBar: {
    margin: 10,
  },
  movieList: {
    padding: 8,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    textAlign: 'center',
    margin: 10,
    color: 'red',
  },
  noResults: {
    textAlign: 'center',
    margin: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen;
