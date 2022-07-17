import { useEffect, useRef, useState } from 'react';

import type { FC } from 'react';
import type { MusicStatisticsCounterProps } from './Music.types';

const MusicStatisticsCounter: FC<MusicStatisticsCounterProps> = ({
  value,
  duration = 2500,
  iterations = 100,
  className,
}) => {
  const intervalRef = useRef<number>();
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const step = Math.floor(value / iterations);
    const intervalTimeout = Math.floor(duration / iterations);

    intervalRef.current = window.setInterval(() => {
      setCurrentValue((previousValue) => {
        if (previousValue + step >= value) {
          window.clearInterval(intervalRef.current);
          return value;
        }

        return previousValue + step;
      });
    }, intervalTimeout);

    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [value]);

  return <span className={className}>{currentValue}</span>;
};

export { MusicStatisticsCounter };
