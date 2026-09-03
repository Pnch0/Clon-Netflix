import { useState, useEffect } from 'react';
import { MovieService } from '../../Services/Api.js';
import MovieRow from '../../Components/MoviesRow/MovieRow.jsx';
import './MainPage.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

function MainPage() {
  const [heroMovie, setHeroMovie] = useState(null);
  const [trending, setTrending] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);

        const [trendingData, actionData, tvData, animeData] = await Promise.all([
          MovieService.getTrending('all', 'week'),
          MovieService.discoverByGenre('movie', 28),
          MovieService.getTvShowsByCategory('popular'),
          MovieService.discoverByGenre('tv', 16),
        ]);

        const trendingResults = trendingData.results || [];
        setTrending(trendingResults);


        if (trendingResults.length > 0) {
          const randomIndex = Math.floor(Math.random() * trendingResults.length);
          setHeroMovie(trendingResults[randomIndex]);
        }

        setActionMovies(actionData.results || []);
        setSeries(tvData.results || []);
        setAnime(animeData.results || []);
      } catch (error) {
        console.error('Error al cargar el contenido de MainPage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  if (loading) {
    return <div className="Loading">Cargando catálogo...</div>;
  }

  return (
  <div className="Contenedor-MainPage">
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
            <button className="Hero-Btn Btn-Play">
              ▶ Reproducir
            </button>
            <button className="Hero-Btn Btn-Info">
              ℹ Más información
            </button>
          </div>
        </div>
      </div>
    )}


    <MovieRow title="Tendencias" movies={trending} />
    <MovieRow title="Acción" movies={actionMovies} />
    <MovieRow title="Series Populares" movies={series} />
    <MovieRow title="Animación" movies={anime} />
  </div>
);
}

export default MainPage;