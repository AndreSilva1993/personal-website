import styled from '@emotion/styled';

import { MusicAlbums } from '@src/components/Music/MusicAlbums';
import { MusicStatistics } from '@src/components/Music/MusicStatistics';
import { MusicRecentTracks } from '@src/components/Music/MusicRecentTracks';
import { PageContainer } from '@src/components/PageContainer/PageContainer';

import type { FC } from 'react';

const StyledPageContainer = styled(PageContainer)`
  margin: 0 auto;
  max-width: 120rem;
`;

const Music: FC = () => (
  <StyledPageContainer>
    <MusicStatistics />
    <MusicAlbums />
    <MusicRecentTracks />
  </StyledPageContainer>
);

export { Music };
