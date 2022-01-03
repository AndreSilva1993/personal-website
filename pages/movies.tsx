import Head from 'next/head';
import { useTranslation } from 'react-i18next';

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
