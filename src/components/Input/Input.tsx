import styles from './Input.module.css';

import classNames from 'classnames';

import type { InputHTMLAttributes } from 'react';

export function Input({
  icon,
  className,
  ...remainingProps
}: InputHTMLAttributes<HTMLInputElement> & { icon: JSX.Element }) {
  return (
    <div className={styles.inputWrapper}>
      <input className={classNames(styles.input, className)} {...remainingProps} />
      <div className={styles.icon}>{icon}</div>
    </div>
  );
}
