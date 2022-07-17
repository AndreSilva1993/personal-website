import styles from './NavigationMenu.module.css';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Person, MusicNote, PhotoAlbum, LocationOn, Movie } from '@mui/icons-material';

import { MobileNavigationMenu } from '@src/components/NavigationMenu/MobileNavigationMenu';
import { DesktopNavigationMenu } from 'src/components/NavigationMenu/DesktopNavigationMenu';

import type { FC } from 'react';

const NavigationMenu: FC = () => {
  const { t } = useTranslation();

  const navigationLinks = useMemo(
    () => [
      { href: '/', title: t('navigation.about'), Icon: Person },
      { href: '/portfolio', title: t('navigation.portfolio'), Icon: PhotoAlbum },
      { href: '/travels', title: t('navigation.travels'), Icon: LocationOn },
      { href: '/music', title: t('navigation.music'), Icon: MusicNote },
      { href: '/movies', title: t('navigation.movies'), Icon: Movie },
    ],
    []
  );

  return (
    <nav className={styles.navigationMenu}>
      <MobileNavigationMenu navigationLinks={navigationLinks} />
      <DesktopNavigationMenu navigationLinks={navigationLinks} />
    </nav>
  );
};

export { NavigationMenu };
