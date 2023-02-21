import { initI18next } from '@src/i18n/server';
import { AboutPage } from '@src/components/About/AboutPage';

export async function generateMetadata() {
  const { t } = await initI18next();

  return {
    title: t('about.seo.title'),
    description: t('about.seo.description'),
  };
}

export default function Page() {
  /* @ts-expect-error Server Component */
  return <AboutPage />;
}
