import Image from 'next/image';
import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { useTopArtists } from '@src/queries/spotify';
import { Select } from '@src/components/Select/Select';
import { Button } from '@src/components/Button/Button';
import { MusicGrid } from '@src/components/Music/MusicGrid';
import { usePropsContext } from '@src/contexts/PropsContext';
import { LoadingDots } from '@src/components/LoadingDots/LoadingDots';

import type { FC } from 'react';
import type { SpotifyTimeRange, SpotifyTopArtist } from '@src/clients/spotify/spotify.types';

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

const ArtistsH1 = styled.h1(
  ({ theme }) => css`
    font-size: 2rem;
    margin: 2rem 0;
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

const ArtistImageWrapperDiv = styled.div`
  height: 0;
  position: relative;
  padding-bottom: 100%;
`;

const ArtistImage = styled(Image)`
  max-width: 100%;
`;

const ArtistDetailsNameA = styled.a(
  ({ theme }) => css`
    color: white;
    font-size: 1.5rem;
    font-weight: ${theme.fontWeights.boldest};
    margin-bottom: 1rem;
    text-decoration: none;

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

const MusicArtists: FC = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<SpotifyTimeRange>('long_term');

  const { initialTopArtists } = usePropsContext<{ initialTopArtists: SpotifyTopArtist[] }>();

  const {
    isFetchingNextPage,
    data: topArtists = { pages: [] },
    fetchNextPage: fetchNextArtists,
  } = useTopArtists(timeRange, {
    initialData: { pages: [initialTopArtists], pageParams: [] },
  });

  function handleTimePeriodChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setTimeRange(event.target.value as SpotifyTimeRange);
  }

  return (
    <section>
      <SearchOptionsWrapperDiv>
        <ArtistsH1>{t('music.topArtistsTitle')}</ArtistsH1>
        <StyledSelect value={timeRange} onChange={handleTimePeriodChange}>
          <option value="long_term">{t('music.filters.artists.longTerm')}</option>
          <option value="medium_term">{t('music.filters.artists.mediumTerm')}</option>
          <option value="short_term">{t('music.filters.artists.shortTerm')}</option>
        </StyledSelect>
      </SearchOptionsWrapperDiv>

      <MusicGrid
        items={topArtists.pages.flat()}
        render={({ image, name }, props) => (
          <ArtistImageWrapperDiv key={name} {...props}>
            <ArtistImage src={image} alt={name} layout="fill" objectFit="cover" />
          </ArtistImageWrapperDiv>
        )}
        renderHoveringItem={({ name, link }) => (
          <ArtistDetailsNameA href={link} target="_blank">
            {name}
          </ArtistDetailsNameA>
        )}
      />

      <StyledButton onClick={() => fetchNextArtists()}>
        {isFetchingNextPage ? <LoadingDots /> : t('music.loadMoreArtists')}
      </StyledButton>
    </section>
  );
};

export { MusicArtists };
