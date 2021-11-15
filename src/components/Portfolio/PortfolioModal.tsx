import Image from 'next/image';
import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Modal } from '@src/components/Modal/Modal';
import { Carousel } from '@src/components/Carousel/Carousel';

import type { FC } from 'react';
import type { PortfolioModalProps } from './Portfolio.types';

const StyledModal = styled(Modal)(
  ({ theme }) => css`
    top: 5%;
    left: 25%;
    width: calc(100vw - 50%);
    height: calc(100% - 10%);
    margin: auto;
    background-color: ${theme.colors.white};

    ${theme.breakpoints.extraSmall} {
      top: 0;
      left: 0;
      width: 100vw;
      height: 100%;
    }
  `
);

const ModalWrapperDiv = styled.div<{ disableScroll: boolean }>(
  ({ disableScroll }) => css`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: ${disableScroll ? 'hidden' : 'auto'};
  `
);

const StyledCarousel = styled(Carousel)`
  width: 100%;
  flex-shrink: 0;
  position: relative;
  aspect-ratio: 16 / 10;
`;

const H1 = styled.h1(
  ({ theme }) => css`
    color: ${theme.colors.black};
    font-size: 3rem;
    font-weight: ${theme.fontWeights.boldest};
    margin: 2.5rem 0;
  `
);

const DescriptionP = styled.p`
  font-size: 1.5rem;
  line-height: 2.5rem;
  padding: 0 15% 2.5rem;
  text-align: center;
`;

const PortfolioModal: FC<PortfolioModalProps> = ({ item, open, onClose }) => {
  const [disableModalScroll, setDisableModalScroll] = useState<boolean>();

  function handleCarouselTouchStart() {
    setDisableModalScroll(true);
  }

  function handleCarouselTouchEnd() {
    setDisableModalScroll(false);
  }

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      motionProps={{
        exit: { opacity: 0, x: 0 },
        initial: { opacity: 0, x: '-3rem' },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5 },
      }}
    >
      <ModalWrapperDiv disableScroll={disableModalScroll}>
        <StyledCarousel
          onCarouselTouchEnd={handleCarouselTouchEnd}
          onCarouselTouchStart={handleCarouselTouchStart}
        >
          {item?.images.map((image, index) => (
            <Image
              priority
              src={image}
              key={index}
              alt={item?.name}
              sizes="50vw"
              layout="fill"
              objectFit="cover"
            />
          ))}
        </StyledCarousel>
        <H1>{item?.name}</H1>
        <DescriptionP>{item?.description}</DescriptionP>
      </ModalWrapperDiv>
    </StyledModal>
  );
};

export { PortfolioModal };
