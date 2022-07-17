import styles from './ProgressBar.module.css';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import type { FC } from 'react';

const ProgressBar: FC<ProgressBarProps> = ({ value, delay = 0, className }) => (
  <div className={classNames(styles.progressBarWrapper, className)}>
    <motion.div
      className={styles.progressBar}
      style={{ transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: value / 100 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
    />
  </div>
);

interface ProgressBarProps {
  value: number;
  delay?: number;
  className?: string;
}

export { ProgressBar };
