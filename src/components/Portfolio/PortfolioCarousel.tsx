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
    background-color: ${active ? theme.colors.black : theme.colors.lightGrey};
    transition: background-color 250ms ease-out;

    &:not(:last-of-type) {
      margin-right: 1.5rem;
    }
  `
);

const StyledMdChevronLeft = styled(MdChevronLeft)<{ disabled: boolean }>(
  ({ theme, disabled }) => css`
    position: absolute;
    top: calc(50% - 2.5rem);
    left: 0;
    width: 5rem;
    height: 5rem;
    cursor: pointer;
    transition: color 250ms ease-out;
    color: ${disabled ? theme.colors.lightGrey : theme.colors.black};

    ${disabled &&
    css`
      pointer-events: none;
    `}
  `
);

const StyledMdChevronRight = styled(MdChevronRight)<{ disabled: boolean }>(
  ({ theme, disabled }) => css`
    position: absolute;
    top: calc(50% - 2.5rem);
    right: 0;
    width: 5rem;
    height: 5rem;
    cursor: pointer;
    transition: color 250ms ease-out;
    color: ${disabled ? theme.colors.lightGrey : theme.colors.black};

    ${disabled &&
    css`
      pointer-events: none;
    `}
  `
);

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
        {Array.from({ length: Children.count(children) }).map((_item, index) => (
          <PaginationItemLi
            key={index}
            active={carouselIndex === index}
            onClick={() => handlePaginationItemClick(index)}
          />
        ))}
      </PaginationWrapperUl>

      <StyledMdChevronLeft onClick={handleChevronLeftClick} disabled={carouselIndex === 0} />
      <StyledMdChevronRight
        onClick={handleChevronRightClick}
        disabled={carouselIndex === Children.count(children) - 1}
      />
    </CarouselWrapperDiv>
  );
};

export { PortfolioCarousel };
