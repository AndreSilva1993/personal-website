import type { ReactNode } from 'react';

interface CarouselProps {
  children?: ReactNode;
  className?: string;
  onCarouselTouchEnd?: () => void;
  onCarouselTouchStart?: () => void;
  onCarouselIndexChange?: (index: number) => void;
}

export type { CarouselProps };
