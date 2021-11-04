import { motion } from 'framer-motion';

import type { FC } from 'react';

const PageContainer: FC = ({ children, ...remainingProps }) => (
  <motion.div
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -100, opacity: 0 }}
    initial={{ x: -100, opacity: 0 }}
    transition={{ duration: 1, ease: 'easeInOut' }}
    {...remainingProps}
  >
    {children}
  </motion.div>
);

export { PageContainer };
