import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

import { Image } from '@src/components/Image/Image';

import type { FC } from 'react';

const StyledImage = styled(Image)`
  margin-bottom: 5rem;
`;

const About: FC = () => {
  return (
    <AnimatePresence>
      <motion.div
        animate={{ x: 0, opacity: 1 }}
        initial={{ x: '-10rem', opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <StyledImage src="http://tokyo.ibthemespro.com/assets/img/slider/1.jpg" />
      </motion.div>
    </AnimatePresence>
  );
};

export { About };
