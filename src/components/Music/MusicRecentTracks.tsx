import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { useLastFMRecentTracks } from '@src/queries/last-fm';
import { usePropsContext } from '@src/contexts/PropsContext';

import type { FC } from 'react';
import type { LastFMRecentTrack } from '@src/clients/last-fm/last-fm.types';

const RecentTracksH1 = styled.h1(
  ({ theme }) => css`
    font-size: 2rem;
    font-weight: ${theme.fontWeights.bold};
    text-transform: uppercase;
    color: ${theme.colors.white};
    margin: 3rem 0;

    ${theme.media.extraSmall} {
      font-size: 1.5rem;
      text-align: center;
    }
  `
);

const TracksUl = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 3.5rem 1fr 1.5fr 1fr 8rem;
    font-size: 1.5rem;
    padding: 1rem 2rem;
    color: ${theme.colors.white};
    border-bottom: 1px solid ${theme.colors.grey};

    ${theme.media.extraSmall} {
      padding: 0;
      grid-template-columns: 3.5rem 1fr 1.5fr;
    }
  `
);

const TrackAlbumWrapperDiv = styled.div`
  display: flex;
  align-items: center;
`;

const TrackArtistSpan = styled.span(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    font-weight: ${theme.fontWeights.boldest};

    ${theme.media.extraSmall} {
      font-size: 1.2rem;
    }
  `
);

const TrackNameSpan = styled.span(
  ({ theme }) => css`
    display: flex;
    align-items: center;

    ${theme.media.extraSmall} {
      font-size: 1.2rem;
    }
  `
);

const TrackAlbumSpan = styled.span(
  ({ theme }) => css`
    display: flex;
    align-items: center;

    ${theme.media.extraSmall} {
      display: none;
    }
  `
);

const TrackListenDateSpan = styled.span(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: ${theme.colors.lightGrey};

    ${theme.media.extraSmall} {
      display: none;
    }
  `
);

const TrackDividerDiv = styled.div(
  ({ theme }) => css`
    height: 0.1rem;
    grid-column: span 5;
    background-color: ${theme.colors.grey};

    ${theme.media.extraSmall} {
      grid-column: span 3;
    }
  `
);

function formatTimestamp(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString();
}

const MusicRecentTracks: FC = () => {
  const { t } = useTranslation();
  const { initialRecentTracks } = usePropsContext<{ initialRecentTracks: LastFMRecentTrack[] }>();

  const { data: recentTracks = [] } = useLastFMRecentTracks({
    initialData: initialRecentTracks,
  });

  return (
    <>
      <RecentTracksH1>{t('music.recentTracksTitle')}</RecentTracksH1>
      <TracksUl>
        {recentTracks.map(({ image, artist, name, album, unixTimestamp }) => (
          <>
            <TrackAlbumWrapperDiv>
              <img src={image} alt={album} width="35" height="35" />
            </TrackAlbumWrapperDiv>
            <TrackArtistSpan>{artist}</TrackArtistSpan>
            <TrackNameSpan>{name}</TrackNameSpan>
            <TrackAlbumSpan>{album}</TrackAlbumSpan>
            <TrackListenDateSpan>
              {unixTimestamp ? formatTimestamp(unixTimestamp) : t('music.streamingNow')}
            </TrackListenDateSpan>

            <TrackDividerDiv />
          </>
        ))}
      </TracksUl>
    </>
  );
};

export { MusicRecentTracks };
