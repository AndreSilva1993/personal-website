'use client';

import styles from './MainContainer.module.css';

import { usePathname } from 'next/navigation';

import { NavigationMenu } from '@src/components/NavigationMenu/NavigationMenu';

interface MainContainerProps {
  children?: any;
}

const MainContainer = ({ children }: MainContainerProps) => {
  const pathname = usePathname();

  if (pathname === '/404') {
    return children;
  }

  return (
    <div className={styles.pageWrapper}>
      <NavigationMenu />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export { MainContainer };
