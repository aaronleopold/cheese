import clsx from 'clsx';
import React from 'react';

interface RadioProps {
  label: string;
  value: boolean;
  onClick(): void;
}

export default function Radio({ label, value, onClick }: RadioProps) {
  return (
    <div className="flex space-x-2 items-center">
      <button
        onClick={onClick}
        className={clsx(
          value
            ? 'bg-indigo-600 border-transparent'
            : 'bg-white border-gray-300 dark:bg-dark-500 dark:border-dark-400',
          'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        )}
        aria-hidden="true"
      >
        <span className="rounded-full bg-white dark:bg-dark-300 w-1.5 h-1.5" />
      </button>
      <span className="block text-sm font-medium text-gray-700 dark:text-dark-200">
        {label}
      </span>
    </div>
  );
}
