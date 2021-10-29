import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { NavigationMenu } from '@src/components/NavigationMenu/NavigationMenu';

import type { FC } from 'react';

const ContainerDiv = styled.div(
  ({ theme }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    ${theme.breakpoints.large} {
      flex-direction: row;
    }
  `
);

const NavigationDiv = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: ${theme.colors.black};

    width: 100%;
    height: 7rem;
    padding: 2rem 4rem;

    ${theme.breakpoints.large} {
      width: 40rem;
      height: 100%;
      padding: 10rem;
      justify-content: flex-start;
    }
  `
);

const ContentDiv = styled.div`
  flex-grow: 1;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.darkGrey};
  overflow: auto;
  padding: 10rem 4rem;
`;

const MainContainer: FC = ({ children }) => (
  <ContainerDiv>
    <NavigationDiv>
      <NavigationMenu />
    </NavigationDiv>
    <ContentDiv>{children}</ContentDiv>
  </ContainerDiv>
);

export { MainContainer };
