import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { debounce } from 'throttle-debounce';
import { useTranslation } from 'react-i18next';
import Chip from '@mui/material/Chip';
import Search from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';

import { useMovies } from '@src/queries/movies';
import { usePropsContext } from '@src/contexts/PropsContext';
import { ImageGrid } from '@src/components/ImageGrid/ImageGrid';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

import type { FC } from 'react';
import type { IMovie } from './Movies.types';

const StyledPageContainer = styled(PageContainer)`
  margin: 0 auto;
  max-width: 120rem;
`;

const GenresWrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;
const StyledGenreChip = styled(Chip)`
  margin-top: 1rem;
  margin-right: 0.5rem;
`;
const PosterImageWrapperDiv = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
`;

const MovieIMDbAnchor = styled.a(
  ({ theme }) => css`
    font-size: 1.5rem;
    font-weight: ${theme.fontWeights.boldest};
    color: ${theme.colors.white};
    text-decoration: none;
    text-transform: uppercase;
    margin-bottom: 1rem;

    ${theme.media.lteSmall} {
      font-size: 1rem;
    }
  `
);

const MovieGenresSpan = styled.span(
  ({ theme }) => css`
    font-size: 1.2rem;

    ${theme.media.lteSmall} {
      font-size: 1rem;
    }
  `
);

const Movies: FC = () => {
  const { t } = useTranslation();
  const { initialMovies } = usePropsContext<{ initialMovies: IMovie[] }>();
  const { data: movies } = useMovies({ initialData: initialMovies });

  const [searchQuery, setSearchQuery] = useState<string>();
  const [activeMovieGenres, setActiveMovieGenres] = useState<string[]>([]);

  const debounceHandleSearchInputChange = useCallback(
    debounce(500, (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    }),
    []
  );

  const movieGenres = Array.from(new Set(movies.flatMap(({ genres }) => genres)));
  const moviesPerGenre = movies.reduce((accumulator, { genres }) => {
    genres.forEach((genre) => {
      accumulator[genre] = (accumulator[genre] || 0) + 1;
    });

    return accumulator;
  }, {});

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
    <StyledPageContainer>
      <OutlinedInput
        fullWidth
        endAdornment={<Search />}
        placeholder={t('movies.filters.name')}
        onChange={debounceHandleSearchInputChange}
      />

      <GenresWrapperDiv>
        {movieGenres.map((movieGenre) => (
          <StyledGenreChip
            variant={activeMovieGenres.includes(movieGenre) ? 'filled' : 'outlined'}
            key={movieGenre}
            label={`${t(`movies.genres.${movieGenre}`)} (${moviesPerGenre[movieGenre]})`}
            onClick={() => toggleGenreFilter(movieGenre)}
            onDelete={
              activeMovieGenres.includes(movieGenre) ? () => toggleGenreFilter(movieGenre) : null
            }
          />
        ))}
      </GenresWrapperDiv>

      <ImageGrid
        aspectRatio="2 / 3"
        items={filteredMovies}
        render={({ title, poster }: IMovie, renderProps) => (
          <PosterImageWrapperDiv key={title} {...renderProps}>
            <Image
              src={poster}
              alt={t(title)}
              layout="fill"
              sizes="(max-width: 767px) 50vw, 20vw"
            />
          </PosterImageWrapperDiv>
        )}
        renderHoveringItem={({ title, year, genres, imdbIdentifier }: IMovie) => (
          <>
            <Link href={`https://imdb.com/title/${imdbIdentifier}`} passHref>
              <MovieIMDbAnchor target="_blank">{`${t(title)} (${year})`}</MovieIMDbAnchor>
            </Link>
            <MovieGenresSpan>
              {genres.map((genre) => t(`movies.genres.${genre}`)).join(', ')}
            </MovieGenresSpan>
          </>
        )}
      />
    </StyledPageContainer>
  );
};

export { Movies };
