import { useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { MdClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

import type { FC } from 'react';

const ModalOverlay = styled(motion.div)(
  ({ theme }) => css`
    height: 100%;
    width: 100vw;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${theme.colors.black};
  `
);

const ModalWrapperDiv = styled(motion.div)(
  ({ theme }) => css`
    position: fixed;
    top: 5%;
    left: 25%;
    width: calc(100vw - 50%);
    height: calc(100% - 10%);
    margin: auto;
    background-color: ${theme.colors.white};

    ${theme.breakpoints.extraSmall} {
      top: 0;
      left: 0;
      width: 100vw;
      height: 100%;
    }
  `
);

const StyledMdClose = styled(MdClose)(
  ({ theme }) => css`
    top: 3rem;
    right: 3rem;
    width: 3rem;
    height: 3rem;
    position: fixed;
    cursor: pointer;
    color: ${theme.colors.white};

    ${theme.breakpoints.extraSmall} {
      top: 1.5rem;
      right: 1.5rem;
      color: ${theme.colors.black};
    }
  `
);

const Modal: FC<ModalProps> = ({ children, open, onClose }) => {
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
          <ModalWrapperDiv
            exit={{ opacity: 0, x: 0 }}
            initial={{ opacity: 0, x: '-3rem' }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </ModalWrapperDiv>
          <StyledMdClose onClick={onClose} />
        </>
      ) : null}
    </AnimatePresence>
  );
};

interface ModalProps {
  open: boolean;
  onClose: VoidFunction;
}

export { Modal };
