import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import Label from './Label';

export interface SelectOption {
  label: string;
  value: any;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  selected?: SelectOption;
  onSelect(value: any): void;
  disabled?: boolean;
}

// FIXME: not done
export default function Select({
  label,
  options,
  selected,
  onSelect,
  disabled,
}: SelectProps) {
  console.log({ options, selected });

  return (
    <div className="flex-1 min-w-0">
      <Listbox value={selected} onChange={onSelect} disabled={disabled}>
        <Listbox.Label as={Label}>{label}</Listbox.Label>
        <div className="mt-1 relative">
          <Listbox.Button
            className={clsx(
              disabled
                ? 'bg-gray-100 dark:bg-dark-800 cursor-not-allowed'
                : 'bg-white dark:bg-dark-400',
              'relative w-full border border-gray-300 dark:border-dark-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-theme-orange-400 focus:border-theme-orange-400 sm:text-sm'
            )}
          >
            <span className="block truncate dark:text-dark-200">
              {selected?.label}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-dark-400 shadow-lg max-h-32 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {options.map((option) => (
                <Listbox.Option
                  key={option.label}
                  className={({ active }) =>
                    clsx(
                      active
                        ? 'text-white bg-theme-orange-500'
                        : 'text-gray-900 dark:text-dark-200',
                      'cursor-default select-none relative py-2 pl-3 pr-9'
                    )
                  }
                  value={option.value}
                >
                  {({ active }) => (
                    <>
                      <span
                        className={clsx(
                          option.value === selected?.value
                            ? 'font-semibold'
                            : 'font-normal',
                          'block truncate dark:text-dark-200'
                        )}
                      >
                        {option.label}
                      </span>

                      {option.value === selected?.value ? (
                        <span
                          className={clsx(
                            active ? 'text-white' : 'text-theme-orange-500',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <CheckIcon
                            className="h-5 w-5 dark:text-dark-200"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
