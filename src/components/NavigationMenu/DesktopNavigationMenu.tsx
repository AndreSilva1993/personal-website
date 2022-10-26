import styles from './DesktopNavigationMenu.module.css';

import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import type { FC } from 'react';
import type { DesktopNavigationMenuProps } from './NavigationMenu.types';

const DesktopNavigationMenu: FC<DesktopNavigationMenuProps> = ({ navigationLinks }) => {
  const { pathname } = useRouter();

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
};

export { DesktopNavigationMenu };
