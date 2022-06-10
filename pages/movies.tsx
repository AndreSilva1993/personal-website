import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import type { GetStaticProps } from 'next';

import { getMovies } from '@src/clients/movies/movies';
import { Movies } from '@src/components/Movies/Movies';

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('movies.seo.title')}</title>
        <meta name="description" content={t('movies.seo.description')} />
      </Head>
      <Movies />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return { props: { initialMovies: getMovies().slice(0, 20) } };
};
