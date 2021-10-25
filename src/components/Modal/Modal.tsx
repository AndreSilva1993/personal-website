import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

import type { FC } from 'react';

const ModalOverlay = styled(motion.div)`
  height: 100%;
  width: 100vw;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.black};
`;

const ModalWrapperDiv = styled(motion.div)`
  position: fixed;
  top: 10%;
  left: 10%;
  width: calc(100vw - 20%);
  height: calc(100vh - 20%);
  overflow: auto;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Modal: FC<ModalProps> = ({ children, open, onClose }) => (
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
      </>
    ) : null}
  </AnimatePresence>
);

interface ModalProps {
  open: boolean;
  onClose: VoidFunction;
}

export { Modal };
