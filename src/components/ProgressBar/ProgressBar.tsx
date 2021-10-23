import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import type { FC } from 'react';

const ProgressBarWrapper = styled.div<{ delayAnimation: number }>(
  ({ theme }) => css`
    position: relative;
    background-color: ${theme.colors.grey};
  `
);

const ProgressBarDiv = styled(motion.div)(
  ({ theme }) => css`
    height: 100%;
    background-color: ${theme.colors.white};
  `
);

const ProgressBar: FC<ProgressBarProps> = ({ value, delayAnimation = 0, ...remainingProps }) => (
  <ProgressBarWrapper delayAnimation={delayAnimation} {...remainingProps}>
    <ProgressBarDiv
      style={{ transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: `${value}%` }}
      transition={{ duration: 1, delay: 0.5 + 0.1 * delayAnimation, ease: 'easeOut' }}
    />
  </ProgressBarWrapper>
);

interface ProgressBarProps {
  value: number;
  delayAnimation?: number;
}

export { ProgressBar };
