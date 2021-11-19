import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

import { NavigationMenu } from '@src/components/NavigationMenu/NavigationMenu';

import type { FC, ReactElement } from 'react';

const ContainerDiv = styled.div(
  ({ theme }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    ${theme.media.large} {
      flex-direction: row;
    }
  `
);

const ContentDiv = styled.div(
  ({ theme }) => css`
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    padding: 6rem 4rem;
    background-color: ${theme.colors.darkGrey};
  `
);

const MainContainer: FC = ({ children }) => {
  const { pathname } = useRouter();

  if (pathname === '/404') {
    return children as ReactElement;
  }

  return (
    <ContainerDiv>
      <NavigationMenu />
      <ContentDiv>{children}</ContentDiv>
    </ContainerDiv>
  );
};

export { MainContainer };
