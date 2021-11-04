import Image from 'next/image';
import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Modal } from '@src/components/Modal/Modal';
import { Carousel } from '@src/components/Carousel/Carousel';

import type { FC } from 'react';
import type { PortfolioModalProps } from './Portfolio.types';

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
    <Modal open={open} onClose={onClose}>
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
    </Modal>
  );
};

export { PortfolioModal };
