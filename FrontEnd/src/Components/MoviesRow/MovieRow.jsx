import { useRef } from 'react';
import './MovieRow.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieRow({ title, movies, onItemClick }) {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;

      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="Row-Container">
      <h2 className="Row-Title">{title}</h2>

      <div className="Row-Wrapper">
        <button
          className="Slider-Arrow left"
          onClick={() => handleScroll('left')}
          aria-label="Ver anteriores"
        >
          ‹
        </button>

        <div className="Row-Cards" ref={rowRef}>
          {movies.map((item) => (
            <div 
              key={item.id} 
              className="Movie-Card"
              onClick={() => onItemClick(item)}
            >
              <img
                src={
                  item.poster_path
                    ? `${IMAGE_BASE_URL}${item.poster_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image'
                }
                alt={item.title || item.name}
              />
              <p>{item.title || item.name}</p>
            </div>
          ))}
        </div>

        <button
          className="Slider-Arrow right"
          onClick={() => handleScroll('right')}
          aria-label="Ver siguientes"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default MovieRow;