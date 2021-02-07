import styled from '@emotion/styled';
import { HeaderNavigation } from '@src/components/HeaderNavigation';

const Header = styled.header`
  display: flex;
  margin-bottom: 40px;
  justify-content: space-between;
`;

const HeaderAuthor = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.white};
`;

const HeaderAuthorCircle = styled.span`
  display: block;
  width: 4.5rem;
  height: 4.5rem;
  line-height: 4.5rem;
  font-size: 2.8rem;
  text-align: center;
  margin-right: 0.8rem;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  font-weight: ${({ theme }) => theme.fontWeights.boldest};
`;

const HeaderAuthorName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  &::after {
    content: ' ';
    white-space: pre;
  }
`;

export const MainContainerHeader = () => {
  return (
    <Header>
      <HeaderAuthor>
        <HeaderAuthorCircle>A</HeaderAuthorCircle>
        <HeaderAuthorName>André</HeaderAuthorName>Silva
      </HeaderAuthor>
      <HeaderNavigation />
    </Header>
  );
};
