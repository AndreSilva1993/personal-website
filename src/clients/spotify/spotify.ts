import axios from 'axios';

import type {
  SpotifyTopArtist,
  SpotifyTimeRange,
  SpotifyTopArtistsResponse,
} from '@src/clients/spotify/spotify.types';

export const getTopArtists = async (
  accessToken: string,
  timeRange: SpotifyTimeRange = 'long_term',
  page: number = 1
): Promise<SpotifyTopArtist[]> => {
  const { data: topArtists } = await axios.get<SpotifyTopArtistsResponse>(
    `${process.env.SPOTIFY_API_URL}/me/top/artists`,
    {
      params: {
        time_range: timeRange,
        limit: 20,
        offset: 20 * (page - 1),
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return topArtists.items.map(({ name, images, external_urls }) => ({
    name,
    link: external_urls.spotify,
    image: images.sort(
      (artistImage, nextArtistImage) => artistImage.height - nextArtistImage.height
    )[1].url,
  }));
};
