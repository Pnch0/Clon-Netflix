import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;
const API_TOKEN = process.env.TMDB_API_TOKEN;

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && {
      Authorization: `Bearer ${API_TOKEN}`,
    }),
  },
  params: {
    language: 'es-ES',
    ...(!API_TOKEN && API_KEY ? { api_key: API_KEY } : {}),
  },
});

export const tmdbService = {
  getTrending: async (mediaType = 'all', timeWindow = 'week') => {
    const { data } = await tmdbClient.get(`/trending/${mediaType}/${timeWindow}`);
    return data.results;
  },


  getMoviesByCategory: async (category = 'popular', page = 1) => {
    const { data } = await tmdbClient.get(`/movie/${category}`, { params: { page } });
    return data;
  },

  getTvShowsByCategory: async (category = 'popular', page = 1) => {
    const { data } = await tmdbClient.get(`/tv/${category}`, { params: { page } });
    return data;
  },

  getMovieDetails: async (movieId) => {
    const { data } = await tmdbClient.get(`/movie/${movieId}`, {
      params: { append_to_response: 'videos,credits,similar' },
    });
    return data;
  },

  getTvDetails: async (tvId) => {
    const { data } = await tmdbClient.get(`/tv/${tvId}`, {
      params: { append_to_response: 'videos,credits,similar' },
    });
    return data;
  },

  discoverByGenre: async (mediaType = 'movie', genreId, page = 1) => {
    const { data } = await tmdbClient.get(`/discover/${mediaType}`, {
      params: { with_genres: genreId, page },
    });
    return data;
  },


  getGenres: async (mediaType = 'movie') => {
    const { data } = await tmdbClient.get(`/genre/${mediaType}/list`);
    return data.genres;
  },

  searchMulti: async (query, page = 1) => {
    const { data } = await tmdbClient.get('/search/multi', {
      params: { query, page, include_adult: false },
    });
    return data;
  },
};