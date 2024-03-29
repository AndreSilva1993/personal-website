import styles from './PortfolioItem.module.css';

import Image from 'next/image';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useAnimation, motion } from 'framer-motion';

import type { FC } from 'react';
import type { PortfolioItemProps } from '@src/components/Portfolio/Portfolio.types';

type AnimationDirection = 'left' | 'right' | 'top' | 'bottom';

const PortfolioItem: FC<PortfolioItemProps> = ({ name, image, index, logoImage, onClick }) => {
  const controls = useAnimation();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  function getAnimationDirection({ clientX, clientY }: React.MouseEvent) {
    if (!wrapperRef.current) return {};

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
        fill
        priority
        alt={name}
        src={image}
        placeholder="blur"
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 767px) 100vw, 33vw"
        className={classNames(styles.itemImage, { [styles.itemImageHovering]: isHovering })}
      />

      <motion.div
        className={styles.itemWrapper}
        animate={controls}
        initial={{ x: '-100%', y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className={styles.itemCompanyImage}>
          <Image
            fill
            priority
            alt={name}
            src={logoImage}
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 767px) 100vw, 33vw"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export { PortfolioItem };
