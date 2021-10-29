import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { Portfolio } from '@src/components/Portfolio/Portfolio';

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('portfolio.seo.title')}</title>
        <meta name="description" content={t('portfolio.seo.description')} />
      </Head>
      <Portfolio />
    </>
  );
}
