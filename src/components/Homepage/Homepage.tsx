import Image from 'next/image';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

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

const Homepage: FC = () => (
  <PhotoDiv>
    <Image
      alt="teste"
      width={50}
      height={50}
      src="http://tokyo.ibthemespro.com/static/media/1.6bd902c9.jpg"
    />
  </PhotoDiv>
);

export { Homepage };
