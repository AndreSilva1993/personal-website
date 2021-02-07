import styled from '@emotion/styled';
import { MainContainerHeader } from './MainContainerHeader';

const Div = styled.div`
  border-radius: 40px;
  margin: 3% auto;
  width: 1240px;
  padding: 4rem 7rem;
  background-color: ${({ theme }) => theme.colors.black};
`;

export const MainContainer = ({ children }) => {
  return (
    <Div>
      <MainContainerHeader />
      {children}
    </Div>
  );
};
