import { Metadata } from 'next';

import { initI18next } from '@src/i18n/server';
import { PortfolioPage } from '@src/components/Portfolio/PortfolioPage';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await initI18next();

  return {
    title: t('portfolio.seo.title'),
    description: t('portfolio.seo.description'),
  };
}

export default function Page() {
  return <PortfolioPage />;
}
