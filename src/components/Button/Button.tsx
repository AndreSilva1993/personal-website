import styled from '@emotion/styled';
import { css } from '@emotion/react';

import type { FC } from 'react';
import type { ButtonProps } from '@src/components/Button/Button.types';

const StyledButton = styled.button(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    height: 3.6rem;
    padding: 0 1.5rem;

    outline: none;
    cursor: pointer;
    border-radius: 0.4rem;
    background-color: transparent;
    color: ${theme.colors.white};
    font-weight: ${theme.fontWeights.boldest};
    border: 1px solid ${theme.colors.white};
    text-transform: uppercase;
    transition: background-color 250ms ease-out;

    &:hover {
      background-color: ${theme.colors.grey};
    }
  `
);

const Button: FC<ButtonProps> = ({ onClick, children, ...remainingProps }) => (
  <StyledButton onClick={onClick} type="button" {...remainingProps}>
    {children}
  </StyledButton>
);

export { Button };
