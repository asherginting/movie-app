import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Button} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';
import {useFavorites} from '../context/FavoritesContext';

type Movie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

type RootStackParamList = {
  Favorite: undefined;
  Detail: {imdbID: string};
};

type FavoriteScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Favorite'
>;

type Props = {
  navigation: FavoriteScreenNavigationProp;
};

const FavoriteScreen: React.FC<Props> = ({navigation}) => {
  const {favorites, removeFavorite} = useFavorites();

  useFocusEffect(
    useCallback(() => {
    }, []),
  );

  const renderFavoriteItem = ({item}: {item: Movie}) => (
    <Card style={styles.card}>
      <Card.Cover
        source={{
          uri:
            item.Poster !== 'N/A'
              ? item.Poster
              : 'https://via.placeholder.com/300x450',
        }}
      />
      <Card.Content>
        <Title numberOfLines={1}>{item.Title}</Title>
        <Paragraph>{item.Year}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Button
          mode="text"
          compact={true}
          onPress={() => navigation.navigate('Detail', {imdbID: item.imdbID})}
          style={styles.button}
        >
          Detail
        </Button>
        <Button
          mode="text"
          compact={true}
          onPress={() => removeFavorite(item.imdbID)}
          style={styles.button}
          color="red"
        >
          Remove
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={item => item.imdbID}
          numColumns={2}
          contentContainerStyle={styles.favoriteList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Title>No favorites yet</Title>
          <Paragraph>Start adding movies to your favorites!</Paragraph>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  favoriteList: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardActions: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  button: {
    minWidth: 0,
    paddingHorizontal: 8,
  },
});

export default FavoriteScreen;
