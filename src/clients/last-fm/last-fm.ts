import type {
  LastFMTimePeriod,
  LastFMTopAlbum,
  LastFMRecentTrack,
  LastFMTopAlbumsResponse,
  LastFMRecentTracksResponse,
} from './last-fm.types';

async function requestLastFM<T>(
  searchParams: Record<string, string | number>,
  cacheDuration: number
) {
  const fetchSearchParams = new URLSearchParams({
    format: 'json',
    user: process.env.LAST_FM_API_USER!,
    api_key: process.env.LAST_FM_API_KEY!,
    ...searchParams,
  });
  const response = await fetch(`${process.env.LAST_FM_API_URL}?${fetchSearchParams}`, {
    next: { revalidate: cacheDuration },
  });

  if (!response.ok) {
    return [] as T;
  }

  const responseBody: T = await response.json();
  return responseBody;
}

export const getTopAlbums = async (
  page: number = 1,
  period: LastFMTimePeriod = 'overall'
): Promise<LastFMTopAlbum[]> => {
  try {
    const { topalbums } = await requestLastFM<LastFMTopAlbumsResponse>(
      { method: 'user.gettopalbums', page, period, limit: 20 },
      60 * 60 // 1 hour cache.
    );

    return topalbums.album.map(({ name, artist, image, playcount }) => ({
      name,
      artist: artist.name,
      playCount: playcount,
      image: image.find(({ size }) => size === 'extralarge')!['#text'],
    }));
  } catch (error) {
    return [];
  }
};

export const getRecentTracks = async (): Promise<LastFMRecentTrack[]> => {
  try {
    const { recenttracks } = await requestLastFM<LastFMRecentTracksResponse>(
      { method: 'user.getrecenttracks', limit: 20 },
      5 * 60 // 5 minutes cache.
    );

    return recenttracks.track.map(({ name, artist, image, album, date }) => ({
      name,
      album: album['#text'],
      artist: artist['#text'],
      unixTimestamp: date?.uts || undefined,
      image: image.find(({ size }) => size === 'extralarge')!['#text'],
    }));
  } catch (error) {
    return [];
  }
};
