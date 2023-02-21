import { Redis } from '@upstash/redis';

import { MusicPage } from '@src/components/Music/MusicPage';
import { getTopArtists } from '@src/clients/spotify/spotify';
import { getRecentTracks, getTopAlbums } from '@src/clients/last-fm/last-fm';

export const metadata = {
  title: 'Music',
};

export default async function Page() {
  // Fetch the Spotify access token.
  const { get } = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
  const accessToken = await get<string>(process.env.SPOTIFY_ACCESS_TOKEN_REDIS_KEY);

  const [initialTopAlbums, initialRecentTracks, initialTopArtists] = await Promise.all([
    getTopAlbums(),
    getRecentTracks(),
    getTopArtists(accessToken),
  ]);

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <MusicPage
        initialTopAlbums={initialTopAlbums}
        initialTopArtists={initialTopArtists}
        initialRecentTracks={initialRecentTracks}
      />
    </>
  );
}
