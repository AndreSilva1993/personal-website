interface SpotifyTopArtistsResponse {
  items: Array<{
    name: string;
    external_urls: {
      spotify: string;
    };
    images: SpotifyImage[];
  }>;
}

interface SpotifyImage {
  width: number;
  height: number;
  url: string;
}

interface SpotifyTopArtist {
  name: string;
  image: string;
  link: string;
}

type SpotifyTimeRange = 'long_term' | 'medium_term' | 'short_term';

export type { SpotifyImage, SpotifyTopArtist, SpotifyTimeRange, SpotifyTopArtistsResponse };
