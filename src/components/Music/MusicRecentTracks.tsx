import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import { useLastFMRecentTracks } from '@src/queries/last-fm';

import type { FC } from 'react';

const Li = styled.li(
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
      font-weight: ${theme.fontWeights.bold};
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
    <ul>
      {recentTracks.map(({ image, artist, name, album, unixTimestamp }) => (
        <Li>
          <TrackAlbumImg src={image} width="30" height="30" />
          <TrackDetailsDiv>
            <TrackArtistSpan>{artist}</TrackArtistSpan>
            <TrackNameSpan>{name}</TrackNameSpan>
            <TrackAlbumSpan>{album}</TrackAlbumSpan>
            <TrackListenDateSpan>
              {unixTimestamp ? formatTimestamp(unixTimestamp) : t('music.streamingNow')}
            </TrackListenDateSpan>
          </TrackDetailsDiv>
        </Li>
      ))}
    </ul>
  );
};

export { MusicRecentTracks };
