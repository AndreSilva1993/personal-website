import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import type { FC } from 'react';

const ProgressBarWrapper = styled.div(
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

const ProgressBar: FC<ProgressBarProps> = ({
  value,
  delay = 0,
  ...remainingProps
}) => (
  <ProgressBarWrapper {...remainingProps}>
    <ProgressBarDiv
      style={{ transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: value / 100 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
    />
  </ProgressBarWrapper>
);

interface ProgressBarProps {
  value: number;
  delay?: number;
}

export { ProgressBar };
