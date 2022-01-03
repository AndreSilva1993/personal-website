import type { ReactElement, RefCallback } from 'react';

interface ImageGridProps {
  items: any[];
  aspectRatio?: string;
  render: (
    item: any,
    itemProps: { onMouseEnter: () => void; ref: RefCallback<HTMLDivElement> }
  ) => ReactElement;
  renderHoveringItem: (hoveringItem: any) => ReactElement;
}

export type { ImageGridProps };
