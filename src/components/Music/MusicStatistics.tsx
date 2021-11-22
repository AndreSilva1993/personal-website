import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useLastFMUserInfo } from '@src/queries/last-fm';
import { MusicStatisticsCounter } from '@src/components/Music/MusicStatisticsCounter';

import type { FC } from 'react';
import { t } from 'i18next';

const StatisticsWrapperDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 5rem 0;
`;

const StatisticDiv = styled.div(
  ({ theme }) => css`
    flex: 0 0 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: ${theme.fontWeights.bold};
  `
);

const StatisticValue = styled.span(
  ({ theme }) => css`
    font-size: 3rem;
    margin-bottom: 1.5rem;
    color: ${theme.colors.white};
    font-weight: ${theme.fontWeights.bold};
  `
);

const StatisticName = styled.span(
  ({ theme }) => css`
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${theme.colors.lightGrey};
  `
);

const MusicStatistics: FC = () => {
  const {
    data: { playCount, artistsCount, albumsCount, lovedTracksCount } = {
      playCount: 0,
      albumsCount: 0,
      artistsCount: 0,
      lovedTracksCount: 0,
    },
  } = useLastFMUserInfo();

  return (
    <StatisticsWrapperDiv>
      <StatisticDiv>
        <StatisticValue>
          <MusicStatisticsCounter value={playCount} />
        </StatisticValue>
        <StatisticName>{t('music.statistics.scrobbles')}</StatisticName>
      </StatisticDiv>
      <StatisticDiv>
        <StatisticValue>
          <MusicStatisticsCounter value={lovedTracksCount} />
        </StatisticValue>
        <StatisticName>{t('music.statistics.tracksLoved')}</StatisticName>
      </StatisticDiv>
      <StatisticDiv>
        <StatisticValue>
          <MusicStatisticsCounter value={artistsCount} />
        </StatisticValue>
        <StatisticName>{t('music.statistics.artistsListened')}</StatisticName>
      </StatisticDiv>
      <StatisticDiv>
        <StatisticValue>
          <MusicStatisticsCounter value={albumsCount} />
        </StatisticValue>
        <StatisticName>{t('music.statistics.albumsListened')}</StatisticName>
      </StatisticDiv>
    </StatisticsWrapperDiv>
  );
};

export { MusicStatistics };
