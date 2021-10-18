import React, { useState } from 'react';
import shallow from 'zustand/shallow';
import useStore from '../../store';
import Select, { SelectOption } from './ui/Select';

const videoOptions: SelectOption[] = [
  {
    label: 'MP4',
    value: 'video/mp4',
  },
  {
    label: 'AVI',
    value: 'video/avi',
  },
  {
    label: 'Webm',
    value: 'video/webm',
  },
  {
    label: 'Ogg',
    value: 'video/ogg',
  },
];

export default function VideoFormatSelect() {
  const { videoFormat, setVideoFormat } = useStore((state) => state, shallow);
  const [selected, setSelected] = useState(getSelected());

  function getSelected() {
    return videoOptions.find((opt) => opt.value === videoFormat);
  }

  function handleChange(value: any) {
    const option = videoOptions.find((opt) => opt.value === value);

    if (option) {
      setSelected(option);
      setVideoFormat(option.value);
    }
  }

  return (
    <Select
      label="Video Format"
      options={videoOptions}
      selected={selected}
      onSelect={handleChange}
    />
  );
}
