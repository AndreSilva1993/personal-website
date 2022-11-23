import { useQuery } from 'react-query';

import type { UseQueryOptions } from 'react-query';
import type { MoviesData } from '@src/clients/movies/movies.types';

async function fetchMovies(): Promise<MoviesData> {
  const response = await fetch('/api/movies');

  const responseBody: MoviesData = await response.json();
  return responseBody;
}

const useMovies = (options: UseQueryOptions<MoviesData> = {}) => {
  return useQuery<MoviesData>(['movies'], fetchMovies, options);
};

export { useMovies };
