import {
  DocumentAddIcon,
  DocumentIcon,
  FolderIcon,
  FolderOpenIcon,
} from '@heroicons/react/solid';
import clsx from 'clsx';
import React from 'react';
import pickFile from '../../utils/file';
import Label from './Label';

type FilePickerProps = {
  dir?: boolean;
  label: string;
  placeholder?: string;
  onChange(buffer: any): void;
  value: string;
  fullWidth?: boolean;
};

export default function FilePicker({
  dir,
  label,
  placeholder,
  onChange,
  value,
  fullWidth,
}: FilePickerProps) {
  async function openDialog() {
    const result = await pickFile({ name: '', extensions: [], dir });

    if (result) {
      onChange(result);
    }
  }

  return (
    <div className={clsx(fullWidth && 'flex-1')}>
      <Label>{label}</Label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {dir ? (
              <FolderIcon
                className="h-5 w-5 text-gray-400 dark:text-dark-200"
                aria-hidden="true"
              />
            ) : (
              <DocumentIcon
                className="h-5 w-5 text-gray-400 dark:text-dark-200"
                aria-hidden="true"
              />
            )}
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="dark:bg-dark-400 dark:text-dark-200 dark:placeholder-dark-200 focus:outline-none focus:ring-theme-orange-400 focus:border-theme-orange-400 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300 dark:border-dark-700"
            placeholder={placeholder ?? `Path to ${dir ? 'Folder' : 'File'}`}
          />
        </div>
        <button
          type="button"
          onClick={openDialog}
          className="dark:bg-dark-500 dark:text-dark-200 -ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-700 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 dark:hover:bg-dark-600 focus:outline-none focus:ring-1 focus:ring-theme-orange-400 focus:border-theme-orange-400"
        >
          {dir ? (
            <FolderOpenIcon
              className="h-5 w-5 text-gray-400 dark:text-dark-200"
              aria-hidden="true"
            />
          ) : (
            <DocumentAddIcon
              className="h-5 w-5 text-gray-400 dark:text-dark-200"
              aria-hidden="true"
            />
          )}
          <span>Open</span>
        </button>
      </div>
    </div>
  );
}
