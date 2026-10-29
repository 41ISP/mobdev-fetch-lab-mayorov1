import { useState } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import './HomePage.css';


function HomePage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function searchMovies() {
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.Response === 'False') {
        setError(data.Error);
      } else if (data.Response === 'True') {
        setMovies(data.Search);
      }
    } catch {
      setError('Не удалось связаться с сервером');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={searchMovies}
        />

        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <MovieList movies={movies} />
          )}
        </section>
      </div>
    </main>
  );
}

export default HomePage;
