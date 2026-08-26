import { tmdbService } from "../Services/tmdb.service.js";

export const GetTrending = async (req, res) => {
  const { mediaType = "all", timeWindow = "week" } = req.query;

  try {
    const data = await tmdbService.getTrending(mediaType, timeWindow);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error en GetTrending: ", error.message);
    return res.status(500).json({
      error: "Error al obtener las tendencias",
      detalle: error.message,
    });
  }
};


export const GetMoviesByCategory = async (req, res) => {
  const { category = "popular" } = req.params;
  const { page = 1 } = req.query;

  try {
    const data = await tmdbService.getMoviesByCategory(category, page);
    return res.status(200).json(data);
  } catch (error) {
    console.error(`Error en GetMoviesByCategory (${category}): `, error.message);
    return res.status(500).json({
      error: `Error al obtener películas de la categoría ${category}`,
      detalle: error.message,
    });
  }
};


export const GetTvShowsByCategory = async (req, res) => {
  const { category = "popular" } = req.params;
  const { page = 1 } = req.query;

  try {
    const data = await tmdbService.getTvShowsByCategory(category, page);
    return res.status(200).json(data);
  } catch (error) {
    console.error(`Error en GetTvShowsByCategory (${category}): `, error.message);
    return res.status(500).json({
      error: `Error al obtener series de la categoría ${category}`,
      detalle: error.message,
    });
  }
};


export const GetMovieDetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "El ID de la película es obligatorio." });
  }

  try {
    const data = await tmdbService.getMovieDetails(id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(`Error en GetMovieDetails (ID: ${id}): `, error.message);
    return res.status(error.response?.status || 500).json({
      error: "Error al obtener los detalles de la película",
      detalle: error.message,
    });
  }
};


export const GetTvDetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "El ID de la serie es obligatorio." });
  }

  try {
    const data = await tmdbService.getTvDetails(id);
    return res.status(200).json(data);
  } catch (error) {
    console.error(`Error en GetTvDetails (ID: ${id}): `, error.message);
    return res.status(error.response?.status || 500).json({
      error: "Error al obtener los detalles de la serie",
      detalle: error.message,
    });
  }
};


export const DiscoverByGenre = async (req, res) => {
  const { mediaType = "movie", genreId } = req.params;
  const { page = 1 } = req.query;

  if (!genreId) {
    return res.status(400).json({ error: "El ID del género es obligatorio." });
  }

  try {
    const data = await tmdbService.discoverByGenre(mediaType, genreId, page);
    return res.status(200).json(data);
  } catch (error) {
    console.error(`Error en DiscoverByGenre (${mediaType} / ${genreId}): `, error.message);
    return res.status(500).json({
      error: "Error al filtrar por género",
      detalle: error.message,
    });
  }
};


export const GetGenres = async (req, res) => {
  const { mediaType = "movie" } = req.params;

  try {
    const genres = await tmdbService.getGenres(mediaType);
    return res.status(200).json(genres);
  } catch (error) {
    console.error(`Error en GetGenres (${mediaType}): `, error.message);
    return res.status(500).json({
      error: "Error al obtener la lista de géneros",
      detalle: error.message,
    });
  }
};

export const SearchMulti = async (req, res) => {
  const { query, page = 1 } = req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Debes ingresar un término de búsqueda." });
  }

  try {
    const data = await tmdbService.searchMulti(query, page);
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error en SearchMulti: ", error.message);
    return res.status(500).json({
      error: "Error en la búsqueda",
      detalle: error.message,
    });
  }
};