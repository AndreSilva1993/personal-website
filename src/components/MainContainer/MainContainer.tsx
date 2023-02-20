'use client';

import styles from './MainContainer.module.css';

import { usePathname } from 'next/navigation';

import { NavigationMenu } from '@src/components/NavigationMenu/NavigationMenu';

import type { ReactElement } from 'react';

interface MainContainerProps {
  children?: ReactElement;
}

const MainContainer = ({ children }: MainContainerProps) => {
  const pathname = usePathname();

  if (pathname === '/404') {
    return children as ReactElement;
  }

  return (
    <div className={styles.pageWrapper}>
      <NavigationMenu />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export { MainContainer };
