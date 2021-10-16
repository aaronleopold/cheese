import { ipcRenderer } from 'electron';
import React from 'react';
import shallow from 'zustand/shallow';
import useStore from '../../../store';
import { SIZES, windowSizeSelections } from '../../../store/window';
import FilePicker from '../../components/ui/FIlePicker';
import RadioGroup from '../../components/ui/RadioGroup';
import Switch from '../../components/ui/Switch';

export default function Settings() {
  const {
    theme,
    toggleTheme,
    size,
    setSize,
    videoDirectory,
    setVideoDirectory,
    pictureDirectory,
    setPictureDirectory,
  } = useStore((state) => state, shallow);

  function handleSizeChange(value: any) {
    const { height, width } = SIZES[value] ?? SIZES.md;

    // send the signal to electron to resize the window
    ipcRenderer.send('resize_event', { height, width });

    setSize(value);
  }

  return (
    <div className="flex flex-col space-y-4">
      <Switch
        label="Application Theme"
        enabled={theme === 'dark'}
        setEnabled={toggleTheme}
      />

      <FilePicker
        label="Video Directory"
        dir
        value={videoDirectory}
        onChange={setVideoDirectory}
      />

      <FilePicker
        label="Picture Directory"
        dir
        value={pictureDirectory}
        onChange={setPictureDirectory}
      />

      <RadioGroup
        groupLabel="Window Size"
        items={windowSizeSelections}
        selected={size}
        setSelected={handleSizeChange}
      />
    </div>
  );
}
