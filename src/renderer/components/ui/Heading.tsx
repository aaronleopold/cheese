import { PropsOf } from '@headlessui/react/dist/types';
import React from 'react';

export interface HeadingProps extends PropsOf<'h3'> {}

export default function Heading({ ...props }: HeadingProps) {
  return (
    <h3
      className="text-gray-900 dark:text-dark-200 text-center text-xl font-bold flex-1 truncate tracking-wide"
      {...props}
    />
  );
}
