import express from 'express';

import { GetTrending, GetMoviesByCategory, GetTvShowsByCategory, GetMovieDetails, GetTvDetails, DiscoverByGenre, GetGenres, SearchMulti } from '../Controllers/movies.controllers.js';

const router = express.Router();

router.get('/trending', GetTrending);
router.get('/movies/category/:category', GetMoviesByCategory);
router.get('/tv/category/:category', GetTvShowsByCategory);
router.get('/movie/:id', GetMovieDetails);
router.get('/tv/:id', GetTvDetails);
router.get('/discover/:mediaType/:genreId', DiscoverByGenre);
router.get('/genres/:mediaType', GetGenres);
router.get('/search', SearchMulti);

export default router;