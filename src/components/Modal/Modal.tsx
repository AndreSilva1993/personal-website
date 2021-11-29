import { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { MdClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

import type { FC } from 'react';
import type { ModalProps } from '@src/components/Modal/Modal.types';

const ModalOverlay = styled(motion.div)(
  ({ theme }) => css`
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    background-color: ${theme.colors.black};
    z-index: ${theme.layers.modalOverlay};
  `
);

const ModalWrapperDiv = styled(motion.div)(
  ({ theme }) => css`
    position: fixed;
    z-index: ${theme.layers.modal};
  `
);

const StyledClose = styled(MdClose)(
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

const Modal: FC<ModalProps> = ({ children, open, onClose, motionProps, ...remainingProps }) => {
  useEffect(() => {
    if (!open) return undefined;

    const handleDocumentKeyDown = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleDocumentKeyDown);

    return () => document.removeEventListener('keydown', handleDocumentKeyDown);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <ModalOverlay
            onClick={onClose}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.5 }}
          />

          <ModalWrapperDiv {...motionProps} {...remainingProps}>
            {children}
          </ModalWrapperDiv>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <StyledClose onClick={onClose} />
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export { Modal };
