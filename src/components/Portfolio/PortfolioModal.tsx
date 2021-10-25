import styled from '@emotion/styled';

import { Image } from '@src/components/Image/Image';
import { Modal } from '@src/components/Modal/Modal';
import { PortfolioCarousel } from '@src/components/Portfolio/PortfolioCarousel';

import type { FC } from 'react';
import type { PortfolioModalProps } from './Portfolio.types';

const WrapperDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledPortfolioCarousel = styled(PortfolioCarousel)`
  width: 100%;
  flex: 0 0 50%;
`;

const LogoImage = styled(Image)`
  width: 30rem;
  margin: 3rem 0;
`;

const DescriptionP = styled.p`
  font-size: 1.5rem;
  line-height: 2.5rem;
  padding: 0 15%;
  text-align: center;
`;

const PortfolioModal: FC<PortfolioModalProps> = ({ item, open, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <WrapperDiv>
      <StyledPortfolioCarousel
        items={[
          `/images/portfolio/${item?.image}`,
          `/images/portfolio/${item?.image}`,
          `/images/portfolio/${item?.image}`,
          `/images/portfolio/${item?.image}`,
        ]}
      />
      <LogoImage alt={item?.name} src={`/images/portfolio/${item?.logoImage}`} />
      <DescriptionP>{item?.description}</DescriptionP>
    </WrapperDiv>
  </Modal>
);

export { PortfolioModal };
