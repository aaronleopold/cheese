import React from 'react';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import Label from './Label';

export interface RadioGroupItem {
  label: string;
  sublabel?: string;
  value: any;
}

export interface RadioGroupProps {
  groupLabel?: string;
  items: RadioGroupItem[];
  selected: any;
  setSelected(newValue: any): void;
}

export default function ({
  items,
  selected,
  setSelected,
  groupLabel,
}: RadioGroupProps) {
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      {groupLabel && <Label>{groupLabel}</Label>}
      <div
        className={clsx(
          groupLabel && 'mt-1',
          'bg-white dark:bg-dark-500 dark:text-dark-200 rounded-md -space-y-px'
        )}
      >
        {items.map(({ label, sublabel, value }, idx) => (
          <RadioGroup.Option
            key={String(label + '-' + idx)}
            value={value}
            className={({ checked }) =>
              clsx(
                idx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                idx === items.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                checked
                  ? 'bg-theme-orange-50 border-theme-orange-100 z-10'
                  : 'border-gray-200 dark:border-dark-400',
                'relative border p-4 flex cursor-pointer focus:outline-none'
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={clsx(
                    checked
                      ? 'bg-theme-orange-500 border-transparent'
                      : 'bg-white border-gray-300 dark:bg-dark-300 dark:border-dark-400',
                    active ? 'ring-2 ring-offset-2 ring-theme-orange-400' : '',
                    'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                  )}
                  aria-hidden="true"
                >
                  <span
                    className={clsx(
                      checked
                        ? 'bg-theme-orange-100'
                        : 'bg-white dark:bg-dark-300',
                      'rounded-full w-1.5 h-1.5'
                    )}
                  />
                </span>
                <div className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={clsx(
                      checked
                        ? 'text-theme-orange-800'
                        : 'text-gray-900 dark:text-dark-200',
                      'block text-sm font-medium'
                    )}
                  >
                    {label}
                  </RadioGroup.Label>

                  {sublabel && (
                    <RadioGroup.Description
                      as="span"
                      className={clsx(
                        checked
                          ? 'text-theme-orange-600'
                          : 'text-gray-500 dark:text-dark-300',
                        'block text-sm'
                      )}
                    >
                      {sublabel}
                    </RadioGroup.Description>
                  )}
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
