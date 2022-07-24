import styles from './Music.module.css';

import { MusicAlbums } from '@src/components/Music/MusicAlbums';
import { MusicArtists } from '@src/components/Music/MusicArtists';
import { MusicStatistics } from '@src/components/Music/MusicStatistics';
import { MusicRecentTracks } from '@src/components/Music/MusicRecentTracks';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

import type { FC } from 'react';

const Music: FC = () => (
  <PageContainer className={styles.pageContainer}>
    <MusicStatistics />
    <MusicAlbums />
    <MusicArtists />
    <MusicRecentTracks />
  </PageContainer>
);

export { Music };
