import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { Music } from '@src/components/Music/Music';
import { getTopArtists } from '@src/clients/spotify/spotify';
import { getRecentTracks, getTopAlbums } from '@src/clients/last-fm/last-fm';

import type { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialTopAlbums = await getTopAlbums();
  const initialRecentTracks = await getRecentTracks();
  const initialTopArtists = await getTopArtists(
    context.req as NextApiRequest,
    context.res as NextApiResponse
  );

  return {
    props: { initialTopAlbums, initialRecentTracks, initialTopArtists },
  };
};
