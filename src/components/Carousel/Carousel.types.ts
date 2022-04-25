import type { ReactNode } from 'react';

interface CarouselProps {
  children?: ReactNode;
  onCarouselTouchEnd?: () => void;
  onCarouselTouchStart?: () => void;
  onCarouselIndexChange?: (index: number) => void;
}

export type { CarouselProps };
