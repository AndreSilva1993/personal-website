interface SpotifyTopArtistsResponse {
  items: Array<{
    name: string;
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
}

export type { SpotifyImage, SpotifyTopArtist, SpotifyTopArtistsResponse };
