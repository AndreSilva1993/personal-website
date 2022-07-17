import styles from './MusicStatistics.module.css';

import { useTranslation } from 'react-i18next';

import { useLastFMUserInfo } from '@src/queries/last-fm';
import { MusicStatisticsCounter } from '@src/components/Music/MusicStatisticsCounter';

import type { FC } from 'react';

const MusicStatistics: FC = () => {
  const { t } = useTranslation();
  const {
    data: { playCount, artistsCount, albumsCount, lovedTracksCount } = {
      playCount: 0,
      albumsCount: 0,
      artistsCount: 0,
      lovedTracksCount: 0,
    },
  } = useLastFMUserInfo();

  return (
    <div className={styles.statisticsWrapper}>
      <div className={styles.statisticWrapper}>
        <MusicStatisticsCounter value={playCount} className={styles.statisticValue} />
        <span className={styles.statisticName}>{t('music.statistics.scrobbles')}</span>
      </div>

      <div className={styles.statisticWrapper}>
        <MusicStatisticsCounter value={artistsCount} className={styles.statisticValue} />
        <span className={styles.statisticName}>{t('music.statistics.artistsListened')}</span>
      </div>

      <div className={styles.statisticWrapper}>
        <MusicStatisticsCounter value={albumsCount} className={styles.statisticValue} />
        <span className={styles.statisticName}>{t('music.statistics.albumsListened')}</span>
      </div>

      <div className={styles.statisticWrapper}>
        <MusicStatisticsCounter value={lovedTracksCount} className={styles.statisticValue} />
        <span className={styles.statisticName}>{t('music.statistics.tracksLoved')}</span>
      </div>
    </div>
  );
};

export { MusicStatistics };
