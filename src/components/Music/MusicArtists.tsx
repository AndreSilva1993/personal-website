'use client';

import styles from './MusicArtists.module.css';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useTopArtists } from '@src/queries/spotify';
import { Select } from '@src/components/Select/Select';
import { Button } from '@src/components/Button/Button';
import { ImageGrid } from '@src/components/ImageGrid/ImageGrid';
import { LoadingDots } from '@src/components/LoadingDots/LoadingDots';

import type { SpotifyTimeRange, SpotifyTopArtist } from '@src/clients/spotify/spotify.types';

interface MusicArtistsProps {
  initialTopArtists: SpotifyTopArtist[];
}

export function MusicArtists({ initialTopArtists }: MusicArtistsProps) {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<SpotifyTimeRange>('long_term');

  const {
    isFetchingNextPage,
    data: topArtists = { pages: [] },
    fetchNextPage: fetchNextArtists,
  } = useTopArtists(timeRange, {
    queryKey: ['music-artists', timeRange],
    staleTime: 60 * 60 * 1000, // 1 hour cache.
    initialData:
      timeRange === 'long_term' ? { pages: [initialTopArtists], pageParams: [] } : undefined,
  });

  return (
    <section>
      <div className={styles.searchOptionsWrapper}>
        <h2 className={styles.title}>{t('music.topArtistsTitle')}</h2>
        <Select
          value={timeRange}
          className={styles.searchSelect}
          onChange={(event) => setTimeRange(event.target.value as SpotifyTimeRange)}
        >
          <option value="long_term">{t('music.filters.artists.longTerm')}</option>
          <option value="medium_term">{t('music.filters.artists.mediumTerm')}</option>
          <option value="short_term">{t('music.filters.artists.shortTerm')}</option>
        </Select>
      </div>

      <ImageGrid
        items={topArtists.pages.flat()}
        render={({ image, name }: SpotifyTopArtist, renderProps) => (
          <div className={styles.artistImageWrapper} key={name} {...renderProps}>
            <Image
              fill
              priority
              className={styles.artistImage}
              src={image}
              alt={name}
              style={{ objectFit: 'cover' }}
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

      <Button className={styles.button} onClick={() => fetchNextArtists()}>
        {isFetchingNextPage ? <LoadingDots /> : t('music.loadMoreArtists')}
      </Button>
    </section>
  );
}
