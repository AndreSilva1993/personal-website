import styled from '@emotion/styled';
import { css } from '@emotion/react';

import type { FC } from 'react';
import type { SelectProps } from './Select.types';

const StyledSelect = styled.select(
  ({ theme }) => css`
    outline: none;
    padding: 1rem 3rem;
    border-radius: 1rem;
    font-size: 1.5rem;
    color: ${theme.colors.lightGrey};
    background-color: transparent;
  `
);

const Select: FC<SelectProps> = ({ value, onChange, children, ...remainingProps }) => (
  <StyledSelect value={value} onChange={onChange} {...remainingProps}>
    {children}
  </StyledSelect>
);

export { Select };
