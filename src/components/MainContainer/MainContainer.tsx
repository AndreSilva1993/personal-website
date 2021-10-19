import styled from '@emotion/styled';

import { NavigationMenu } from '@src/components/NavigationMenu/NavigationMenu';

import type { FC } from 'react';

const ContainerDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const LeftSideDiv = styled.div`
  width: 45rem;
  height: 100%;
  padding: 10rem;
  background-color: ${({ theme }) => theme.colors.black};

  display: flex;
  align-items: center;
`;

const RightSideDiv = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.darkGrey};
`;

const PageContainerDiv = styled.div`
  width: 100%;
  max-width: 96rem;
  padding: 10rem 4rem;
`;

const MainContainer: FC = ({ children }) => {
  return (
    <ContainerDiv>
      <LeftSideDiv>
        <NavigationMenu />
      </LeftSideDiv>
      <RightSideDiv>
        <PageContainerDiv>{children}</PageContainerDiv>
      </RightSideDiv>
    </ContainerDiv>
  );
};

export { MainContainer };
