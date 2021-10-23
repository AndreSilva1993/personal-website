import styled from '@emotion/styled';

import type { FC } from 'react';
import type { ImageProps } from './Image.types';

const Img = styled.img`
  width: 100%;
`;

const Image: FC<ImageProps> = ({ src, alt, ...remainingProps }) => (
  <Img src={src} alt={alt} {...remainingProps} />
);

export { Image };
