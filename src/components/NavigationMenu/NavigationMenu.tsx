import Link from 'next/link';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const Ul = styled.ul`
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};

  list-style: none;
  padding: 4rem 0;
`;

const Li = styled.li`
  cursor: pointer;
  height: 3rem;
  margin-bottom: 1rem;
  transition: color 100ms ease, letter-spacing 100ms ease;

  &:hover {
    letter-spacing: 0.2rem;
    color: ${({ theme }) => theme.colors.white};
  }
`;

const A = styled.a<{ active?: boolean }>`
  text-decoration: none;
  color: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.lightGrey)};
`;

import type { FC } from 'react';

const NavigationMenu: FC = () => {
  const { pathname } = useRouter();

  return (
    <nav>
      <Ul>
        <Li>
          <Link href="/">
            <A active={pathname === '/'}>Home</A>
          </Link>
        </Li>
        <Li>
          <Link href="/about">
            <A active={pathname === '/about'}>About</A>
          </Link>
        </Li>
        <Li>
          <Link href="/portfolio">
            <A active={pathname === '/portfolio'}>Portfolio</A>
          </Link>
        </Li>
      </Ul>
    </nav>
  );
};

export { NavigationMenu };
