import styles from './NavigationMenu.module.css';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { PersonIcon } from '@src/icons/PersonIcon';
import { MusicNoteIcon } from '@src/icons/MusicNoteIcon';
import { PhotoAlbumIcon } from '@src/icons/PhotoAlbumIcon';
import { LocationOnIcon } from '@src/icons/LocationOnIcon';
import { MobileNavigationMenu } from '@src/components/NavigationMenu/MobileNavigationMenu';
import { DesktopNavigationMenu } from 'src/components/NavigationMenu/DesktopNavigationMenu';

import type { FC } from 'react';
import { MovieIcon } from '@src/icons/MovieIcon';

const NavigationMenu: FC = () => {
  const { t } = useTranslation();

  const navigationLinks = useMemo(
    () => [
      { href: '/', title: t('navigation.about'), icon: <PersonIcon /> },
      { href: '/portfolio', title: t('navigation.portfolio'), icon: <PhotoAlbumIcon /> },
      { href: '/travels', title: t('navigation.travels'), icon: <LocationOnIcon /> },
      { href: '/music', title: t('navigation.music'), icon: <MusicNoteIcon /> },
      { href: '/movies', title: t('navigation.movies'), icon: <MovieIcon /> },
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
