import Head from 'next/head';
import { auth, get } from '@upstash/redis';
import { useTranslation } from 'react-i18next';

import { Music } from '@src/components/Music/Music';
import { getTopArtists } from '@src/clients/spotify/spotify';
import { getRecentTracks, getTopAlbums } from '@src/clients/last-fm/last-fm';

import type { GetServerSideProps } from 'next';

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('music.seo.title')}</title>
        <meta name="description" content={t('music.seo.description')} />
      </Head>
      <Music />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch the Spotify access token.
  auth(process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN);
  const { data: accessToken } = await get(process.env.SPOTIFY_ACCESS_TOKEN_REDIS_KEY);

  const [initialTopAlbums, initialRecentTracks, initialTopArtists] = await Promise.all([
    getTopAlbums(),
    getRecentTracks(),
    getTopArtists(accessToken),
  ]);

  return {
    props: { initialTopAlbums, initialRecentTracks, initialTopArtists },
  };
};
