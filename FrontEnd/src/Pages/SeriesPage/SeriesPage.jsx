import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MovieService } from '../../Services/Api.js';
import MovieRow from '../../Components/MoviesRow/MovieRow.jsx';
import '../MainPage/MainPage.css'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

function SeriesPage() {
  const [heroSeries, setHeroSeries] = useState(null);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [actionSeries, setActionSeries] = useState([]);
  const [suspenseSeries, setSuspenseSeries] = useState([]);
  const [animeSeries, setAnimeSeries] = useState([]);
  const [kdramas, setKdramas] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const [trendingData, actionData, suspenseData, animeData, kdramadata] = await Promise.all([
          MovieService.getTvShowsByCategory('popular'), 
          MovieService.discoverByGenre('tv', 10759),    
          MovieService.discoverByGenre('tv', 9648),     
          MovieService.discoverByGenre('tv', 16),       
          MovieService.getKdramas(),
        ]);

        const trendingResults = trendingData.results || [];
        setTrendingSeries(trendingResults);

        if (trendingResults.length > 0) {
          const randomIndex = Math.floor(Math.random() * trendingResults.length);
          setHeroSeries(trendingResults[randomIndex]);
        }

        setActionSeries(actionData.results || []);
        setSuspenseSeries(suspenseData.results || []);
        setAnimeSeries(animeData.results || []);
        setKdramas(kdramadata.results || []); 
      } catch (error) {
        console.error('Error al cargar catálogo de series:', error.message);
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
          (item) => item.poster_path && item.media_type === 'tv'
        );
        setSearchResults(cleanResults);
      } catch (error) {
        console.error('Error al buscar series:', error.message);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const delayDebounce = setTimeout(executeSearch, 350);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  if (loading) {
    return <div className="Loading">Cargando series...</div>;
  }

  return (
    <div className="Contenedor-MainPage">
      {query ? (
        <div className="Contenedor-Resultados-Busqueda">
          <h2 className="Titulo-Resultados">
            Resultados de series para: <span>"{query}"</span>
          </h2>

          {isSearching ? (
            <div className="Loading">Buscando "{query}"...</div>
          ) : searchResults.length > 0 ? (
            <div className="Grid-Peliculas-Busqueda">
              {searchResults.map((series) => (
                <div key={series.id} className="Tarjeta-Pelicula-Busqueda">
                  <img
                    src={`${IMAGE_BASE_URL}${series.poster_path}`}
                    alt={series.name || series.title}
                    className="Poster-Busqueda"
                  />
                  <p className="Titulo-Pelicula-Busqueda">
                    {series.name || series.title}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="Sin-Resultados">
              No se encontraron series para "{query}"
            </p>
          )}
        </div>
      ) : (
        <>
          {heroSeries && (
            <div
              className="Contenedor-PeliculaPrincipal"
              style={{
                backgroundImage: heroSeries.backdrop_path
                  ? `linear-gradient(to right, rgba(5, 4, 6, 0.95) 20%, rgba(5, 4, 6, 0.4) 60%, transparent 100%), 
                     linear-gradient(to top, #050406 5%, transparent 60%), 
                     url(${BACKDROP_BASE_URL}${heroSeries.backdrop_path})`
                  : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
            >
              <div className="Hero-Info">
                <h1 className="Hero-Title">{heroSeries.name || heroSeries.title}</h1>
                <p className="Hero-Overview">{heroSeries.overview}</p>
                <div className="Hero-Buttons">
                  <button className="Hero-Btn Btn-Play">▶ Reproducir</button>
                  <button className="Hero-Btn Btn-Info">ℹ Más información</button>
                </div>
              </div>
            </div>
          )}

        <MovieRow title="Series en Tendencia" movies={trendingSeries} />
        <MovieRow title="Series de Acción" movies={actionSeries} />
        <MovieRow title="Suspenso y Misterio" movies={suspenseSeries} />
        <MovieRow title="K-Dramas" movies={kdramas} />
        <MovieRow title="Anime" movies={animeSeries} />
        </>
      )}
    </div>
  );
}

export default SeriesPage;