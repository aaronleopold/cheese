import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import useStore from '../../store';
import Select, { SelectOption } from './ui/Select';

const screenshotOptions: SelectOption[] = [
  {
    label: 'Webp',
    value: 'image/webp',
  },
  {
    label: 'PNG',
    value: 'image/png',
  },
  {
    label: 'JPEG',
    value: 'image/jpeg',
  },
];

export default function PictureFormatSelect() {
  const { screenshotFormat, setScreenshotFormat } = useStore(
    (state) => state,
    shallow
  );

  const [selected, setSelected] = useState(getSelected());

  function getSelected() {
    return screenshotOptions.find((opt) => opt.value === screenshotFormat);
  }

  function handleChange(value: any) {
    const option = screenshotOptions.find((opt) => opt.value === value);

    if (option) {
      setSelected(option);
      setScreenshotFormat(option.value);
    }
  }

  return (
    <Select
      label="Screenshot Format"
      options={screenshotOptions}
      selected={selected}
      onSelect={handleChange}
    />
  );
}
