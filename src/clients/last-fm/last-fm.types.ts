interface LastFMTopAlbumsResponse {
  topalbums: {
    album: [
      {
        name: string;
        playcount: number;
        artist: { name: string };
        image: LastFMImage[];
      }
    ];
    '@attr': {
      total: string;
      page: string;
      totalPages: string;
    };
  };
}

interface LastFMRecentTracksResponse {
  recenttracks: {
    track: [
      {
        name: string;
        album: { '#text': string };
        artist: { '#text': string };
        date?: { uts: number };
        image: LastFMImage[];
      }
    ];
  };
}

interface LastFMTopAlbum {
  name: string;
  artist: string;
  image: string;
  playCount: number;
}

interface LastFMRecentTrack {
  name: string;
  artist: string;
  image: string;
  album: string;
  unixTimestamp?: number;
}

interface LastFMImage {
  '#text': string;
  size: LastFMImageSize;
}

type LastFMImageSize = 'small' | 'medium' | 'large' | 'extralarge';
type LastFMTimePeriod = 'overall' | '7day' | '1month' | '3month' | '6month' | '12month';

export type {
  LastFMTimePeriod,
  LastFMTopAlbum,
  LastFMRecentTrack,
  LastFMTopAlbumsResponse,
  LastFMRecentTracksResponse,
};
