import React from 'react';

interface SelectProps {
  value?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export type { SelectProps };
