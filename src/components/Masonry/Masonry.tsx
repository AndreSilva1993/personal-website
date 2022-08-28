import { Children, FC } from 'react';

export const Masonry: FC<any> = ({ children }) => {
  const columns = [
    { columnCount: 0, items: [] },
    { columnCount: 0, items: [] },
    { columnCount: 0, items: [] },
  ];

  Children.forEach(children, (child) => {
    const smallerIndex = columns.reduce((lowest, next, index) => {
      console.log(next);
      if (next.columnCount < columns[lowest].columnCount) return index;

      return lowest;
    }, 0);

    columns[smallerIndex].columnCount += child.props.landscape ? 1 : 2;
    columns[smallerIndex].items = [...columns[smallerIndex].items, child];
  });

  return (
    <div
      style={{
        display: 'grid',
        gridGap: '20px',
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
      }}
    >
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {column.items}
        </div>
      ))}
    </div>
  );
};
