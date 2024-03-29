'use client';

import styles from './DesktopNavigationMenu.module.css';

import Link from 'next/link';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

import type { DesktopNavigationMenuProps } from './NavigationMenu.types';

export function DesktopNavigationMenu({ navigationLinks }: DesktopNavigationMenuProps) {
  const pathname = usePathname();

  return (
    <ul className={styles.menuList}>
      {navigationLinks.map(({ href, title }) => (
        <li className={styles.menuItem} key={title}>
          <Link
            href={href}
            className={classNames(styles.menuItemLink, {
              [styles.menuItemLinkActive]: pathname === href,
            })}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
