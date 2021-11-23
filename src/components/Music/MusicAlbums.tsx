import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@src/components/Button/Button';
import { Select } from '@src/components/Select/Select';
import { LoadingDots } from '@src/components/LoadingDots/LoadingDots';
import { useLastFMTopAlbums } from '@src/queries/last-fm';
import { usePropsContext } from '@src/contexts/PropsContext';

import type { LastFMTimePeriod, LastFMTopAlbum } from '@src/clients/last-fm/last-fm.types';

const SearchOptionsWrapperDiv = styled.div`
  width: 100%;
  display: flex;
  margin: 2rem 0;
  align-items: center;
  justify-content: space-between;
`;

const AlbumsH1 = styled.h1(
  ({ theme }) => css`
    font-size: 2rem;
    font-weight: ${theme.fontWeights.bold};
    text-transform: uppercase;
    color: ${theme.colors.white};
  `
);

const AlbumsWrapperDiv = styled.div`
  display: grid;
  width: 100%;
  position: relative;
  grid-template-columns: repeat(5, 1fr);
`;

const AlbumCoverWrapperDiv = styled.div`
  height: 0;
  position: relative;
  padding-bottom: 100%;
`;

const AlbumCoverImg = styled(Image)`
  max-width: 100%;
`;

const AlbumDetailsOverlayDiv = styled(motion.div)(
  ({ theme }) => css`
    top: 0;
    left: 0;
    width: 20%;
    aspect-ratio: 1;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.white};
    text-align: center;
    text-transform: uppercase;
    padding: 2rem;

    background-color: rgba(0, 0, 0, 0.75);
  `
);

const AlbumDetailsArtistSpan = styled.span(
  ({ theme }) => css`
    font-size: 1.5rem;
    font-weight: ${theme.fontWeights.boldest};
    margin-bottom: 1rem;
  `
);

const AlbumDetailsNameSpan = styled.span`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const AlbumDetailsPlayCountSpan = styled.span(
  ({ theme }) => css`
    font-size: 1.3rem;
    color: ${theme.colors.lightGrey};
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

  const albumsWrapperRef = useRef<HTMLDivElement[]>([]);

  const [timePeriod, setTimePeriod] = useState<LastFMTimePeriod>('overall');
  const [hoveringAlbum, setHoveringAlbum] = useState<LastFMTopAlbum>();
  const [overlayPosition, setOverlayPosition] = useState<{ x: number; y: number }>();

  const {
    isFetching,
    data: topAlbums = { pages: [] },
    fetchNextPage: fetchNextAlbums,
  } = useLastFMTopAlbums(timePeriod, {
    initialData: { pages: [initialTopAlbums], pageParams: [] },
  });

  function handleAlbumsMouseLeave() {
    setHoveringAlbum(undefined);
  }

  function handleAlbumMouseEnter(index: number) {
    const { offsetLeft, offsetTop } = albumsWrapperRef.current[index];

    setHoveringAlbum(topAlbums.pages.flat()[index]);
    setOverlayPosition({ x: offsetLeft, y: offsetTop });
  }

  function handleTimePeriodChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTimePeriod(event.target.value as LastFMTimePeriod);
  }

  return (
    <>
      <SearchOptionsWrapperDiv>
        <AlbumsH1>{t('music.topAlbumsTitle')}</AlbumsH1>
        <Select value={timePeriod} onChange={handleTimePeriodChange}>
          <option value="overall">{t('music.filters.allTime')}</option>
          <option value="12month">{t('music.filters.last365Days')}</option>
          <option value="6month">{t('music.filters.last180Days')}</option>
          <option value="3month">{t('music.filters.last90Days')}</option>
          <option value="1month">{t('music.filters.last30Days')}</option>
          <option value="7day">{t('music.filters.last7Days')}</option>
        </Select>
      </SearchOptionsWrapperDiv>

      <AlbumsWrapperDiv onMouseLeave={handleAlbumsMouseLeave}>
        {topAlbums.pages.flat().map(({ image, name }, index) => (
          <AlbumCoverWrapperDiv
            key={name}
            onMouseEnter={() => handleAlbumMouseEnter(index)}
            ref={(ref) => {
              albumsWrapperRef.current[index] = ref;
            }}
          >
            <AlbumCoverImg src={image} alt={name} layout="fill" priority />
          </AlbumCoverWrapperDiv>
        ))}

        <AnimatePresence>
          {hoveringAlbum && (
            <AlbumDetailsOverlayDiv
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, x: overlayPosition.x, y: overlayPosition.y }}
              animate={{ opacity: 1, x: overlayPosition.x, y: overlayPosition.y }}
              transition={{ ease: 'easeOut', duration: 0.25 }}
            >
              <AlbumDetailsArtistSpan>{hoveringAlbum.artist}</AlbumDetailsArtistSpan>
              <AlbumDetailsNameSpan>{hoveringAlbum.name}</AlbumDetailsNameSpan>
              <AlbumDetailsPlayCountSpan>
                {t('music.playCount', { playCount: hoveringAlbum.playCount })}
              </AlbumDetailsPlayCountSpan>
            </AlbumDetailsOverlayDiv>
          )}
        </AnimatePresence>
      </AlbumsWrapperDiv>

      <StyledButton onClick={() => fetchNextAlbums()}>
        {isFetching ? <LoadingDots /> : t('music.loadMore')}
      </StyledButton>
    </>
  );
};

export { MusicAlbums };
