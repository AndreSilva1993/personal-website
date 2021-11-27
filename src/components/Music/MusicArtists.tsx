import Image from 'next/image';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import { useTopArtists } from '@src/queries/spotify';
import { MusicGrid } from '@src/components/Music/MusicGrid';

import type { FC } from 'react';
import { usePropsContext } from '@src/contexts/PropsContext';
import { SpotifyTopArtist } from '@src/clients/spotify/spotify.types';

const ArtistImageWrapperDiv = styled.div`
  height: 0;
  position: relative;
  padding-bottom: 100%;
`;

const ArtistImage = styled(Image)`
  max-width: 100%;
`;

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

const ArtistDetailsNameSpan = styled.span(
  ({ theme }) => css`
    color: white;
    font-size: 1.5rem;
    font-weight: ${theme.fontWeights.boldest};
    margin-bottom: 1rem;

    ${theme.media.lteSmall} {
      font-size: 1rem;
    }
  `
);

const MusicArtists: FC = () => {
  const { initialTopArtists } = usePropsContext<{ initialTopArtists: SpotifyTopArtist[] }>();

  const { t } = useTranslation();
  const { data: topArtists = [] } = useTopArtists({ initialData: initialTopArtists });

  return (
    <>
      <ArtistsH1>{t('music.topArtistsTitle')}</ArtistsH1>
      <MusicGrid
        items={topArtists}
        render={({ image, name }, props) => (
          <ArtistImageWrapperDiv {...props}>
            <ArtistImage src={image} alt={name} layout="fill" objectFit="cover" />
          </ArtistImageWrapperDiv>
        )}
        renderHoveringItem={({ name }) => <ArtistDetailsNameSpan>{name}</ArtistDetailsNameSpan>}
      />
    </>
  );
};

export { MusicArtists };
