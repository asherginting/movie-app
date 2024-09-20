import axios from 'axios';

const API_KEY = 'c897f37b';
const BASE_URL = 'http://www.omdbapi.com/';

export const searchMovies = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    return response.data.Search || [];
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};

export const getMovieDetails = async (imdbID: string) => {
  try {
    const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movie details');
  }
};
