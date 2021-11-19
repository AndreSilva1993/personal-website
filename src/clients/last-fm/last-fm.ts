import axios from 'axios';

import type {
  LastFMTimePeriod,
  LastFMTopAlbum,
  LastFMRecentTrack,
  LastFMTopAlbumsResponse,
  LastFMRecentTracksResponse,
} from './last-fm.types';

const lastFMClient = axios.create({
  baseURL: process.env.LAST_FM_API_URL,
  params: {
    format: 'json',
    user: process.env.LAST_FM_API_USER,
    api_key: process.env.LAST_FM_API_KEY,
  },
});

export const getTopAlbums = async ({
  page = 1,
  period = 'overall',
}: {
  page: number;
  period: LastFMTimePeriod;
}): Promise<LastFMTopAlbum[]> => {
  try {
    const { data } = await lastFMClient.get<LastFMTopAlbumsResponse>('', {
      params: { method: 'user.gettopalbums', page, period, limit: 20 },
    });

    return data.topalbums.album.map(({ name, artist, image, playcount }) => ({
      name,
      artist: artist.name,
      playCount: playcount,
      image: image.find(({ size }) => size === 'extralarge')['#text'],
    }));
  } catch (error) {
    return [];
  }
};

export const getRecentTracks = async (): Promise<LastFMRecentTrack[]> => {
  try {
    const { data } = await lastFMClient.get<LastFMRecentTracksResponse>('', {
      params: { method: 'user.getrecenttracks', limit: 20 },
    });

    return data.recenttracks.track.map(({ name, artist, image, album, date }) => ({
      name,
      album: album['#text'],
      artist: artist['#text'],
      unixTimestamp: date?.uts,
      image: image.find(({ size }) => size === 'extralarge')['#text'],
    }));
  } catch (error) {
    return [];
  }
};
