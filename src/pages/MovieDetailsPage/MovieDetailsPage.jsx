import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import './MovieDetailsPage.css';

function MovieDetailsPage() {
  const { imdbID } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadMovie() {
      setError('');
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${encodeURIComponent(imdbID)}`
        );
        const data = await response.json();

        if (data.Response === 'False') {
          setError(data.Error);
        } else if (data.Response === 'True') {
          setMovie(data);
        }
      } catch {
        setError('Не удалось связаться с сервером');
      } finally {
        setIsLoading(false);
      }
    }

    loadMovie();
  }, [imdbID]);

  return (
    <main className="movie-details-page">
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : movie ? (
          <MovieDetails movie={movie} />
        ) : null}
      </div>
    </main>
  );
}

export default MovieDetailsPage;
