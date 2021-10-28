interface IPortfolioItem {
  name: string;
  images: string[];
  logoImage: string;
  description: string;
}

interface PortfolioItemProps {
  index: number;
  name: string;
  image: string;
  logoImage: string;
  onClick: (index: number) => void;
}

interface PortfolioModalProps {
  open: boolean;
  item?: IPortfolioItem;
  onClose: VoidFunction;
}

export type { IPortfolioItem, PortfolioItemProps, PortfolioModalProps };
