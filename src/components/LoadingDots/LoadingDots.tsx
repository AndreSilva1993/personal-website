import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

const dotKeyframes = keyframes`
  0% { transform: scale(1.1); }
  50% { transform: scale(0.1); }
  100% { transform: scale(1); }
`;

const DotsWrapperDiv = styled.div`
  display: flex;
`;

const DotDiv = styled.div(
  ({ theme }) => css`
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: ${theme.colors.white};

    animation-duration: 1s;
    animation-name: ${dotKeyframes};
    animation-iteration-count: infinite;

    &:nth-of-type(2) {
      animation-delay: 0.125s;
    }

    &:nth-of-type(3) {
      animation-delay: 0.25s;
    }

    & + div {
      margin-left: 1rem;
    }
  `
);

const LoadingDots = () => (
  <DotsWrapperDiv>
    <DotDiv />
    <DotDiv />
    <DotDiv />
  </DotsWrapperDiv>
);

export { LoadingDots };
