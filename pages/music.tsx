import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { Music } from '@src/components/Music/Music';

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('music.seo.title')}</title>
        <meta name="description" content={t('music.seo.description')} />
      </Head>
      <Music />
    </>
  );
}
