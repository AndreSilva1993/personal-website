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
  const fetchSearchParams = new URLSearchParams({
    limit: '20',
    time_range: timeRange,
    offset: String(20 * (page - 1)),
  });

  const response = await fetch(
    `${process.env.SPOTIFY_API_URL}/me/top/artists?${fetchSearchParams}`,
    {
      next: { revalidate: 60 * 60 }, // 1 hour cache.
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  if (!response.ok) return [];

  const { items }: SpotifyTopArtistsResponse = await response.json();

  return items.map(({ name, images, external_urls }) => ({
    name,
    link: external_urls.spotify,
    image: images.sort(
      (artistImage, nextArtistImage) => artistImage.height - nextArtistImage.height
    )[1].url,
  }));
};
