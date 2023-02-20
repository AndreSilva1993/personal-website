import styles from './NavigationMenu.module.css';

import { useMemo } from 'react';

import { PersonIcon } from '@src/icons/PersonIcon';
import { useTranslation } from '@src/i18n/i18n-client';
import { MusicNoteIcon } from '@src/icons/MusicNoteIcon';
import { PhotoAlbumIcon } from '@src/icons/PhotoAlbumIcon';
import { LocationOnIcon } from '@src/icons/LocationOnIcon';
import { MobileNavigationMenu } from '@src/components/NavigationMenu/MobileNavigationMenu';
import { DesktopNavigationMenu } from 'src/components/NavigationMenu/DesktopNavigationMenu';

import type { FC } from 'react';

const NavigationMenu: FC = () => {
  const { t } = useTranslation();

  const navigationLinks = useMemo(
    () => [
      { href: '/', title: t('navigation.about'), icon: <PersonIcon /> },
      { href: '/portfolio', title: t('navigation.portfolio'), icon: <PhotoAlbumIcon /> },
      { href: '/travels', title: t('navigation.travels'), icon: <LocationOnIcon /> },
      { href: '/music', title: t('navigation.music'), icon: <MusicNoteIcon /> },
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
