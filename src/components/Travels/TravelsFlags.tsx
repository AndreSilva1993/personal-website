import styled from '@emotion/styled';

import type { FC } from 'react';
import type { TravelsFlagsProps } from './Travels.types';

const FlagsWrapperDiv = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 4rem 0;
  position: relative;
`;

const FlagWrapperDiv = styled.li`
  width: 5rem;
  cursor: pointer;
  position: relative;
  aspect-ratio: 4 / 3;

  &:not(:last-of-type) {
    margin-right: 3rem;
  }
`;

const TravelsFlags: FC<TravelsFlagsProps> = ({ flags, onFlagClick }) => (
  <FlagsWrapperDiv>
    {flags.map(({ name, image }, index) => (
      <FlagWrapperDiv key={index} onClick={() => onFlagClick(index)}>
        <img alt={name} title={name} src={image} />
      </FlagWrapperDiv>
    ))}
  </FlagsWrapperDiv>
);

export { TravelsFlags };
