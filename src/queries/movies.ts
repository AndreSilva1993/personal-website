import axios from 'axios';
import { useQuery } from 'react-query';

import type { UseQueryOptions } from 'react-query';

import type { IMovie } from '@src/components/Movies/Movies.types';

async function fetchMovies(): Promise<IMovie[]> {
  const { data } = await axios.get<IMovie[]>('/api/movies');

  return data;
}

const useMovies = (options: UseQueryOptions<IMovie[]> = {}) =>
  useQuery<IMovie[]>(['movies'], fetchMovies, options);

export { useMovies };
