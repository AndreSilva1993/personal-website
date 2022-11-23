import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

import type { SpotifyTimeRange, SpotifyTopArtist } from '@src/clients/spotify/spotify.types';

async function fetchTopArtists(
  pageParam: number,
  timeRange: SpotifyTimeRange
): Promise<SpotifyTopArtist[]> {
  const searchParams = new URLSearchParams({
    timeRange,
    page: pageParam.toString(),
  });
  const response = await fetch(`/api/spotify/top-artists?${searchParams}`);

  if (!response.ok) {
    return [];
  }

  const responseBody: SpotifyTopArtist[] = await response.json();
  return responseBody;
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
