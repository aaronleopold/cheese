import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import React, { Fragment } from 'react';

interface VideoDevicesProps {
  label: string;
  devices?: MediaDeviceInfo[];
  selected?: MediaDeviceInfo;
  onSelect(device: MediaDeviceInfo): void;

  disabled?: boolean;
}

export default function DeviceSelect({
  label,
  devices = [],
  selected,
  onSelect,
  disabled,
}: VideoDevicesProps) {
  return (
    <div className="flex-1">
      <Listbox value={selected} onChange={onSelect} disabled={disabled}>
        <Listbox.Label className="block text-sm font-medium text-gray-700">
          {label}
        </Listbox.Label>
        <div className="mt-1 relative">
          <Listbox.Button
            className={clsx(
              disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
              'relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            )}
          >
            <span className="block truncate">{selected?.label}</span>
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
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-32 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {devices.map((device) => (
                <Listbox.Option
                  key={device.deviceId}
                  className={({ active }) =>
                    clsx(
                      active ? 'text-white bg-indigo-600' : 'text-gray-900',
                      'cursor-default select-none relative py-2 pl-3 pr-9'
                    )
                  }
                  value={device}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={clsx(
                          selected ? 'font-semibold' : 'font-normal',
                          'block truncate'
                        )}
                      >
                        {device.label}
                      </span>

                      {selected ? (
                        <span
                          className={clsx(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
