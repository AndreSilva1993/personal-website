import styled from '@emotion/styled';
import { css } from '@emotion/react';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnimation, motion } from 'framer-motion';

import { Button } from '@src/components/Button/Button';
import { useLastFMTopAlbums } from '@src/queries/last-fm';

import type { LastFMTimePeriod, LastFMTopAlbum } from '@src/clients/last-fm/last-fm.types';

const AlbumsWrapperDiv = styled.div`
  display: grid;
  width: 100%;
  position: relative;
  grid-template-columns: repeat(5, 1fr);
`;

const AlbumCoverWrapperDiv = styled.div`
  height: 0;
  padding-bottom: 100%;
`;

const AlbumCoverImg = styled.img`
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
    font-size: 1.2rem;
    color: ${theme.colors.lightGrey};
  `
);

const StyledButton = styled(Button)`
  margin: 2rem auto;
`;

const MusicAlbums = () => {
  const { t } = useTranslation();
  const animationControls = useAnimation();

  const albumsWrapperRef = useRef<HTMLDivElement[]>([]);
  const [timePeriod, setTimePeriod] = useState<LastFMTimePeriod>('overall');
  const [hoveringAlbum, setHoveringAlbum] = useState<LastFMTopAlbum>();

  const { data: topAlbums = { pages: [] }, fetchNextPage: fetchNextAlbums } =
    useLastFMTopAlbums(timePeriod);

  function handleAlbumsMouseLeave() {
    setHoveringAlbum(undefined);
  }

  function handleAlbumMouseEnter(index: number) {
    setHoveringAlbum(topAlbums.pages.flat()[index]);

    const { offsetLeft, offsetTop } = albumsWrapperRef.current[index];

    animationControls.start({
      y: `${offsetTop}px`,
      x: `${offsetLeft}px`,
    });
  }

  function handleTimePeriodChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTimePeriod(event.target.value as LastFMTimePeriod);
  }

  return (
    <>
      <select value={timePeriod} onChange={handleTimePeriodChange}>
        <option value="overall">All Time</option>
        <option value="7day">Last 7 Days</option>
        <option value="1month">Last 30 Days</option>
        <option value="3month">Last 90 Days</option>
        <option value="6month">Last 180 Days</option>
        <option value="12month">Last 365 Days</option>
      </select>

      <AlbumsWrapperDiv onMouseLeave={handleAlbumsMouseLeave}>
        {topAlbums.pages.flat().map(({ image, name }, index) => (
          <AlbumCoverWrapperDiv
            key={name}
            onMouseEnter={() => handleAlbumMouseEnter(index)}
            ref={(ref) => {
              albumsWrapperRef.current[index] = ref;
            }}
          >
            <AlbumCoverImg src={image} alt={name} />
          </AlbumCoverWrapperDiv>
        ))}

        {hoveringAlbum && (
          <AlbumDetailsOverlayDiv
            animate={animationControls}
            transition={{ ease: 'easeOut', duration: 0.25 }}
          >
            <AlbumDetailsArtistSpan>{hoveringAlbum.artist}</AlbumDetailsArtistSpan>
            <AlbumDetailsNameSpan>{hoveringAlbum.name}</AlbumDetailsNameSpan>
            <AlbumDetailsPlayCountSpan>
              {t('music.playCount', { playCount: hoveringAlbum.playCount })}
            </AlbumDetailsPlayCountSpan>
          </AlbumDetailsOverlayDiv>
        )}
      </AlbumsWrapperDiv>

      <StyledButton onClick={() => fetchNextAlbums()}>{t('music.loadMore')}</StyledButton>
    </>
  );
};

export { MusicAlbums };
