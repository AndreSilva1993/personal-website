import styled from '@emotion/styled';

import type { FC } from 'react';
import type { LeafletPopupProps } from './Travels.types';

const StyledImage = styled.img`
  height: 30rem;
`;

const StyledP = styled.p`
  margin: 2rem 0;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
`;

const LeafletPopup: FC<LeafletPopupProps> = ({ image, name }) => (
  <>
    <StyledImage src={image} alt={name} />
    <StyledP>{name}</StyledP>
  </>
);

export { LeafletPopup };
