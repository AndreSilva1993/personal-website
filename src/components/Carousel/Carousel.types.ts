interface CarouselProps {
  onCarouselTouchEnd?: () => void;
  onCarouselTouchStart?: () => void;
  onCarouselIndexChange?: (index: number) => void;
}

export type { CarouselProps };
