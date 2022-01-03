import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type { DesktopNavigationMenuProps } from './NavigationMenu.types';

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

const DesktopNavigationMenu: FC<DesktopNavigationMenuProps> = ({ navigationLinks }) => {
  const { t } = useTranslation();
  const { pathname } = useRouter();

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
