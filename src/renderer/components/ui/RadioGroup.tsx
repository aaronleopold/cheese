import React from 'react';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';

export interface RadioGroupItem {
  label: string;
  sublabel?: string;
  value: any;
}

export interface RadioGroupProps {
  srLabel?: string;
  items: RadioGroupItem[];
  selected: any;
  setSelected(newValue: any): void;
}

export default function ({
  items,
  selected,
  setSelected,
  srLabel,
}: RadioGroupProps) {
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      {srLabel && (
        <RadioGroup.Label className="sr-only">{srLabel}</RadioGroup.Label>
      )}
      <div className="bg-white dark:bg-dark-500 dark:text-dark-200 rounded-md -space-y-px">
        {items.map(({ label, sublabel, value }, idx) => (
          <RadioGroup.Option
            key={String(label + '-' + idx)}
            value={value}
            className={({ checked }) =>
              clsx(
                idx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                idx === items.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
                checked
                  ? 'bg-indigo-50 border-indigo-200 z-10'
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
                      ? 'bg-indigo-600 border-transparent'
                      : 'bg-white border-gray-300',
                    active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                    'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <div className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={clsx(
                      checked ? 'text-indigo-900' : 'text-gray-900',
                      'block text-sm font-medium'
                    )}
                  >
                    {label}
                  </RadioGroup.Label>

                  {sublabel && (
                    <RadioGroup.Description
                      as="span"
                      className={clsx(
                        checked ? 'text-indigo-700' : 'text-gray-500',
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
