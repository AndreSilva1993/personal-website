import Link from 'next/link';
import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
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

const StyledMenu = styled(Menu)(
  ({ theme }) => css`
    width: 2.5rem;
    height: 2.5rem;
    color: ${theme.colors.white};

    ${theme.media.gteSmall} {
      display: none;
    }
  `
);

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
      <StyledMenu onClick={handleMenuIconClick} />

      <Drawer anchor="right" open={menuOpen} onClose={handleDrawerClose}>
        <Box css={{ width: '25rem' }}>
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
