import styled from '@emotion/styled';
import { css } from '@emotion/react';

import type { FC } from 'react';
import type { TravelsFlagsProps } from './Travels.types';

const FlagsWrapperUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const FlagWrapperLi = styled.li(
  ({ theme }) => css`
    width: 5rem;
    margin: 2rem;
    cursor: pointer;
    flex-shrink: 0;
    aspect-ratio: 4 / 3;

    ${theme.breakpoints.extraSmall} {
      margin: 1rem;
    }
  `
);

const TravelsFlags: FC<TravelsFlagsProps> = ({ flags, onFlagClick }) => (
  <FlagsWrapperUl>
    {flags.map(({ name, image }, index) => (
      <FlagWrapperLi key={index} onClick={() => onFlagClick(index)}>
        <img alt={name} title={name} src={image} />
      </FlagWrapperLi>
    ))}
  </FlagsWrapperUl>
);

export { TravelsFlags };
