import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { PortfolioPage } from '@src/components/Portfolio/PortfolioPage';

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('portfolio.seo.title')}</title>
        <meta name="description" content={t('portfolio.seo.description')} />
      </Head>
      <PortfolioPage />
    </>
  );
}
