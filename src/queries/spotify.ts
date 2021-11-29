import axios from 'axios';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

import type { SpotifyTimeRange, SpotifyTopArtist } from '@src/clients/spotify/spotify.types';

async function fetchTopArtists(
  pageParam: number,
  timeRange: SpotifyTimeRange
): Promise<SpotifyTopArtist[]> {
  try {
    const { data } = await axios.get<SpotifyTopArtist[]>('/api/spotify/top-artists', {
      params: { page: pageParam, timeRange },
    });

    return data;
  } catch (error) {
    return [];
  }
}

export const useTopArtists = (
  timeRange: SpotifyTimeRange,
  options?: UseInfiniteQueryOptions<SpotifyTopArtist[]>
) =>
  useInfiniteQuery(
    ['spotify', 'top-artists', timeRange],
    ({ pageParam }) => fetchTopArtists(pageParam, timeRange),
    {
      getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
      ...options,
    }
  );
