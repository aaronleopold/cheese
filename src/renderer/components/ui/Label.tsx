import React, { forwardRef } from 'react';

export interface LabelProps {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode | React.ReactText;
}

export default forwardRef<HTMLSpanElement, LabelProps>(
  ({ size = 'sm', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`block text-${size} font-medium text-gray-700 dark:text-dark-200`}
        {...props}
      />
    );
  }
);
