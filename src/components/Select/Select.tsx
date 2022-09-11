import styles from './Select.module.css';

import classNames from 'classnames';

import type { ChangeEventHandler, ReactNode } from 'react';

interface SelectProps {
  value: string;
  className: string;
  children: ReactNode;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export function Select({ children, value, className, onChange }: SelectProps) {
  return (
    <select value={value} onChange={onChange} className={classNames(styles.select, className)}>
      {children}
    </select>
  );
}
