import styles from './Modal.module.css';

import { motion, AnimatePresence } from 'framer-motion';

import { CloseIcon } from '@src/icons/CloseIcon';

interface ModalProps {
  open: boolean;
  children: JSX.Element;
  onClose: () => void;
}

const Modal = ({ children, open, onClose }: ModalProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className={styles.modalBackdrop} onClick={onClose} />
        {children}
        <CloseIcon onClick={onClose} className={styles.closeIcon} />
      </motion.div>
    )}
  </AnimatePresence>
);

export { Modal };
