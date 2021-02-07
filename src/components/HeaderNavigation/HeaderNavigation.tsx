import styled from '@emotion/styled';

const Ul = styled.ul`
  display: flex;
`;

const Li = styled.li<{ active?: boolean }>`
  margin-right: 4rem;
  list-style: none;
  font-size: 1.4rem;
  color: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.grey)};
  &:last-of-type {
    margin-right: 0;
  }
`;

export const HeaderNavigation = () => {
  return (
    <Ul>
      <Li active>About Me</Li>
      <Li>Resume</Li>
      <Li>Portfolio</Li>
      <Li>Blog</Li>
      <Li>Contact</Li>
    </Ul>
  );
};
