import { Children } from 'react';
import Box from '@mui/material/Box';

import type { ReactElement } from 'react';

interface MasonryProps {
  children: ReactElement[];
  numberOfColumns: number;
}

interface MasonryItemProps {
  children: ReactElement;
  landscape: boolean;
}

export function Masonry({ children, numberOfColumns = 1 }: MasonryProps) {
  const columns = Array.from({ length: numberOfColumns }, () => ({ columnCount: 0, items: [] }));

  Children.forEach(children, (child) => {
    const smallerIndex = columns.reduce((lowest, next, index) => {
      if (next.columnCount < columns[lowest].columnCount) return index;

      return lowest;
    }, 0);

    columns[smallerIndex].columnCount += child.props.landscape ? 1 : 2;
    columns[smallerIndex].items = [...columns[smallerIndex].items, child];
  });

  return (
    <Box
      sx={{
        display: 'grid',
        gridGap: '2rem',
        gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
      }}
    >
      {columns.map(({ items }, columnIndex) => (
        <Box
          key={columnIndex}
          sx={{
            gap: '2rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {items}
        </Box>
      ))}
    </Box>
  );
}

export function MasonryItem({ children }: MasonryItemProps) {
  return children;
}
