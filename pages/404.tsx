import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { NotFound } from '@src/components/NotFound/NotFound';

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('404.seo.title')}</title>
        <meta name="description" content={t('404.seo.description')} />
      </Head>
      <NotFound />
    </>
  );
}
