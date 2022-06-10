import axios from 'axios';
import { useQuery } from 'react-query';

import type { UseQueryOptions } from 'react-query';
import type { MoviesData } from '@src/clients/movies/movies.types';
import { useTranslation } from 'react-i18next';

async function fetchMovies(): Promise<MoviesData> {
  const { data } = await axios.get<MoviesData>('/api/movies');

  return data;
}

const useMovies = (options: UseQueryOptions<MoviesData> = {}) => {
  const { t } = useTranslation();

  return useQuery<MoviesData>(['movies'], fetchMovies, {
    ...options,
    select: ({ movies, genres, moviesPerGenre }) => ({
      genres,
      moviesPerGenre,
      movies: movies.map(({ title, ...rest }) => ({ ...rest, title: t(title) })),
    }),
  });
};

export { useMovies };
