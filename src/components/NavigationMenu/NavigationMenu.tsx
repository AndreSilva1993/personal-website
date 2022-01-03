import { useMemo } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { Home, Person, MusicNote, PhotoAlbum, LocationOn } from '@mui/icons-material';

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

const NavigationMenu: FC = () => {
  const { t } = useTranslation();

  const navigationLinks = useMemo(
    () => [
      { href: '/', title: t('navigation.home'), Icon: Home },
      { href: '/about', title: t('navigation.about'), Icon: Person },
      { href: '/portfolio', title: t('navigation.portfolio'), Icon: PhotoAlbum },
      { href: '/travels', title: t('navigation.travels'), Icon: LocationOn },
      { href: '/music', title: t('navigation.music'), Icon: MusicNote },
      { href: '/movies', title: t('navigation.movies'), Icon: MusicNote },
    ],
    []
  );

  return (
    <NavigationNav>
      <MobileNavigationMenu navigationLinks={navigationLinks} />
      <DesktopNavigationMenu navigationLinks={navigationLinks} />
    </NavigationNav>
  );
};

export { NavigationMenu };
