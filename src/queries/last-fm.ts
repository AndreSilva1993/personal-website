import axios from 'axios';
import { useQuery, useInfiniteQuery } from 'react-query';

import type { UseQueryOptions, UseInfiniteQueryOptions } from 'react-query';
import type {
  LastFMUserInfo,
  LastFMTopAlbum,
  LastFMTimePeriod,
  LastFMRecentTrack,
} from '@src/clients/last-fm/last-fm.types';

async function fetchTopAlbums(
  pageParam: number,
  timePeriod: LastFMTimePeriod
): Promise<LastFMTopAlbum[]> {
  try {
    const { data } = await axios.get<LastFMTopAlbum[]>('/api/last-fm/top-albums', {
      params: { page: pageParam, period: timePeriod },
    });
    return data;
  } catch (error) {
    return [];
  }
}

async function fetchRecentTracks(): Promise<LastFMRecentTrack[]> {
  try {
    const { data } = await axios.get<LastFMRecentTrack[]>('/api/last-fm/recent-tracks');
    return data;
  } catch (error) {
    return [];
  }
}

async function fetchUserInfo(): Promise<LastFMUserInfo> {
  try {
    const { data } = await axios.get<LastFMUserInfo>('/api/last-fm/user-info');
    return data;
  } catch (error) {
    return { playCount: 0, lovedTracksCount: 0, artistsCount: 0, albumsCount: 0 };
  }
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

const useLastFMUserInfo = () => useQuery(['last-fm', 'user-info'], () => fetchUserInfo());

export { useLastFMTopAlbums, useLastFMRecentTracks, useLastFMUserInfo };
