import styles from './Carousel.module.css';

import classNames from 'classnames';
import { useAnimation, motion } from 'framer-motion';
import { useEffect, useState, Children, useRef } from 'react';

import type { FC } from 'react';
import type { CarouselProps } from './Carousel.types';

import { ChevronLeftIcon } from '@src/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '@src/icons/ChevronRightIcon';

const Carousel: FC<CarouselProps> = ({
  children,
  className,
  onCarouselTouchEnd,
  onCarouselTouchStart,
  onCarouselIndexChange,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const swipeRef = useRef<{
    startX: number;
    shouldGoToNextSlide?: boolean;
    shouldGoToPreviousSlide?: boolean;
  }>({ startX: 0 });

  const controls = useAnimation();
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  // React when the carousel index changes.
  useEffect(() => {
    onCarouselIndexChange?.(carouselIndex);

    controls.start({
      x: `-${100 * carouselIndex}%`,
      transition: { ease: 'easeOut', duration: 0.5 },
    });
  }, [carouselIndex]);

  function handleWrapperTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    onCarouselTouchStart?.();
    swipeRef.current = { startX: event.touches[0].clientX };
  }

  function handleWrapperTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    const swipePercentage =
      ((swipeRef.current.startX - event.touches[0].clientX) / wrapperRef.current!.offsetWidth) *
      100;

    swipeRef.current = {
      ...swipeRef.current,
      shouldGoToNextSlide: swipePercentage > 0,
      shouldGoToPreviousSlide: swipePercentage < 0,
    };

    const clampedValue = Math.max(
      Math.min(100 * carouselIndex + swipePercentage, 100 * (Children.count(children) - 1)),
      0
    );

    controls.set({ x: `-${clampedValue}%` });
  }

  function handleWrapperTouchEnd() {
    onCarouselTouchEnd?.();

    if (swipeRef.current.shouldGoToNextSlide) {
      setCarouselIndex((previousIndex) =>
        previousIndex === Children.count(children) - 1 ? previousIndex : previousIndex + 1
      );
    } else if (swipeRef.current.shouldGoToPreviousSlide) {
      setCarouselIndex((previousIndex) =>
        previousIndex === 0 ? previousIndex : previousIndex - 1
      );
    } else {
      controls.start({
        x: `-${100 * carouselIndex}%`,
        transition: { ease: 'easeOut', duration: 0.5 },
      });
    }
  }

  function handlePaginationItemClick(index: number) {
    setCarouselIndex(index);
  }

  function handleChevronLeftClick() {
    setCarouselIndex((previousIndex) => previousIndex - 1);
  }

  function handleChevronRightClick() {
    setCarouselIndex((previousIndex) => previousIndex + 1);
  }

  return (
    <div
      className={classNames(styles.carouselWrapper, className)}
      ref={wrapperRef}
      onTouchEnd={handleWrapperTouchEnd}
      onTouchMove={handleWrapperTouchMove}
      onTouchStart={handleWrapperTouchStart}
    >
      <motion.div className={styles.carouselItemsWrapper} animate={controls} initial={{ x: 0 }}>
        {Children.map(children, (item, index) => (
          <div className={styles.carouselItem} key={index}>
            {item}
          </div>
        ))}
      </motion.div>

      <ul className={styles.paginationWrapper}>
        {Array.from({ length: Children.count(children) }).map((_item, index) => (
          <li
            key={index}
            onClick={() => handlePaginationItemClick(index)}
            className={classNames(styles.paginationItem, {
              [styles.paginationItemActive]: carouselIndex === index,
            })}
          />
        ))}
      </ul>

      <div
        onClick={handleChevronLeftClick}
        className={classNames(styles.chevronWrapper, styles.chevronWrapperLeft, {
          [styles.chevronWrapperDisabled]: carouselIndex === 0,
        })}
      >
        <ChevronLeftIcon className={styles.chevron} />
      </div>
      <div
        onClick={handleChevronRightClick}
        className={classNames(styles.chevronWrapper, styles.chevronWrapperRight, {
          [styles.chevronWrapperDisabled]: carouselIndex === Children.count(children) - 1,
        })}
      >
        <ChevronRightIcon className={styles.chevron} />
      </div>
    </div>
  );
};

export { Carousel };
