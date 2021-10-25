import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { Image } from '@src/components/Image/Image';

import type { FC } from 'react';

const PhotoKeyframes = keyframes`
  0% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }

  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }

  100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
`;

const PhotoDiv = styled.div`
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  animation: ${PhotoKeyframes} 8s ease-in-out infinite 1s;
`;

const StyledImage = styled(Image)``;

const Homepage: FC = () => (
  <PhotoDiv>
    <StyledImage src="http://tokyo.ibthemespro.com/static/media/1.6bd902c9.jpg" alt="teste" />
  </PhotoDiv>
);

export { Homepage };
