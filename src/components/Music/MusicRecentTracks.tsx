'use client';

import styles from './MusicRecentTracks.module.css';

import Image from 'next/image';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { useLastFMRecentTracks } from '@src/queries/last-fm';

import type { LastFMRecentTrack } from '@src/clients/last-fm/last-fm.types';

function formatTimestamp(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString('pt-PT');
}

interface MusicRecentTracksProps {
  initialRecentTracks: LastFMRecentTrack[];
}

export function MusicRecentTracks({ initialRecentTracks }: MusicRecentTracksProps) {
  const { t } = useTranslation();

  const { data: recentTracks = [] } = useLastFMRecentTracks({
    queryKey: 'music-recent-tracks',
    initialData: initialRecentTracks,
    staleTime: 1 * 10 * 1000, // 10 seconds cache.
    refetchInterval: 1 * 10 * 1000, // Refetch every 10 seconds.
  });

  return (
    <section>
      <h2 className={styles.title}>{t('music.recentTracksTitle')}</h2>
      <div className={styles.recentTracksWrapper}>
        {recentTracks.map(({ image, artist, name, album, unixTimestamp }) => (
          <Fragment key={unixTimestamp}>
            <div className={styles.recentTrackCoverWrapper}>
              <Image src={image} alt={album} width="35" height="35" />
            </div>
            <p className={styles.recentTrackArtist}>{artist}</p>
            <p className={styles.recentTrackName}>{name}</p>
            <p className={styles.recentTrackAlbum}>{album}</p>
            <p className={styles.recentTrackDate}>
              {unixTimestamp ? formatTimestamp(unixTimestamp) : t('music.streamingNow')}
            </p>

            <div className={styles.divider} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
