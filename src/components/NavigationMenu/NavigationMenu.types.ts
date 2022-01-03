import type { SvgIconComponent } from '@mui/icons-material';

type NavigationLink = {
  href: string;
  title: string;
  Icon: SvgIconComponent;
};

interface DesktopNavigationMenuProps {
  navigationLinks: NavigationLink[];
}

interface MobileNavigationMenuProps {
  navigationLinks: NavigationLink[];
}

export type { MobileNavigationMenuProps, DesktopNavigationMenuProps };
