type NavigationLink = {
  href: string;
  title: string;
  icon: JSX.Element;
};

interface DesktopNavigationMenuProps {
  navigationLinks: NavigationLink[];
}

interface MobileNavigationMenuProps {
  navigationLinks: NavigationLink[];
}

export type { MobileNavigationMenuProps, DesktopNavigationMenuProps };
