import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieService } from '../../Services/Api.js';
import MovieRow from '../../Components/MoviesRow/MovieRow.jsx';
import MovieModal from '../../Components/MovieModal/MovieModal.jsx';
import '../MainPage/MainPage.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

function MoviesPage() {
  const [heroMovie, setHeroMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const [
          trendingData, 
          actionData, 
          dramaData, 
          horrorData, 
          romanceData, 
          animationData
        ] = await Promise.all([
          MovieService.getMoviesByCategory('popular'),
          MovieService.discoverByGenre('movie', 28),
          MovieService.discoverByGenre('movie', 18),
          MovieService.discoverByGenre('movie', 27),
          MovieService.discoverByGenre('movie', 10749),
          MovieService.discoverByGenre('movie', 16),
        ]);

        const trendingResults = trendingData.results || [];
        setTrendingMovies(trendingResults);

        if (trendingResults.length > 0) {
          const randomIndex = Math.floor(Math.random() * trendingResults.length);
          setHeroMovie(trendingResults[randomIndex]);
        }

        setActionMovies(actionData.results || []);
        setDramaMovies(dramaData.results || []);
        setHorrorMovies(horrorData.results || []);
        setRomanceMovies(romanceData.results || []);
        setAnimationMovies(animationData.results || []);

      } catch (error) {
        console.error('Error al cargar catálogo de películas:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    const executeSearch = async () => {
      try {
        const response = await MovieService.searchMulti(trimmedQuery);
        const cleanResults = (response.results || []).filter(
          (item) => item.poster_path && item.media_type === 'movie'
        );
        setSearchResults(cleanResults);
      } catch (error) {
        console.error('Error al buscar películas:', error.message);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const delayDebounce = setTimeout(executeSearch, 350);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (loading) {
    return <div className="Loading">Cargando películas...</div>;
  }

  return (
    <div className="Contenedor-MainPage">
      {query ? (
        <div className="Contenedor-Resultados-Busqueda">
          <h2 className="Titulo-Resultados">
            Resultados de películas para: <span>"{query}"</span>
          </h2>

          {isSearching ? (
            <div className="Loading">Buscando "{query}"...</div>
          ) : searchResults.length > 0 ? (
            <div className="Grid-Peliculas-Busqueda">
              {searchResults.map((movie) => (
                <div 
                  key={movie.id} 
                  className="Tarjeta-Pelicula-Busqueda"
                  onClick={() => setSelectedItem(movie)}
                >
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="Poster-Busqueda"
                  />
                  <p className="Titulo-Pelicula-Busqueda">
                    {movie.title || movie.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="Sin-Resultados">
              No se encontraron películas para "{query}"
            </p>
          )}
        </div>
      ) : (
        <>
          {heroMovie && (
            <div
              className="Contenedor-PeliculaPrincipal"
              style={{
                backgroundImage: heroMovie.backdrop_path
                  ? `linear-gradient(to right, rgba(5, 4, 6, 0.95) 20%, rgba(5, 4, 6, 0.4) 60%, transparent 100%), 
                     linear-gradient(to top, #050406 5%, transparent 60%), 
                     url(${BACKDROP_BASE_URL}${heroMovie.backdrop_path})`
                  : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
            >
              <div className="Hero-Info">
                <h1 className="Hero-Title">{heroMovie.title || heroMovie.name}</h1>
                <p className="Hero-Overview">{heroMovie.overview}</p>
                <div className="Hero-Buttons">
                  <button className="Hero-Btn Btn-Play">▶ Reproducir</button>
                  <button 
                    className="Hero-Btn Btn-Info"
                    onClick={() => setSelectedItem(heroMovie)}
                  >
                    ℹ Más información
                  </button>
                </div>
              </div>
            </div>
          )}

          <MovieRow title="Tendencias" movies={trendingMovies} onItemClick={setSelectedItem} />
          <MovieRow title="Acción y Aventura" movies={actionMovies} onItemClick={setSelectedItem} />
          <MovieRow title="Drama" movies={dramaMovies} onItemClick={setSelectedItem} />
          <MovieRow title="Terror y Suspenso" movies={horrorMovies} onItemClick={setSelectedItem} />
          <MovieRow title="Romance" movies={romanceMovies} onItemClick={setSelectedItem} />
          <MovieRow title="Animación" movies={animationMovies} onItemClick={setSelectedItem} />
        </>
      )}

      {selectedItem && (
        <MovieModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
}

export default MoviesPage;