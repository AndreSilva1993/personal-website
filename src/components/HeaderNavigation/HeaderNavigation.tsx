import styled from '@emotion/styled';

const Ul = styled.ul`
  display: flex;
  height: 5rem;
  align-items: center;
`;

const Li = styled.li<{ active?: boolean }>`
  margin-right: 4rem;
  list-style: none;
  font-size: 1.4rem;
  color: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.grey03)};
  transition: color 100ms linear;
  &:last-of-type {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.white};
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
