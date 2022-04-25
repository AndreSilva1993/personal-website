import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Close } from '@mui/icons-material';
import { Modal as MaterialUIModal } from '@mui/material';

import type { ModalProps } from '@mui/material';

const StyledClose = styled(Close)(
  ({ theme }) => css`
    top: 3rem;
    right: 3rem;
    width: 3rem;
    height: 3rem;
    position: fixed;
    cursor: pointer;
    color: ${theme.colors.white};
    z-index: ${theme.layers.modal};

    ${theme.media.extraSmall} {
      top: 1.5rem;
      right: 1.5rem;
      color: ${theme.colors.black};
    }
  `
);

const Modal = ({ children, open, onClose }: ModalProps) => (
  <MaterialUIModal open={open} onClose={onClose}>
    <>
      {children}
      <StyledClose onClick={(event) => onClose(event, 'backdropClick')} />
    </>
  </MaterialUIModal>
);

export { Modal };
