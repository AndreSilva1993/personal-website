import styles from './MusicAlbums.module.css';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@src/components/Button/Button';
import { Select } from '@src/components/Select/Select';
import { useLastFMTopAlbums } from '@src/queries/last-fm';
import { usePropsContext } from '@src/contexts/PropsContext';
import { ImageGrid } from '@src/components/ImageGrid/ImageGrid';
import { LoadingDots } from '@src/components/LoadingDots/LoadingDots';

import type { LastFMTimePeriod, LastFMTopAlbum } from '@src/clients/last-fm/last-fm.types';

const MusicAlbums = () => {
  const { t } = useTranslation();
  const { initialTopAlbums } = usePropsContext<{ initialTopAlbums: LastFMTopAlbum[] }>();

  const [timePeriod, setTimePeriod] = useState<LastFMTimePeriod>('overall');

  const {
    isFetchingNextPage,
    data: topAlbums = { pages: [] },
    fetchNextPage: fetchNextAlbums,
  } = useLastFMTopAlbums(timePeriod, {
    initialData: { pages: [initialTopAlbums], pageParams: [] },
  });

  return (
    <section>
      <div className={styles.searchOptionsWrapper}>
        <h2 className={styles.title}>{t('music.topAlbumsTitle')}</h2>
        <Select
          value={timePeriod}
          className={styles.searchSelect}
          onChange={(event) => setTimePeriod(event.target.value as LastFMTimePeriod)}
        >
          <option value="overall">{t('music.filters.albums.allTime')}</option>
          <option value="12month">{t('music.filters.albums.last365Days')}</option>
          <option value="6month">{t('music.filters.albums.last180Days')}</option>
          <option value="3month">{t('music.filters.albums.last90Days')}</option>
          <option value="1month">{t('music.filters.albums.last30Days')}</option>
          <option value="7day">{t('music.filters.albums.last7Days')}</option>
        </Select>
      </div>

      <ImageGrid
        items={topAlbums.pages.flat()}
        render={({ name, image }: LastFMTopAlbum, renderProps) => (
          <div className={styles.albumCoverWrapper} key={name} {...renderProps}>
            <Image
              className={styles.albumCover}
              src={image}
              alt={name}
              layout="fill"
              sizes="(max-width: 767px) 50vw, 20vw"
            />
          </div>
        )}
        renderHoveringItem={({ artist, name, playCount }) => (
          <>
            <span className={styles.albumArtist}>{artist}</span>
            <span className={styles.albumName}>{name}</span>
            <span className={styles.albumPlayCount}>{t('music.playCount', { playCount })}</span>
          </>
        )}
      />

      <Button className={styles.button} onClick={() => fetchNextAlbums()}>
        {isFetchingNextPage ? <LoadingDots /> : t('music.loadMoreAlbums')}
      </Button>
    </section>
  );
};

export { MusicAlbums };
