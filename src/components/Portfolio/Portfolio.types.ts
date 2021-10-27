interface IPortfolioItem {
  name: string;
  images: string[];
  logoImage: string;
  description: string;
  logoBackgroundColor?: string;
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

export type { IPortfolioItem, PortfolioItemProps, PortfolioModalProps };
