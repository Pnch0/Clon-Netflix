import { useState, useEffect } from 'react';
import { MovieService } from '../../Services/Api.js';
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
              ? `linear-gradient(to top, #141414, transparent 90%), url(${BACKDROP_BASE_URL}${heroMovie.backdrop_path})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="Hero-Info">
            <h1>{heroMovie.title || heroMovie.name}</h1>
            <p>{heroMovie.overview}</p>
          </div>
        </div>
      )}


      <div className="Contenedor-Tendencias">
        <div className="Contenedor-TextoTendecias">
          <h2>Tendencias</h2>
        </div>
        <div className="Contenedor-PeliculasTendencias">
          {trending.map((item) => (
            <div key={item.id} className="Movie-Card">
              <img
                src={item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                alt={item.title || item.name}
              />
              <p>{item.title || item.name}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="Contenedor-Accion">
        <div className="Contenedor-TextoAccion">
          <h2>Acción</h2>
        </div>
        <div className="Contenedor-PeliculasAccion">
          {actionMovies.map((movie) => (
            <div key={movie.id} className="Movie-Card">
              <img
                src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="Contenedor-Series">
        <div className="Contenedor-TextoSeries">
          <h2>Series Populares</h2>
        </div>
        <div className="Contenedor-ListadosSeries">
          {series.map((show) => (
            <div key={show.id} className="Movie-Card">
              <img
                src={show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                alt={show.name}
              />
              <p>{show.name}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="Contenedor-Anime">
        <div className="Contenedor-TextoAnime">
          <h2>Animación</h2>
        </div>
        <div className="Contenedor-ListadosAnime">
          {anime.map((item) => (
            <div key={item.id} className="Movie-Card">
              <img
                src={item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}
                alt={item.name || item.title}
              />
              <p>{item.name || item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;