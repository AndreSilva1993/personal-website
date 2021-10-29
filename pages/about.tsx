import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { About } from '@src/components/About/About';

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('about.seo.title')}</title>
        <meta name="description" content={t('about.seo.description')} />
      </Head>
      <About />
    </>
  );
}
