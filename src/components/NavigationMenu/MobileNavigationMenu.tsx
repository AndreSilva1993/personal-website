import Link from 'next/link';
import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { Menu } from '@mui/icons-material';

import { Modal } from '@src/components/Modal/Modal';

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

const StyledModal = styled(Modal)(
  ({ theme }) => css`
    top: 0;
    right: 0;
    width: 70vw;
    height: 100vh;

    position: fixed;
    background-color: ${theme.colors.darkGrey};
  `
);

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.8rem 0;
`;

const Li = styled.li`
  font-size: 1.6rem;
`;

const A = styled.a<{ active?: boolean }>(
  ({ theme, active }) => css`
    width: 100%;
    height: 100%;
    padding: 1.2rem 1.6rem;
    display: flex;
    align-items: center;

    text-decoration: none;
    transition: color 200ms ease;
    color: ${active ? theme.colors.pink : theme.colors.white};
    background-color: ${active ? theme.colors.pinkTransparent : theme.colors.darkGrey};

    transition: color 250ms ease-out, background-color 250ms ease-out;
  `
);

const MobileNavigationMenu: FC<MobileNavigationMenuProps> = ({ navigationLinks }) => {
  const { pathname } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuIconClick() {
    setMenuOpen(true);
  }

  function handleModalClose() {
    setMenuOpen(false);
  }

  return (
    <>
      <StyledMenu onClick={handleMenuIconClick} />

      <StyledModal
        open={menuOpen}
        onClose={handleModalClose}
        motionProps={{
          initial: { opacity: 0, x: '100%' },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: '100%' },
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
      >
        <Ul>
          {navigationLinks.map(({ href, title, Icon }) => (
            <Li key={title}>
              <Link href={href} passHref>
                <A active={pathname === href} onClick={handleModalClose}>
                  <Icon css={{ height: '2.4rem', width: '2.4rem', marginRight: '3.2rem' }} />
                  {title}
                </A>
              </Link>
            </Li>
          ))}
        </Ul>
      </StyledModal>
    </>
  );
};

export { MobileNavigationMenu };
