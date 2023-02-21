import styles from './MusicPage.module.css';

import { initI18next } from '@src/i18n/server';
import { MusicAlbums } from '@src/components/Music/MusicAlbums';
import { MusicArtists } from '@src/components/Music/MusicArtists';
import { MusicRecentTracks } from '@src/components/Music/MusicRecentTracks';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

import type { LastFMRecentTrack, LastFMTopAlbum } from '@src/clients/last-fm/last-fm.types';
import type { SpotifyTopArtist } from '@src/clients/spotify/spotify.types';

interface MusicPageProps {
  initialTopAlbums: LastFMTopAlbum[];
  initialTopArtists: SpotifyTopArtist[];
  initialRecentTracks: LastFMRecentTrack[];
}

export async function MusicPage({
  initialTopAlbums,
  initialTopArtists,
  initialRecentTracks,
}: MusicPageProps) {
  const { t } = await initI18next();

  return (
    <PageContainer className={styles.pageContainer}>
      <h1 className={styles.title}>{t('music.title')}</h1>
      <MusicAlbums initialTopAlbums={initialTopAlbums} />
      <MusicArtists initialTopArtists={initialTopArtists} />
      <MusicRecentTracks initialRecentTracks={initialRecentTracks} />
    </PageContainer>
  );
}
