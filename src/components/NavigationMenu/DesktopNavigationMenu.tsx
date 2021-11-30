import Link from 'next/link';
import { useMemo } from 'react';
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

    ${theme.media.extraSmall} {
      display: none;
    }

    ${theme.media.large} {
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

    ${theme.media.large} {
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

const DesktopNavigationMenu: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useRouter();

  const navigationLinks = useMemo(
    () => [
      { href: '/', title: t('navigation.home') },
      { href: '/about', title: t('navigation.about') },
      { href: '/portfolio', title: t('navigation.portfolio') },
      { href: '/travels', title: t('navigation.travels') },
      { href: '/music', title: t('navigation.music') },
    ],
    []
  );

  return (
    <Ul>
      {navigationLinks.map(({ href, title }) => (
        <Li key={title}>
          <Link href={href} passHref>
            <A active={pathname === href}>{title}</A>
          </Link>
        </Li>
      ))}
    </Ul>
  );
};

export { DesktopNavigationMenu };
