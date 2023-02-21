import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { NotFoundPage } from '@src/components/NotFound/NotFoundPage';

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('404.seo.title')}</title>
        <meta name="description" content={t('404.seo.description')} />
      </Head>
      <NotFoundPage />
    </>
  );
}
