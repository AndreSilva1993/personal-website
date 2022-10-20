import styles from './MobileNavigationMenu.module.css';

import Link from 'next/link';
import { useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

import type { FC } from 'react';
import type { MobileNavigationMenuProps } from './NavigationMenu.types';

import { MenuIcon } from '@src/icons/MenuIcon';

const MobileNavigationMenu: FC<MobileNavigationMenuProps> = ({ navigationLinks }) => {
  const { pathname } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <MenuIcon onClick={() => setMenuOpen(true)} className={styles.navigationMenuIcon} />

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              initial={{ x: '100%' }}
              className={styles.navigationMenu}
            >
              <ul className={styles.navigationMenuList}>
                {navigationLinks.map(({ href, title, icon }) => (
                  <li className={styles.navigationMenuListItem} key={href}>
                    <Link href={href} key={title} passHref>
                      <a
                        onClick={() => setMenuOpen(false)}
                        className={classNames(styles.navigationMenuListItemLink, {
                          [styles.navigationMenuListItemLinkSelected]: pathname === href,
                        })}
                      >
                        {icon}
                        {title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.navigationMenuBackdrop}
              onClick={() => setMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export { MobileNavigationMenu };
