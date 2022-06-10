import movies from '@public/movies.json';

import type { MoviesData } from './movies.types';

export const getMovies = (): MoviesData => {
  const genres = Array.from(new Set(movies.flatMap(({ genres }) => genres)));
  const moviesPerGenre = movies.reduce((accumulator, { genres }) => {
    genres.forEach((genre) => {
      accumulator[genre] = (accumulator[genre] || 0) + 1;
    });

    return accumulator;
  }, {});

  return { movies, genres, moviesPerGenre };
};
