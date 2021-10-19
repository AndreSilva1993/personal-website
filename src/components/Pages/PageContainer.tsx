import { motion, AnimatePresence } from 'framer-motion';

import type { FC } from 'react';

const PageContainer: FC = ({ children }) => (
  <AnimatePresence>
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: '-10rem', opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

export { PageContainer };
