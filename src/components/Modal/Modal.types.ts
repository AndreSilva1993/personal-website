import { MotionProps } from 'framer-motion';

interface ModalProps {
  open: boolean;
  onClose: VoidFunction;
  motionProps: MotionProps;
}

export type { ModalProps };
