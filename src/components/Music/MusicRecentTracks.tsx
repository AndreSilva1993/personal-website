import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { useLastFMRecentTracks } from '@src/queries/last-fm';

import type { FC } from 'react';

const RecentTracksH1 = styled.h1(
  ({ theme }) => css`
    font-size: 2rem;
    font-weight: ${theme.fontWeights.bold};
    text-transform: uppercase;
    color: ${theme.colors.white};
    margin: 2rem 0;
  `
);

const TrackLi = styled.li(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: ${theme.colors.white};
    padding: 1rem 2rem;
    border-bottom: 1px solid ${theme.colors.grey};
  `
);

const TrackAlbumImg = styled.img`
  margin-right: 2rem;
`;

const TrackDetailsDiv = styled.div`
  display: flex;
  width: 100%;
`;

const TrackArtistSpan = styled.span(
  ({ theme }) =>
    css`
      flex: 0 0 25%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-right: 2rem;
      font-weight: ${theme.fontWeights.boldest};
    `
);

const TrackNameSpan = styled.span`
  flex: 0 0 35%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 2rem;
`;

const TrackAlbumSpan = styled.span`
  flex: 0 0 25%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TrackListenDateSpan = styled.span(
  ({ theme }) => css`
    flex: 0 0 15%;
    text-align: end;
    color: ${theme.colors.lightGrey};
  `
);

function formatTimestamp(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString();
}

const MusicRecentTracks: FC = () => {
  const { t } = useTranslation();
  const { data: recentTracks = [] } = useLastFMRecentTracks();

  return (
    <>
      <RecentTracksH1>{t('music.recentTracksTitle')}</RecentTracksH1>
      <ul>
        {recentTracks.map(({ image, artist, name, album, unixTimestamp }) => (
          <TrackLi key={`${artist}-${name}-${unixTimestamp}`}>
            <TrackAlbumImg src={image} width="30" height="30" />
            <TrackDetailsDiv>
              <TrackArtistSpan>{artist}</TrackArtistSpan>
              <TrackNameSpan>{name}</TrackNameSpan>
              <TrackAlbumSpan>{album}</TrackAlbumSpan>
              <TrackListenDateSpan>
                {unixTimestamp ? formatTimestamp(unixTimestamp) : t('music.streamingNow')}
              </TrackListenDateSpan>
            </TrackDetailsDiv>
          </TrackLi>
        ))}
      </ul>
    </>
  );
};

export { MusicRecentTracks };
