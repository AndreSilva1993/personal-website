import styles from './MainContainer.module.css';

import { NavigationMenu } from '@src/components/NavigationMenu/NavigationMenu';

interface MainContainerProps {
  children?: any;
}

export function MainContainer({ children }: MainContainerProps) {
  return (
    <div className={styles.pageWrapper}>
      <NavigationMenu />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
