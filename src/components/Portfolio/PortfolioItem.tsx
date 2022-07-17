import styles from './PortfolioItem.module.css';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { css } from '@emotion/react';
import { useAnimation, motion } from 'framer-motion';

import type { FC } from 'react';
import type { PortfolioItemProps } from '@src/components/Portfolio/Portfolio.types';

type AnimationDirection = 'left' | 'right' | 'top' | 'bottom';

const PortfolioItem: FC<PortfolioItemProps> = ({ name, image, index, logoImage, onClick }) => {
  const controls = useAnimation();
  const wrapperRef = useRef<HTMLDivElement>();
  const [isHovering, setIsHovering] = useState(false);

  function getAnimationDirection({ clientX, clientY }: React.MouseEvent) {
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
      case 'right':
        return { x: '100%', y: 0 };
      case 'top':
        return { y: '-100%', x: 0 };
      case 'bottom':
        return { y: '100%', x: 0 };
      case 'left':
      default:
        return { x: '-100%', y: 0 };
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
    <motion.div
      className={styles.itemOuterWrapper}
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
        placeholder="blur"
        objectFit="cover"
        layout="fill"
        sizes="(max-width: 767px) 100vw, 33vw"
        css={css`
          transform: scale(${isHovering ? 1.1 : 1});
          transition: transform 500ms ease, filter 500ms ease;
        `}
      />

      <motion.div
        className={styles.itemWrapper}
        animate={controls}
        initial={{ x: '-100%', y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className={styles.itemImage}>
          <Image
            priority
            alt={name}
            src={logoImage}
            layout="fill"
            objectFit="contain"
            sizes="(max-width: 767px) 100vw, 33vw"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export { PortfolioItem };
