import styles from './Modal.module.css';

import { Close } from '@mui/icons-material';
import { Modal as MaterialUIModal } from '@mui/material';

import type { ModalProps } from '@mui/material';

const Modal = ({ children, open, onClose }: ModalProps) => (
  <MaterialUIModal open={open} onClose={onClose}>
    <>
      {children}
      <Close onClick={(event) => onClose(event, 'backdropClick')} className={styles.closeIcon} />
    </>
  </MaterialUIModal>
);

export { Modal };
