import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { AboutPage } from '@src/components/About/AboutPage';

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('about.seo.title')}</title>
        <meta name="description" content={t('about.seo.description')} />
      </Head>
      <AboutPage />
    </>
  );
}
