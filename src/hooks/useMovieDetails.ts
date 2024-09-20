import { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/api';

export const useMovieDetails = (imdbID: string) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getMovieDetails(imdbID);
        setMovie(result);
      } catch (err) {
        setError('Error fetching movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  return { movie, loading, error };
};
