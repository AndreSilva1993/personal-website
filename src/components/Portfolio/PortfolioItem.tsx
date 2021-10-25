import { useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useAnimation, motion } from 'framer-motion';

import type { FC } from 'react';
import type { ControlsAnimationDefinition } from 'framer-motion/types/animation/types';

type AnimationDirection = 'left' | 'right' | 'top' | 'bottom';

const PortfolioItemWrapperDiv = styled(motion.div)(
  () => css`
    cursor: pointer;
    overflow: hidden;
    position: relative;
  `
);

const PortfolioItemDiv = styled.div<{ backgroundImage: string }>(
  ({ backgroundImage }) => css`
    padding-bottom: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(${backgroundImage});
  `
);

const PortfolioItemNameDiv = styled(motion.div)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    bottom: 0;
    position: absolute;
    font-size: 1.8rem;
    color: ${theme.colors.black};
    font-weight: ${theme.fontWeights.boldest};
    background-color: rgba(255, 255, 255, 0.6);
  `
);

const PortfolioItem: FC<PortfolioItemProps> = ({ name, image, index, onClick }) => {
  const controls = useAnimation();
  const wrapperRef = useRef<HTMLDivElement>();

  function getAnimationDirection({
    clientX,
    clientY,
  }: React.MouseEvent): ControlsAnimationDefinition {
    const { x, y, height, width } = wrapperRef.current.getBoundingClientRect();

    const elementBounds = [
      { direction: 'top', value: y - clientY },
      { direction: 'left', value: x - clientX },
      { direction: 'right', value: x + width - clientX },
      { direction: 'bottom', value: y + height - clientY },
    ] as Array<{
      value: number;
      direction: AnimationDirection;
    }>;

    const { direction } = elementBounds.reduce(
      (closestBound, bound) =>
        Math.abs(bound.value) < Math.abs(closestBound.value) ? bound : closestBound,
      elementBounds[0]
    );

    switch (direction) {
      case 'left':
      default:
        return { x: '-100%', y: 0 };
      case 'right':
        return { x: '100%', y: 0 };
      case 'top':
        return { y: '-100%', x: 0 };
      case 'bottom':
        return { y: '100%', x: 0 };
    }
  }

  function handleItemClick() {
    onClick(index);
  }

  function handleItemMouseEnter(event: React.MouseEvent<HTMLElement>) {
    controls.set(getAnimationDirection(event));
    controls.start({ x: 0, y: 0 });
  }

  function handleItemMouseLeave(event: React.MouseEvent<HTMLElement>) {
    controls.start(getAnimationDirection(event));
  }

  return (
    <PortfolioItemWrapperDiv
      ref={wrapperRef}
      onClick={handleItemClick}
      onMouseLeave={handleItemMouseLeave}
      onMouseEnter={handleItemMouseEnter}
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: '-10rem', opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.25 * index }}
    >
      <PortfolioItemDiv backgroundImage={`/images/portfolio/${image}`} />

      <PortfolioItemNameDiv
        animate={controls}
        initial={{ x: '-100%', y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {name}
      </PortfolioItemNameDiv>
    </PortfolioItemWrapperDiv>
  );
};

interface PortfolioItemProps {
  name: string;
  image: string;
  index: number;
  onClick: (index: number) => void;
}

export { PortfolioItem };
