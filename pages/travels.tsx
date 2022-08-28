import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { LazyTravelsPage } from '@src/components/Travels/LazyTravelsPage';

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('travels.seo.title')}</title>
        <meta name="description" content={t('travels.seo.description')} />
      </Head>
      <LazyTravelsPage />
    </>
  );
}
