import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useAnimation, motion } from 'framer-motion';
import { useEffect, useState, Children, useRef } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import type { FC } from 'react';
import type { CarouselProps } from './Carousel.types';

const CarouselWrapperDiv = styled.div`
  overflow: hidden;
  position: relative;
`;

const CarouselItemsWrapperDiv = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const CarouselItemDiv = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
`;

const PaginationWrapperUl = styled.ul`
  display: flex;
  width: 100%;
  position: absolute;
  bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const PaginationItemLi = styled.li<{ active: boolean }>(
  ({ active, theme: { colors } }) => css`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    border-radius: 50%;
    background-color: ${active ? colors.pink : colors.white};
    transition: background-color 250ms ease-out;
    margin: 0 1rem 1rem 1rem;

    &:hover {
      background-color: ${colors.pink};
    }
  `
);

const ChevronWrapperDiv = styled.div<{ disabled: boolean }>(
  ({ theme: { colors }, disabled }) => css`
    position: absolute;
    border-radius: 50%;
    top: calc(50% - 2.5rem);
    width: 4rem;
    height: 4rem;
    padding: 1rem;
    color: ${disabled ? colors.white : colors.black};
    background-color: ${disabled ? colors.lightGrey : colors.white};
    cursor: pointer;

    transition: color 250ms ease-out, background-color 250ms ease-out;

    pointer-events: ${disabled ? 'none' : 'all'};

    &:hover {
      color: ${colors.white};
      background-color: ${colors.pink};
    }
  `
);

const StyledChevronLeft = styled(ChevronLeft)`
  width: 100%;
  height: 100%;
`;

const StyledChevronRight = styled(ChevronRight)`
  width: 100%;
  height: 100%;
`;

const Carousel: FC<CarouselProps> = ({
  children,
  onCarouselTouchEnd,
  onCarouselTouchStart,
  onCarouselIndexChange,
  ...remainingProps
}) => {
  const wrapperRef = useRef<HTMLDivElement>();
  const swipeRef = useRef<{
    startX: number;
    shouldGoToNextSlide?: boolean;
    shouldGoToPreviousSlide?: boolean;
  }>();

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
      ((swipeRef.current.startX - event.touches[0].clientX) / wrapperRef.current.offsetWidth) * 100;

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
    <CarouselWrapperDiv
      ref={wrapperRef}
      onTouchEnd={handleWrapperTouchEnd}
      onTouchMove={handleWrapperTouchMove}
      onTouchStart={handleWrapperTouchStart}
      {...remainingProps}
    >
      <CarouselItemsWrapperDiv animate={controls} initial={{ x: 0 }}>
        {Children.map(children, (item, index) => (
          <CarouselItemDiv key={index}>{item}</CarouselItemDiv>
        ))}
      </CarouselItemsWrapperDiv>

      <PaginationWrapperUl>
        {Array.from({ length: Children.count(children) }).map((_item, index) => (
          <PaginationItemLi
            key={index}
            active={carouselIndex === index}
            onClick={() => handlePaginationItemClick(index)}
          />
        ))}
      </PaginationWrapperUl>

      <ChevronWrapperDiv
        onClick={handleChevronLeftClick}
        disabled={carouselIndex === 0}
        css={{ left: '2rem' }}
      >
        <StyledChevronLeft />
      </ChevronWrapperDiv>
      <ChevronWrapperDiv
        onClick={handleChevronRightClick}
        disabled={carouselIndex === Children.count(children) - 1}
        css={{ right: '2rem' }}
      >
        <StyledChevronRight />
      </ChevronWrapperDiv>
    </CarouselWrapperDiv>
  );
};

export { Carousel };
