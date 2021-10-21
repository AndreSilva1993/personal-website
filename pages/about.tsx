import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { About } from '@src/components/Pages/About';

export default function App() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('about.pageTitle')}</title>
      </Head>
      <About />
    </>
  );
}
