import axios from 'axios';
import { useQuery } from 'react-query';

import type { UseQueryOptions } from 'react-query';
import type { MoviesData } from '@src/clients/movies/movies.types';

async function fetchMovies(): Promise<MoviesData> {
  const { data } = await axios.get<MoviesData>('/api/movies');

  return data;
}

const useMovies = (options: UseQueryOptions<MoviesData> = {}) =>
  useQuery<MoviesData>(['movies'], fetchMovies, options);

export { useMovies };
