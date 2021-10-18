import React from 'react';
import shallow from 'zustand/shallow';
import useStore from '../../store';
import Select, { SelectOption } from './ui/Select';

// FIXME: not done
export default function VideoFormatSelect() {
  const { videoFormat, setVideoFormat } = useStore((state) => state, shallow);

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

  function getSelected() {
    return videoOptions.find((opt) => opt.value === videoFormat);
  }

  function handleChange(option: SelectOption) {
    setVideoFormat(option.value);
  }

  return (
    <Select
      label="Video Format"
      options={videoOptions}
      selected={getSelected()}
      onSelect={handleChange}
    />
  );
}
