import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useAnimation, motion } from 'framer-motion';
import { useEffect, useState, Children } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import type { FC } from 'react';

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
  justify-content: center;
`;

const PaginationItemLi = styled.li<{ active: boolean }>(
  ({ active, theme }) => css`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    border-radius: 50%;
    background-color: ${active ? theme.colors.darkBlue : theme.colors.white};
    transition: background-color 250ms ease-out;

    &:hover {
      background-color: ${theme.colors.darkBlue};
    }

    &:not(:last-of-type) {
      margin-right: 1.5rem;
    }
  `
);

const ChevronWrapperDiv = styled.div<{ disabled: boolean }>(
  ({ theme, disabled }) => css`
    position: absolute;
    border-radius: 50%;
    top: calc(50% - 2.5rem);
    width: 4rem;
    height: 4rem;
    padding: 1rem;
    color: ${disabled ? theme.colors.white : theme.colors.black};
    background-color: ${disabled ? theme.colors.lightGrey : theme.colors.white};
    cursor: pointer;

    transition: color 250ms ease-out, background-color 250ms ease-out;

    pointer-events: ${disabled ? 'none' : 'all'};

    &:hover {
      color: ${theme.colors.white};
      background-color: ${theme.colors.darkBlue};
    }
  `
);

const StyledMdChevronLeft = styled(MdChevronLeft)`
  width: 100%;
  height: 100%;
`;

const StyledMdChevronRight = styled(MdChevronRight)`
  width: 100%;
  height: 100%;
`;

const PortfolioCarousel: FC = ({ children, ...remainingProps }) => {
  const controls = useAnimation();
  const [autoplay, setAutoplay] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  useEffect(() => {
    if (!autoplay) return undefined;

    const autoplayInterval = window.setInterval(() => {
      setCarouselIndex((previousIndex) =>
        previousIndex === Children.count(children) - 1 ? 0 : previousIndex + 1
      );
    }, 3000);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [autoplay]);

  useEffect(() => {
    controls.start({
      x: `-${carouselIndex * 100}%`,
      transition: { ease: 'easeOut', duration: 0.5 },
    });
  }, [carouselIndex]);

  function handleWrapperMouseEnter() {
    setAutoplay(false);
  }

  function handleWrapperMouseLeave() {
    setAutoplay(true);
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
      onMouseEnter={handleWrapperMouseEnter}
      onMouseLeave={handleWrapperMouseLeave}
      {...remainingProps}
    >
      <CarouselItemsWrapperDiv animate={controls} initial={{ x: 0 }}>
        {Children.map(children, (item, index) => (
          <CarouselItemDiv key={index}>{item}</CarouselItemDiv>
        ))}
      </CarouselItemsWrapperDiv>

      <PaginationWrapperUl>
        {Array.from({ length: Children.count(children) }).map(
          (_item, index) => (
            <PaginationItemLi
              key={index}
              active={carouselIndex === index}
              onClick={() => handlePaginationItemClick(index)}
            />
          )
        )}
      </PaginationWrapperUl>

      <ChevronWrapperDiv
        onClick={handleChevronLeftClick}
        disabled={carouselIndex === 0}
        css={{ left: '2rem' }}
      >
        <StyledMdChevronLeft />
      </ChevronWrapperDiv>
      <ChevronWrapperDiv
        onClick={handleChevronRightClick}
        disabled={carouselIndex === Children.count(children) - 1}
        css={{ right: '2rem' }}
      >
        <StyledMdChevronRight />
      </ChevronWrapperDiv>
    </CarouselWrapperDiv>
  );
};

export { PortfolioCarousel };
