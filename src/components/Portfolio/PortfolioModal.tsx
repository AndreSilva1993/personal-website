import Image from 'next/image';
import styled from '@emotion/styled';

import { Modal } from '@src/components/Modal/Modal';
import { PortfolioCarousel } from '@src/components/Portfolio/PortfolioCarousel';

import type { FC } from 'react';
import type { PortfolioModalProps } from './Portfolio.types';

const ModalWrapperDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledPortfolioCarousel = styled(PortfolioCarousel)`
  width: 100%;
  position: relative;
  padding-bottom: calc(100% * 10 / 16);
`;

const LogoWrapperDiv = styled.div`
  width: 100%;
  height: 4rem;
  margin: 3rem 0;
  position: relative;
  flex-shrink: 0;
`;

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
          <Image key={index} layout="fill" objectFit="cover" alt={item?.name} src={image} />
        ))}
      </StyledPortfolioCarousel>
      <LogoWrapperDiv>
        <Image layout="fill" objectFit="contain" alt={item?.name} src={item?.logoImage} />
      </LogoWrapperDiv>
      <DescriptionP>{item?.description}</DescriptionP>
    </ModalWrapperDiv>
  </Modal>
);

export { PortfolioModal };
