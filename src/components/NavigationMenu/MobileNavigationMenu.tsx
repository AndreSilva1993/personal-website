import styles from './MobileNavigationMenu.module.css';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/icons-material/Menu';

import type { FC } from 'react';
import type { MobileNavigationMenuProps } from './NavigationMenu.types';

const MobileNavigationMenu: FC<MobileNavigationMenuProps> = ({ navigationLinks }) => {
  const { pathname } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuIconClick() {
    setMenuOpen(true);
  }

  function handleDrawerClose() {
    setMenuOpen(false);
  }

  return (
    <>
      <Menu onClick={handleMenuIconClick} className={styles.navigationMenuIcon} />

      <Drawer anchor="right" open={menuOpen} onClose={handleDrawerClose}>
        <Box className={styles.navigationMenu}>
          <List>
            {navigationLinks.map(({ href, title, Icon }) => (
              <Link href={href} key={title} passHref>
                <ListItemButton
                  component="a"
                  selected={href === pathname}
                  onClick={handleDrawerClose}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export { MobileNavigationMenu };
