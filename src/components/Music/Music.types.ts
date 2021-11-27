import type { ReactElement, RefCallback } from 'react';

interface MusicStatisticsCounterProps {
  value: number;
  duration?: number;
  iterations?: number;
}

interface MusicGridProps {
  items: any[];
  render: (
    item: any,
    itemProps: { onMouseEnter: () => void; ref: RefCallback<HTMLDivElement> }
  ) => ReactElement;
  renderHoveringItem: (hoveringItem: any) => ReactElement;
}

export type { MusicGridProps, MusicStatisticsCounterProps };
