import Image from 'next/image';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { Button } from '@src/components/Button/Button';
import { Select } from '@src/components/Select/Select';
import { LoadingDots } from '@src/components/LoadingDots/LoadingDots';
import { useLastFMTopAlbums } from '@src/queries/last-fm';
import { usePropsContext } from '@src/contexts/PropsContext';
import { MusicGrid } from '@src/components/Music/MusicGrid';

import type { LastFMTimePeriod, LastFMTopAlbum } from '@src/clients/last-fm/last-fm.types';

const SearchOptionsWrapperDiv = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    margin: 2rem 0;
    align-items: center;
    justify-content: space-between;

    ${theme.media.extraSmall} {
      flex-direction: column;
    }
  `
);

const AlbumsH1 = styled.h1(
  ({ theme }) => css`
    font-size: 2rem;
    font-weight: ${theme.fontWeights.bold};
    text-transform: uppercase;
    color: ${theme.colors.white};

    ${theme.media.extraSmall} {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
  `
);

const StyledSelect = styled(Select)(
  ({ theme }) => css`
    ${theme.media.extraSmall} {
      width: 100%;
      text-align: center;
    }
  `
);

const AlbumCoverWrapperDiv = styled.div`
  height: 0;
  position: relative;
  padding-bottom: 100%;
`;

const AlbumCoverImage = styled(Image)`
  max-width: 100%;
`;

const AlbumDetailsArtistSpan = styled.span(
  ({ theme }) => css`
    font-size: 1.5rem;
    font-weight: ${theme.fontWeights.boldest};
    margin-bottom: 1rem;

    ${theme.media.lteSmall} {
      font-size: 1rem;
    }
  `
);

const AlbumDetailsNameSpan = styled.span(
  ({ theme }) => css`
    font-size: 1.5rem;
    margin-bottom: 1rem;

    ${theme.media.lteSmall} {
      font-size: 1rem;
    }
  `
);

const AlbumDetailsPlayCountSpan = styled.span(
  ({ theme }) => css`
    font-size: 1.3rem;
    color: ${theme.colors.lightGrey};

    ${theme.media.lteSmall} {
      font-size: 1rem;
    }
  `
);

const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  width: 20rem;
  margin: 2rem auto;
`;

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

  function handleTimePeriodChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTimePeriod(event.target.value as LastFMTimePeriod);
  }

  return (
    <section>
      <SearchOptionsWrapperDiv>
        <AlbumsH1>{t('music.topAlbumsTitle')}</AlbumsH1>
        <StyledSelect value={timePeriod} onChange={handleTimePeriodChange}>
          <option value="overall">{t('music.filters.albums.allTime')}</option>
          <option value="12month">{t('music.filters.albums.last365Days')}</option>
          <option value="6month">{t('music.filters.albums.last180Days')}</option>
          <option value="3month">{t('music.filters.albums.last90Days')}</option>
          <option value="1month">{t('music.filters.albums.last30Days')}</option>
          <option value="7day">{t('music.filters.albums.last7Days')}</option>
        </StyledSelect>
      </SearchOptionsWrapperDiv>

      <MusicGrid
        items={topAlbums.pages.flat()}
        render={({ name, image }, props) => (
          <AlbumCoverWrapperDiv key={name} {...props}>
            <AlbumCoverImage
              src={image}
              alt={name}
              layout="fill"
              sizes="(max-width: 767px) 50vw, 20vw"
            />
          </AlbumCoverWrapperDiv>
        )}
        renderHoveringItem={({ artist, name, playCount }) => (
          <>
            <AlbumDetailsArtistSpan>{artist}</AlbumDetailsArtistSpan>
            <AlbumDetailsNameSpan>{name}</AlbumDetailsNameSpan>
            <AlbumDetailsPlayCountSpan>
              {t('music.playCount', { playCount })}
            </AlbumDetailsPlayCountSpan>
          </>
        )}
      />

      <StyledButton onClick={() => fetchNextAlbums()}>
        {isFetchingNextPage ? <LoadingDots /> : t('music.loadMoreAlbums')}
      </StyledButton>
    </section>
  );
};

export { MusicAlbums };
