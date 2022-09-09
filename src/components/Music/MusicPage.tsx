import styles from './MusicPage.module.css';

import { useTranslation } from 'react-i18next';
import { MusicAlbums } from '@src/components/Music/MusicAlbums';
import { MusicArtists } from '@src/components/Music/MusicArtists';
import { MusicRecentTracks } from '@src/components/Music/MusicRecentTracks';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

import type { FC } from 'react';

export const MusicPage: FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer className={styles.pageContainer}>
      <h1 className={styles.title}>{t('music.title')}</h1>
      <MusicAlbums />
      <MusicArtists />
      <MusicRecentTracks />
    </PageContainer>
  );
};
