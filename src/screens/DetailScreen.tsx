import React from 'react';
import {ScrollView, StyleSheet, Image, View} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
  Text,
} from 'react-native-paper';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useMovieDetails} from '../hooks/useMovieDetails';
import {useFavorites} from '../context/FavoritesContext';

type RootStackParamList = {
  Detail: {imdbID: string};
};

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface MovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Runtime: string;
  Genre: string;
  Plot: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Poster: string;
  imdbID: string;
}

const DetailScreen: React.FC = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const {imdbID} = route.params;
  const {movie, loading, error} = useMovieDetails<MovieDetail>(imdbID);
  const {addFavorite, removeFavorite, isFavorite} = useFavorites<MovieDetail>();

  if (loading) {
    return (
      <ActivityIndicator animating={true} size="large" style={styles.loader} />
    );
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  if (!movie) {
    return null;
  }

  const toggleFavorite = () => {
    isFavorite(movie.imdbID)
      ? removeFavorite(movie.imdbID)
      : addFavorite(movie);
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: movie.Poster}}
        style={styles.poster}
        resizeMode="cover"
      />
      <Card style={styles.card}>
        <Card.Content>
          <Title>{movie.Title}</Title>
          <Paragraph>{`${movie.Year} • ${movie.Rated} • ${movie.Runtime}`}</Paragraph>
          <Paragraph style={styles.genre}>{movie.Genre}</Paragraph>
          <Paragraph style={styles.plot}>{movie.Plot}</Paragraph>
          <View style={styles.infoContainer}>
            <InfoItem label="Director" value={movie.Director} />
            <InfoItem label="Actors" value={movie.Actors} />
            <InfoItem label="IMDb Rating" value={movie.imdbRating} />
          </View>
        </Card.Content>
        <Card.Actions>
          <Button
            icon={isFavorite(movie.imdbID) ? 'heart' : 'heart-outline'}
            mode="contained"
            onPress={toggleFavorite}>
            {isFavorite(movie.imdbID)
              ? 'Remove from Favorites'
              : 'Add to Favorites'}
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const InfoItem: React.FC<{label: string; value: string}> = ({label, value}) => (
  <Paragraph>{`${label}: ${value}`}</Paragraph>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  poster: {
    width: '100%',
    height: 300,
  },
  card: {
    margin: 10,
  },
  genre: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  plot: {
    marginVertical: 10,
  },
  infoContainer: {
    marginTop: 10,
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
});

export default DetailScreen;
