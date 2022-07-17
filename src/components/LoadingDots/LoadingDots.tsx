import styles from './LoadingDots.module.css';

const LoadingDots = () => (
  <div className={styles.dotsWrapper}>
    <div className={styles.dot} />
    <div className={styles.dot} />
    <div className={styles.dot} />
  </div>
);

export { LoadingDots };
