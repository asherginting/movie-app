import { useState, useEffect, useCallback } from 'react';
import { searchMovies } from '../services/api';

export const useMovieSearch = (initialQuery: string) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await searchMovies(query);
      setMovies(result);
    } catch (err) {
      setError('Error fetching movies');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(initialQuery);
  }, [initialQuery, fetchMovies]);

  return { movies, loading, error, searchMovies: fetchMovies };
};
