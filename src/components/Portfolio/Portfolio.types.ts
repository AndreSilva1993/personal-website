interface IPortfolioItem {
  name: string;
  image: string;
  logoImage: string;
  description: string;
}

interface PortfolioItemProps {
  name: string;
  image: string;
  index: number;
  onClick: (index: number) => void;
}

interface PortfolioModalProps {
  open: boolean;
  item?: IPortfolioItem;
  onClose: VoidFunction;
}

interface PortfolioCarouselProps {
  items: string[];
}

export type { IPortfolioItem, PortfolioItemProps, PortfolioModalProps, PortfolioCarouselProps };
