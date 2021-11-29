import Head from 'next/head';
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
  const initialTopAlbums = await getTopAlbums();
  const initialRecentTracks = await getRecentTracks();
  const initialTopArtists = await getTopArtists();

  return {
    props: { initialTopAlbums, initialRecentTracks, initialTopArtists },
  };
};
