import { useQuery, useInfiniteQuery } from 'react-query';

import type { UseQueryOptions, UseInfiniteQueryOptions } from 'react-query';
import type {
  LastFMTopAlbum,
  LastFMTimePeriod,
  LastFMRecentTrack,
} from '@src/clients/last-fm/last-fm.types';

async function fetchTopAlbums(
  pageParam: number,
  timePeriod: LastFMTimePeriod
): Promise<LastFMTopAlbum[]> {
  const fetchSearchParams = new URLSearchParams({
    page: pageParam.toString(),
    period: timePeriod,
  });

  const response = await fetch(`/api/last-fm/top-albums?${fetchSearchParams}`);

  if (!response.ok) {
    return [];
  }

  const responseBody: LastFMTopAlbum[] = await response.json();

  return responseBody;
}

async function fetchRecentTracks(): Promise<LastFMRecentTrack[]> {
  const response = await fetch('/api/last-fm/recent-tracks');

  if (!response.ok) {
    return [];
  }

  const responseBody: LastFMRecentTrack[] = await response.json();
  return responseBody;
}

const useLastFMTopAlbums = (
  timePeriod: LastFMTimePeriod,
  options?: UseInfiniteQueryOptions<LastFMTopAlbum[]>
) =>
  useInfiniteQuery(
    ['last-fm', 'top-albums', timePeriod],
    ({ pageParam }) => fetchTopAlbums(pageParam, timePeriod),
    {
      getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
      ...options,
    }
  );

const useLastFMRecentTracks = (options?: UseQueryOptions<LastFMRecentTrack[]>) =>
  useQuery(['last-fm', 'recent-tracks'], () => fetchRecentTracks(), options);

export { useLastFMTopAlbums, useLastFMRecentTracks };
