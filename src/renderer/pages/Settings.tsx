import { ipcRenderer } from 'electron';
import React from 'react';
import shallow from 'zustand/shallow';
import useStore from '../../store';
import { SIZES, windowSizeSelections } from '../../store/window';
import PictureFormatSelect from '../components/PictureFormatSelect';
import RadioGroup from '../components/ui/RadioGroup';
import Switch from '../components/ui/Switch';
import VideoFormatSelect from '../components/VideoFormatSelect';

export default function Settings() {
  const { theme, toggleTheme, size, setSize } = useStore(
    (state) => state,
    shallow
  );

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

      <div className="flex items-center space-x-2">
        <PictureFormatSelect />
        <VideoFormatSelect />
      </div>

      <RadioGroup
        groupLabel="Window Size"
        items={windowSizeSelections}
        selected={size}
        setSelected={handleSizeChange}
      />
    </div>
  );
}
