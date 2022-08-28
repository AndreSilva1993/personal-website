import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import type { GetStaticProps } from 'next';

import { getMovies } from '@src/clients/movies/movies';
import { MoviesPage } from '@src/components/Movies/MoviesPage';

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('movies.seo.title')}</title>
        <meta name="description" content={t('movies.seo.description')} />
      </Head>
      <MoviesPage />
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const { movies, moviesPerGenre, genres } = getMovies();

  return {
    props: {
      genres,
      moviesPerGenre,
      movies: movies.slice(0, 20),
    },
  };
};
