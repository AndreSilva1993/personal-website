import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

import { NavigationMenu } from '@src/components/NavigationMenu/NavigationMenu';

import type { ReactElement, ReactNode } from 'react';

interface MainContainerProps {
  children?: ReactNode;
}

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

const ContentMain = styled.main(
  ({ theme }) => css`
    flex-grow: 1;
    height: 100%;
    overflow: auto;
    padding: 6rem 4rem;
    background-color: ${theme.colors.darkGrey};
  `
);

const MainContainer = ({ children }: MainContainerProps) => {
  const { pathname } = useRouter();

  if (pathname === '/404') {
    return children as ReactElement;
  }

  return (
    <ContainerDiv>
      <NavigationMenu />
      <ContentMain>{children}</ContentMain>
    </ContainerDiv>
  );
};

export { MainContainer };
