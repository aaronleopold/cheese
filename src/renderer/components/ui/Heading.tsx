import { PropsOf } from '@headlessui/react/dist/types';
import React from 'react';

export interface HeadingProps extends PropsOf<'h3'> {}

export default function Heading({ ...props }: HeadingProps) {
  return (
    <h3
      className="text-theme-orange-600 dark:text-theme-orange-500 text-center text-xl font-bold flex-1 truncate tracking-wide text-shadow dark:text-shadow-none"
      {...props}
    />
  );
}
