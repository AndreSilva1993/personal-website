import styles from './MoviesPage.module.css';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { debounce } from 'throttle-debounce';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';

import type { FC } from 'react';
import type { Movie, MoviesData } from '@src/clients/movies/movies.types';

import { useMovies } from '@src/queries/movies';
import { usePropsContext } from '@src/contexts/PropsContext';
import { Input } from '@src/components/Input/Input';
import { ImageGrid } from '@src/components/ImageGrid/ImageGrid';
import { PageContainer } from '@src/components/PageContainer/PageContainer';
import { SearchIcon } from '@src/icons/SearchIcon';

export const MoviesPage: FC = () => {
  const { t } = useTranslation();
  const initialMovieData = usePropsContext<MoviesData>();

  const {
    data: { genres, movies, moviesPerGenre },
  } = useMovies({ initialData: initialMovieData });

  const [searchQuery, setSearchQuery] = useState<string>();
  const [activeMovieGenres, setActiveMovieGenres] = useState<string[]>([]);

  const debounceHandleSearchInputChange = useCallback(
    debounce(500, (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    }),
    []
  );

  function toggleGenreFilter(genre: string) {
    if (activeMovieGenres.includes(genre)) {
      setActiveMovieGenres(
        activeMovieGenres.filter((activeMovieGenre) => activeMovieGenre !== genre)
      );
    } else {
      setActiveMovieGenres([...activeMovieGenres, genre]);
    }
  }

  const filteredMovies =
    activeMovieGenres.length === 0 && !searchQuery
      ? movies
      : movies.filter(
          ({ title, genres }) =>
            (activeMovieGenres.length === 0 ||
              genres.some((genre) => activeMovieGenres.includes(genre))) &&
            (!searchQuery || title.toLowerCase().includes(searchQuery.toLowerCase()))
        );

  return (
    <PageContainer className={styles.pageContainer}>
      <h1 className={styles.title}>{t('movies.title')}</h1>
      <Input
        icon={<SearchIcon />}
        placeholder={t('movies.filters.name')}
        onChange={debounceHandleSearchInputChange}
      />

      <div className={styles.genresWrapper}>
        {genres.map((movieGenre) => (
          <Chip
            className={styles.genreChip}
            variant={activeMovieGenres.includes(movieGenre) ? 'filled' : 'outlined'}
            key={movieGenre}
            label={`${t(`movies.genres.${movieGenre}`)} (${moviesPerGenre[movieGenre]})`}
            onClick={() => toggleGenreFilter(movieGenre)}
            onDelete={
              activeMovieGenres.includes(movieGenre) ? () => toggleGenreFilter(movieGenre) : null
            }
          />
        ))}
      </div>

      <ImageGrid
        aspectRatio="2 / 3"
        items={filteredMovies}
        render={({ title, image, imagePlaceholder }: Movie, renderProps) => (
          <div className={styles.imageWrapper} key={title} {...renderProps}>
            <Image
              fill
              src={image}
              alt={title}
              sizes="(max-width: 767px) 50vw, 20vw"
              placeholder="blur"
              blurDataURL={imagePlaceholder}
            />
          </div>
        )}
        renderHoveringItem={({ title, year, genres, imdbIdentifier }: Movie) => (
          <>
            <Link
              href={`https://imdb.com/title/${imdbIdentifier}`}
              className={styles.imdbLink}
              target="_blank"
            >
              {`${title} (${year})`}
            </Link>
            <span className={styles.currentMovieGenres}>
              {genres.map((genre) => t(`movies.genres.${genre}`)).join(', ')}
            </span>
          </>
        )}
      />
    </PageContainer>
  );
};
