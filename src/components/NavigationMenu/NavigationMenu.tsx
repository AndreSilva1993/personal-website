import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { MobileNavigationMenu } from '@src/components/NavigationMenu/MobileNavigationMenu';
import { DesktopNavigationMenu } from 'src/components/NavigationMenu/DesktopNavigationMenu';

import type { FC } from 'react';

const NavigationNav = styled.nav(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: ${theme.colors.black};

    width: 100%;
    height: 7rem;
    padding: 2rem 4rem;
    flex-shrink: 0;

    ${theme.media.large} {
      width: 40rem;
      height: 100%;
      padding: 10rem;
      justify-content: flex-start;
    }
  `
);

const NavigationMenu: FC = () => (
  <NavigationNav>
    <MobileNavigationMenu />
    <DesktopNavigationMenu />
  </NavigationNav>
);

export { NavigationMenu };
