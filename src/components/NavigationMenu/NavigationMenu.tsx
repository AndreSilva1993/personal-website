import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

const Ul = styled.ul(
  ({ theme }) => css`
    display: flex;
    font-size: 1.5rem;
    font-weight: ${theme.fontWeights.bold};

    ${theme.breakpoints.large} {
      flex-direction: column;
    }
  `
);

const Li = styled.li(
  ({ theme }) => css`
    cursor: pointer;
    height: 3rem;

    &:not(:last-of-type) {
      margin-right: 2rem;
    }

    ${theme.breakpoints.large} {
      &:not(:last-of-type) {
        margin-right: 0;
        margin-bottom: 2rem;
      }
    }
  `
);

const A = styled.a<{ active?: boolean }>(
  ({ theme, active }) => css`
    height: 100%;
    display: flex;
    align-items: center;

    text-decoration: none;
    transition: color 200ms ease;
    color: ${active ? theme.colors.white : theme.colors.lightGrey};

    &:hover {
      color: ${theme.colors.white};
    }
  `
);

const NavigationMenu: FC = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation();

  return (
    <nav>
      <Ul>
        <Li>
          <Link href="/">
            <A active={pathname === '/'}>{t('navigation.home')}</A>
          </Link>
        </Li>
        <Li>
          <Link href="/about">
            <A active={pathname === '/about'}>{t('navigation.about')}</A>
          </Link>
        </Li>
        <Li>
          <Link href="/portfolio">
            <A active={pathname === '/portfolio'}>
              {t('navigation.portfolio')}
            </A>
          </Link>
        </Li>
      </Ul>
    </nav>
  );
};

export { NavigationMenu };
