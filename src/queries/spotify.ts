import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';

import type { SpotifyTopArtist } from '@src/clients/spotify/spotify.types';

async function fetchTopArtists(): Promise<SpotifyTopArtist[]> {
  try {
    const { data } = await axios.get<SpotifyTopArtist[]>('/api/spotify/top-artists');

    return data;
  } catch (error) {
    return [];
  }
}

export const useTopArtists = (options?: UseQueryOptions<SpotifyTopArtist[]>) =>
  useQuery(['spotify', 'top-artists'], () => fetchTopArtists(), options);
