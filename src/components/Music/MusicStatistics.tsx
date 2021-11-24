import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { useLastFMUserInfo } from '@src/queries/last-fm';
import { MusicStatisticsCounter } from '@src/components/Music/MusicStatisticsCounter';

import type { FC } from 'react';

const StatisticsWrapperDiv = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 5rem 0;

    ${theme.media.extraSmall} {
      flex-wrap: wrap;
      margin: 0 0 2rem;
    }
  `
);

const StatisticDiv = styled.div(
  ({ theme }) => css`
    flex: 0 0 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: ${theme.fontWeights.bold};

    ${theme.media.extraSmall} {
      flex: 0 0 50%;
      margin-bottom: 1.5rem;
    }
  `
);

const StyledStatisticValue = styled(MusicStatisticsCounter)(
  ({ theme }) => css`
    font-size: 3rem;
    margin-bottom: 1.5rem;
    color: ${theme.colors.white};
    font-weight: ${theme.fontWeights.bold};

    ${theme.media.extraSmall} {
      font-size: 2rem;
    }
  `
);

const StatisticName = styled.span(
  ({ theme }) => css`
    font-size: 2rem;
    text-align: center;
    color: ${theme.colors.lightGrey};

    ${theme.media.extraSmall} {
      font-size: 1.5rem;
    }
  `
);

const MusicStatistics: FC = () => {
  const { t } = useTranslation();
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
        <StyledStatisticValue value={playCount} />
        <StatisticName>{t('music.statistics.scrobbles')}</StatisticName>
      </StatisticDiv>

      <StatisticDiv>
        <StyledStatisticValue value={artistsCount} />
        <StatisticName>{t('music.statistics.artistsListened')}</StatisticName>
      </StatisticDiv>

      <StatisticDiv>
        <StyledStatisticValue value={albumsCount} />
        <StatisticName>{t('music.statistics.albumsListened')}</StatisticName>
      </StatisticDiv>

      <StatisticDiv>
        <StyledStatisticValue value={lovedTracksCount} />
        <StatisticName>{t('music.statistics.tracksLoved')}</StatisticName>
      </StatisticDiv>
    </StatisticsWrapperDiv>
  );
};

export { MusicStatistics };
