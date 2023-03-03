import styles from './NavigationMenu.module.css';

import { PersonIcon } from '@src/icons/PersonIcon';
import { MusicNoteIcon } from '@src/icons/MusicNoteIcon';
import { PhotoAlbumIcon } from '@src/icons/PhotoAlbumIcon';
import { LocationOnIcon } from '@src/icons/LocationOnIcon';
import { MobileNavigationMenu } from '@src/components/NavigationMenu/MobileNavigationMenu';
import { DesktopNavigationMenu } from 'src/components/NavigationMenu/DesktopNavigationMenu';

import { initI18next } from '@src/i18n/server';

export async function NavigationMenu() {
  const { t } = await initI18next();

  const navigationLinks = [
    { href: '/', title: t('navigation.about'), icon: <PersonIcon /> },
    { href: '/portfolio', title: t('navigation.portfolio'), icon: <PhotoAlbumIcon /> },
    { href: '/travels', title: t('navigation.travels'), icon: <LocationOnIcon /> },
    { href: '/music', title: t('navigation.music'), icon: <MusicNoteIcon /> },
  ];

  return (
    <nav className={styles.navigationMenu}>
      <MobileNavigationMenu navigationLinks={navigationLinks} />
      <DesktopNavigationMenu navigationLinks={navigationLinks} />
    </nav>
  );
}
