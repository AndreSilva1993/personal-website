import styles from './MusicArtists.module.css';

import Image from 'next/image';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';

import { useTopArtists } from '@src/queries/spotify';
import { usePropsContext } from '@src/contexts/PropsContext';
import { ImageGrid } from '@src/components/ImageGrid/ImageGrid';
import { LoadingDots } from '@src/components/LoadingDots/LoadingDots';

import type { FC } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import type { SpotifyTimeRange, SpotifyTopArtist } from '@src/clients/spotify/spotify.types';

const MusicArtists: FC = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<SpotifyTimeRange>('long_term');

  const { initialTopArtists } = usePropsContext<{ initialTopArtists: SpotifyTopArtist[] }>();

  const {
    isFetchingNextPage,
    data: topArtists = { pages: [] },
    fetchNextPage: fetchNextArtists,
  } = useTopArtists(timeRange, {
    initialData: { pages: [initialTopArtists], pageParams: [] },
  });

  function handleTimePeriodChange(event: SelectChangeEvent) {
    setTimeRange(event.target.value as SpotifyTimeRange);
  }

  return (
    <section>
      <div className={styles.searchOptionsWrapper}>
        <h1 className={styles.title}>{t('music.topArtistsTitle')}</h1>
        <Select className={styles.select} value={timeRange} onChange={handleTimePeriodChange}>
          <MenuItem value="long_term">{t('music.filters.artists.longTerm')}</MenuItem>
          <MenuItem value="medium_term">{t('music.filters.artists.mediumTerm')}</MenuItem>
          <MenuItem value="short_term">{t('music.filters.artists.shortTerm')}</MenuItem>
        </Select>
      </div>

      <ImageGrid
        items={topArtists.pages.flat()}
        render={({ image, name }: SpotifyTopArtist, renderProps) => (
          <div className={styles.artistImageWrapper} key={name} {...renderProps}>
            <Image
              className={styles.artistImage}
              src={image}
              alt={name}
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 767px) 50vw, 20vw"
            />
          </div>
        )}
        renderHoveringItem={({ name, link }) => (
          <a className={styles.artistLink} href={link} target="_blank" rel="noreferrer">
            {name}
          </a>
        )}
      />

      <Button className={styles.button} variant="outlined" onClick={() => fetchNextArtists()}>
        {isFetchingNextPage ? <LoadingDots /> : t('music.loadMoreArtists')}
      </Button>
    </section>
  );
};

export { MusicArtists };
