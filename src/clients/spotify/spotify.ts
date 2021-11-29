import axios from 'axios';
import { auth, get } from '@upstash/redis';

import type {
  SpotifyTopArtist,
  SpotifyTopArtistsResponse,
} from '@src/clients/spotify/spotify.types';

auth(process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN);

export const getTopArtists = async (): Promise<SpotifyTopArtist[]> => {
  const { data: accessToken } = await get(process.env.SPOTIFY_ACCESS_TOKEN_REDIS_KEY);

  const { data: topArtists } = await axios.get<SpotifyTopArtistsResponse>(
    `${process.env.SPOTIFY_API_URL}/me/top/artists`,
    {
      params: { time_range: 'long_term' },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return topArtists.items.map(({ name, images }) => ({
    name,
    image: images.sort((a, b) => b.height - a.height)[1].url,
  }));
};
