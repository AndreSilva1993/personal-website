import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Modal } from '@src/components/Modal/Modal';
import { PortfolioCarousel } from '@src/components/Portfolio/PortfolioCarousel';

import type { FC } from 'react';
import type { PortfolioModalProps } from './Portfolio.types';

const ModalWrapperDiv = styled.div`
  height: 100%;
  display: flex;
  overflow: auto;
  align-items: center;
  flex-direction: column;
`;

const StyledPortfolioCarousel = styled(PortfolioCarousel)`
  width: 100%;
  position: relative;
  padding-bottom: calc(100% * 10 / 16);
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

const PortfolioModal: FC<PortfolioModalProps> = ({ item, open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <ModalWrapperDiv>
      <StyledPortfolioCarousel>
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
      </StyledPortfolioCarousel>
      <H1>{item?.name}</H1>
      <DescriptionP>{item?.description}</DescriptionP>
    </ModalWrapperDiv>
  </Modal>
);

export { PortfolioModal };
