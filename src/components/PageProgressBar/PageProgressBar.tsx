import styles from './PageProgressBar.module.css';

import { AnimatePresence, motion } from 'framer-motion';

import type { FC } from 'react';
import type { PageProgressBarProps } from './PageProgressBar.types';

const PageProgressBar: FC<PageProgressBarProps> = ({ loading }) => (
  <AnimatePresence>
    {loading && (
      <motion.div
        className={styles.progressBar}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0.8 }}
        transition={{ duration: 5 }}
        exit={{ scaleX: 1, transition: { duration: 1 } }}
        style={{ transformOrigin: 'left' }}
      />
    )}
  </AnimatePresence>
);

export { PageProgressBar };
