import styles from './MainContainer.module.css';

import { PropsWithChildren } from 'react';

import { NavigationMenu } from '@src/components/NavigationMenu/NavigationMenu';

export function MainContainer({ children }: PropsWithChildren) {
  return (
    <div className={styles.pageWrapper}>
      {/* @ts-expect-error Server Component */}
      <NavigationMenu />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
