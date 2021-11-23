import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

const dotKeyframes = keyframes`
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-0.5rem);
  }

  100% {
    transform: translateY(0);
  }
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

    animation-duration: 0.75s;
    animation-name: ${dotKeyframes};
    animation-iteration-count: infinite;

    &:nth-child(2) {
      animation-delay: 0.125s;
    }

    &:nth-child(3) {
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
