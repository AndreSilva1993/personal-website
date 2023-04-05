import { Metadata } from 'next';

import { initI18next } from '@src/i18n/server';
import { LazyTravelsPage } from '@src/components/Travels/LazyTravelsPage';

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await initI18next();

  return {
    title: t('travels.seo.title'),
    description: t('travels.seo.description'),
  };
}

export default function Page({ searchParams }) {
  const initialSelectedTravel: string = searchParams.travel || '';

  return <LazyTravelsPage initialSelectedTravel={initialSelectedTravel} />;
}
