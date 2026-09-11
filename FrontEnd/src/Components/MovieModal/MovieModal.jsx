import { useEffect } from 'react';
import './MovieModal.css';

const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieModal({ item, onClose }) {
  // Bloquear el scroll del fondo cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!item) return null;

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const imagePath = item.backdrop_path ? `${BACKDROP_BASE_URL}${item.backdrop_path}` : (item.poster_path ? `${POSTER_BASE_URL}${item.poster_path}` : 'https://via.placeholder.com/800x450?text=No+Image');

  return (
    <div className="Modal-Overlay" onClick={onClose}>
      <div className="Modal-Content" onClick={(e) => e.stopPropagation()}>
        <button className="Modal-CloseBtn" onClick={onClose}>✕</button>
        
        <div 
          className="Modal-Header" 
          style={{
            backgroundImage: `linear-gradient(to top, #09080D 2%, transparent 80%), url(${imagePath})`
          }}
        >
        </div>

        <div className="Modal-Body">
          <h2 className="Modal-Title">{title}</h2>
          <div className="Modal-Meta">
            <span className="Modal-Rating">⭐ {item.vote_average?.toFixed(1) || 'N/A'}</span>
            {releaseDate && <span className="Modal-Date">{releaseDate.substring(0, 4)}</span>}
            <span className="Modal-Type">{item.media_type === 'tv' ? 'Serie' : 'Película'}</span>
          </div>
          
          <p className="Modal-Overview">
            {item.overview || "No hay una descripción disponible para este título en este momento."}
          </p>
          
          <button className="Modal-PlayBtn">▶ Reproducir</button>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;