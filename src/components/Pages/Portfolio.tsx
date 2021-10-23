import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

import type { FC } from 'react';

type AnimationDirection = 'left' | 'right' | 'top' | 'bottom';

const PortfolioHeading = styled.h1(
  ({ theme }) => css`
    color: ${theme.colors.white};
    font-size: 3rem;
    font-weight: ${theme.fontWeights.boldest};
    margin-bottom: 5rem;
  `
);

const PortfolioGridDiv = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-gap: 5rem;
    grid-template-columns: repeat(2, 1fr);

    ${theme.breakpoints.extraSmall} {
      grid-template-columns: 1fr;
    }
  `
);

const PortfolioItemWrapperDiv = styled(motion.div)(
  () => css`
    cursor: pointer;
    overflow: hidden;
    position: relative;
  `
);

const PortfolioItemDiv = styled.div<{ backgroundImage: string; active: boolean }>(
  ({ backgroundImage, active }) => css`
    padding-bottom: 100%;
    background-size: cover;
    background-position: center;
    background-image: url(${backgroundImage});

    transform: scale(1);
    transition: transform 300ms ease-out;

    ${active &&
    css`
      transform: scale(1.1);
    `}
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

const Portfolio: FC = () => {
  const { t } = useTranslation();

  const [activeItem, setActiveItem] = useState<number>();
  const [exitAnimationDirection, setExitAnimationDirection] = useState<AnimationDirection>();
  const [enterAnimationDirection, setEnterAnimationDirection] = useState<AnimationDirection>();

  const portfolioItems = useMemo(
    () => [
      { name: 'Burberry', image: 'burberry.png' },
      { name: 'Carmo', image: 'carmo.png' },
      { name: 'Tankey', image: 'tankey.png' },
      { name: 'TOConline', image: 'toconline.png' },
    ],
    []
  );

  function getAnimationDirection({
    target,
    clientX,
    clientY,
  }: React.MouseEvent): AnimationDirection {
    const { x, y, height, width } = (target as HTMLElement).getBoundingClientRect();

    const elementBounds = [
      { direction: 'top', value: y - clientY },
      { direction: 'right', value: x + width - clientX },
      { direction: 'bottom', value: y + height - clientY },
      { direction: 'left', value: x - clientX },
    ] as Array<{ direction: AnimationDirection; value: number }>;

    const { direction } = elementBounds.reduce(
      (closestElementBound, elementBound) =>
        Math.abs(elementBound.value) < Math.abs(closestElementBound.value)
          ? elementBound
          : closestElementBound,
      elementBounds[0]
    );

    return direction;
  }

  function getAnimationProps(direction: AnimationDirection) {
    switch (direction) {
      case 'left':
      default:
        return { x: '-100%' };
      case 'right':
        return { x: '100%' };
      case 'top':
        return { y: '-100%' };
      case 'bottom':
        return { y: '100%' };
    }
  }

  function handleItemMouseEnter(event: React.MouseEvent<HTMLElement>, index: number) {
    setEnterAnimationDirection(getAnimationDirection(event));
    setActiveItem(index);
  }

  function handleItemMouseLeave(event: React.MouseEvent<HTMLElement>) {
    setExitAnimationDirection(getAnimationDirection(event));
    setTimeout(() => {
      setActiveItem(undefined);
    }, 0);
  }

  const exitAnimationProps = getAnimationProps(exitAnimationDirection);
  const enterAnimationProps = getAnimationProps(enterAnimationDirection);

  return (
    <>
      <PortfolioHeading>{t('portfolio.title')}</PortfolioHeading>
      <PortfolioGridDiv>
        {portfolioItems.map(({ name, image }, index) => (
          <PortfolioItemWrapperDiv
            key={name}
            onMouseLeave={handleItemMouseLeave}
            onMouseEnter={(event) => handleItemMouseEnter(event, index)}
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: '-10rem', opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.25 * index }}
          >
            <PortfolioItemDiv
              active={activeItem === index}
              backgroundImage={`/images/portfolio/${image}`}
            />

            <AnimatePresence>
              {activeItem === index ? (
                <PortfolioItemNameDiv
                  animate={{ x: 0, y: 0 }}
                  exit={exitAnimationProps}
                  initial={enterAnimationProps}
                  transition={{ ease: 'easeOut', duration: 0.3 }}
                >
                  {name}
                </PortfolioItemNameDiv>
              ) : null}
            </AnimatePresence>
          </PortfolioItemWrapperDiv>
        ))}
      </PortfolioGridDiv>
    </>
  );
};

export { Portfolio };
