import axios from 'axios';
import { useQuery, useInfiniteQuery } from 'react-query';

import type {
  LastFMTopAlbum,
  LastFMTimePeriod,
  LastFMRecentTrack,
} from '@src/clients/last-fm/last-fm.types';

async function fetchTopAlbums(
  pageParam: number,
  timePeriod: LastFMTimePeriod
): Promise<LastFMTopAlbum[]> {
  try {
    const { data } = await axios.get('/api/last-fm/top-albums', {
      params: { page: pageParam, period: timePeriod },
    });
    return data;
  } catch (error) {
    return [];
  }
}

async function fetchRecentTracks(): Promise<LastFMRecentTrack[]> {
  try {
    const { data } = await axios.get('/api/last-fm/recent-tracks');
    return data;
  } catch (error) {
    return [];
  }
}

const useLastFMTopAlbums = (timePeriod: LastFMTimePeriod) =>
  useInfiniteQuery(
    ['last-fm', 'top-albums', timePeriod],
    ({ pageParam }) => fetchTopAlbums(pageParam, timePeriod),
    {
      getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
    }
  );

const useLastFMRecentTracks = () =>
  useQuery(['last-fm', 'recent-tracks'], () => fetchRecentTracks());

export { useLastFMTopAlbums, useLastFMRecentTracks };
