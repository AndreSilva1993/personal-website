import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';

import type { FC } from 'react';
import type { PageProgressBarProps } from './PageProgressBar.types';

const PageProgressBarDiv = styled(motion.div)(
  ({ theme }) => css`
    width: 100vw;
    height: 0.5rem;

    top: 0;
    left: 0;
    position: fixed;
    background-color: ${theme.colors.white};
  `
);

const PageProgressBar: FC<PageProgressBarProps> = ({ loading }) => (
  <AnimatePresence>
    {loading && (
      <PageProgressBarDiv
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
