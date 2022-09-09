import styles from './MusicRecentTracks.module.css';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { useLastFMRecentTracks } from '@src/queries/last-fm';
import { usePropsContext } from '@src/contexts/PropsContext';

import { FC, Fragment } from 'react';
import type { LastFMRecentTrack } from '@src/clients/last-fm/last-fm.types';

function formatTimestamp(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString('pt-PT');
}

const MusicRecentTracks: FC = () => {
  const { t } = useTranslation();
  const { initialRecentTracks } = usePropsContext<{ initialRecentTracks: LastFMRecentTrack[] }>();

  const { data: recentTracks = [] } = useLastFMRecentTracks({
    initialData: initialRecentTracks,
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
};

export { MusicRecentTracks };
