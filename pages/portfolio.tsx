import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { Portfolio } from '@src/components/Portfolio/Portfolio';

export default function App() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('portfolio.pageTitle')}</title>
      </Head>
      <Portfolio />
    </>
  );
}
