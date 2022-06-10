import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';

import type { FC } from 'react';
import type { ImageGridProps } from './ImageGrid.types';

const GridWrapperDiv = styled.div(
  ({ theme }) => css`
    display: grid;
    width: 100%;
    position: relative;
    grid-template-columns: repeat(5, 1fr);

    ${theme.media.extraSmall} {
      grid-template-columns: repeat(2, 1fr);
    }
  `
);

const ImageDetailsOverlayDiv = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'aspectRatio',
})<{ aspectRatio: string }>(
  ({ theme, aspectRatio }) => css`
    top: 0;
    left: 0;
    width: 20%;
    aspect-ratio: ${aspectRatio};
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.white};
    text-align: center;
    text-transform: uppercase;
    padding: 2rem;
    background-color: rgba(0, 0, 0, 0.75);

    ${theme.media.extraSmall} {
      width: 50%;
    }
  `
);

const ImageGrid: FC<ImageGridProps> = ({
  items,
  aspectRatio = '1',
  render,
  renderHoveringItem,
}) => {
  const itemsWrappersRef = useRef<HTMLElement[]>([]);

  const [hoveringItem, setHoveringItem] = useState();
  const [{ x, y }, setOverlayPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  function handleGridMouseLeave() {
    setHoveringItem(undefined);
  }

  function handleItemMouseEnter(index: number) {
    const { offsetLeft, offsetTop } = itemsWrappersRef.current[index];

    setHoveringItem(items[index]);
    setOverlayPosition({ x: offsetLeft, y: offsetTop });
  }

  return (
    <>
      <GridWrapperDiv onMouseLeave={handleGridMouseLeave}>
        {items.map((item: any, index: number) =>
          render(item, {
            onMouseEnter: () => handleItemMouseEnter(index),
            ref: (ref: HTMLElement) => {
              itemsWrappersRef.current[index] = ref;
            },
          })
        )}

        <AnimatePresence>
          {hoveringItem && (
            <ImageDetailsOverlayDiv
              aspectRatio={aspectRatio}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, x, y }}
              animate={{ opacity: 1, x, y }}
              transition={{ ease: 'easeOut', duration: 0.25 }}
            >
              {renderHoveringItem(hoveringItem)}
            </ImageDetailsOverlayDiv>
          )}
        </AnimatePresence>
      </GridWrapperDiv>
    </>
  );
};

export { ImageGrid };
