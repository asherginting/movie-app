import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper';
import {useFavorites} from '../context/FavoritesContext';

type MovieCardProps = {
  movie: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  };
  onPress: () => void;
};

const MovieCard: React.FC<MovieCardProps> = ({movie, onPress}) => {
  const {isFavorite} = useFavorites();

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover
        source={{
          uri:
            movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/300x450',
        }}
      />
      <Card.Content>
        <Title numberOfLines={1}>{movie.Title}</Title>
        <Paragraph>{movie.Year}</Paragraph>
        {isFavorite(movie.imdbID) && <Paragraph>❤️ Favorite</Paragraph>}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    flex: 1,
  },
});

export default MovieCard;
