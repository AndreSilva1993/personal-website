import styles from './Masonry.module.css';

import { Children } from 'react';

import type { ReactElement } from 'react';

interface MasonryProps {
  children: ReactElement[];
}

interface MasonryItemProps {
  children: ReactElement;
  landscape: boolean;
}

export function Masonry({ children }: MasonryProps) {
  // The default number of columns is three.
  const columns = Array.from({ length: 3 }, () => ({ columnCount: 0, items: [] }));

  Children.forEach(children, (child) => {
    const smallerIndex = columns.reduce((lowest, next, index) => {
      if (next.columnCount < columns[lowest].columnCount) return index;

      return lowest;
    }, 0);

    columns[smallerIndex].columnCount += child.props.landscape ? 1 : 2;
    columns[smallerIndex].items = [...columns[smallerIndex].items, child];
  });

  return (
    <div className={styles.masonry}>
      {columns.map(({ items }, columnIndex) => (
        <div key={columnIndex} className={styles.masonryColumn}>
          {items}
        </div>
      ))}
    </div>
  );
}

export function MasonryItem({ children }: MasonryItemProps) {
  return children;
}
