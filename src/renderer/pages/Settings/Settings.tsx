import { ipcRenderer } from 'electron';
import React from 'react';
import shallow from 'zustand/shallow';
import useStore from '../../../store';
import { SIZES, windowSizeSelections } from '../../../store/window';
import RadioGroup from '../../components/ui/RadioGroup';
import Switch from '../../components/ui/Switch';

export default function Settings() {
  const { theme, toggleTheme, size, setSize } = useStore(
    (state) => ({
      theme: state.theme,
      toggleTheme: state.toggleTheme,
      size: state.size,
      setSize: state.setSize,
    }),
    shallow
  );

  function handleSizeChange(value: keyof typeof SIZES) {
    const { height, width } = SIZES[value] ?? SIZES.md;

    // send the signal to electron to resize the window
    ipcRenderer.send('resize_event', { height, width });

    setSize(value);
  }

  return (
    <div className="flex flex-col space-y-4">
      <Switch enabled={theme === 'dark'} setEnabled={toggleTheme} />

      <RadioGroup
        items={windowSizeSelections}
        selected={size}
        setSelected={handleSizeChange}
      />
    </div>
  );
}
