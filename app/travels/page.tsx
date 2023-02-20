import { initI18next } from '@src/i18n/i18n';
import { TravelsPage } from '@src/components/Travels/TravelsPage';

export async function generateMetadata() {
  const { t } = await initI18next();

  return {
    title: t('travels.seo.title'),
    description: t('travels.seo.description'),
  };
}

export default function Page() {
  return <TravelsPage />;
}
