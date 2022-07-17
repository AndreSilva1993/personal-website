import styles from './MainContainer.module.css';

import { useRouter } from 'next/router';

import { NavigationMenu } from '@src/components/NavigationMenu/NavigationMenu';

import type { ReactElement } from 'react';

interface MainContainerProps {
  children?: ReactElement;
}

const MainContainer = ({ children }: MainContainerProps) => {
  const { pathname } = useRouter();

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
