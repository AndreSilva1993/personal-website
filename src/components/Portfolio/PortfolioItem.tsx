import Image from 'next/image';
import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useAnimation, motion } from 'framer-motion';

import type { FC } from 'react';
import type { PortfolioItemProps } from '@src/components/Portfolio/Portfolio.types';
import type { ControlsAnimationDefinition } from 'framer-motion/types/animation/types';

type AnimationDirection = 'left' | 'right' | 'top' | 'bottom';

const PortfolioItemWrapperDiv = styled(motion.div)(
  () => css`
    cursor: pointer;
    overflow: hidden;
    position: relative;
    padding-bottom: 100%;
  `
);

const PortfolioItemNameDiv = styled(motion.div)`
  width: 100%;
  height: 100%;
  padding: 20%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
`;

const LogoWrapperDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const PortfolioItem: FC<PortfolioItemProps> = ({
  name,
  image,
  index,
  logoImage,
  onClick,
}) => {
  const controls = useAnimation();
  const wrapperRef = useRef<HTMLDivElement>();
  const [isHovering, setIsHovering] = useState(false);

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
        Math.abs(bound.value) < Math.abs(closestBound.value)
          ? bound
          : closestBound,
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
    setIsHovering(true);
    controls.set(getAnimationDirection(event));
    controls.start({ x: 0, y: 0 });
  }

  function handleItemMouseLeave(event: React.MouseEvent<HTMLElement>) {
    setIsHovering(false);
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
      <Image
        priority
        alt={name}
        src={image}
        sizes="50vw"
        layout="fill"
        objectFit="cover"
        css={css`
          transform: scale(${isHovering ? 1.1 : 1});
          transition: transform 500ms ease, filter 500ms ease;
        `}
      />

      <PortfolioItemNameDiv
        animate={controls}
        initial={{ x: '-100%', y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <LogoWrapperDiv>
          <Image
            priority
            alt={name}
            src={logoImage}
            layout="fill"
            objectFit="contain"
          />
        </LogoWrapperDiv>
      </PortfolioItemNameDiv>
    </PortfolioItemWrapperDiv>
  );
};

export { PortfolioItem };
