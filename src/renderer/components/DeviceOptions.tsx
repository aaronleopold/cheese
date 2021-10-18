import React from 'react';
import shallow from 'zustand/shallow';
import useStore from '../../store';
import { Devices, SelectedDevices } from '../hooks/useDevices';
import DeviceSelect from './DeviceSelect';
import Radio from './ui/Radio';

export interface DeviceOptionsProps {
  selectedDevices?: SelectedDevices;
  onSelect(device: MediaDeviceInfo): void;
  devices?: Devices;
}

export default function DeviceOptions({
  devices,
  selectedDevices,
  onSelect,
}: DeviceOptionsProps) {
  const { recordAudio, mutePlayback, toggleRecordAudio, toggleMutePlayback } =
    useStore((state) => state, shallow);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:items-center lg:space-y-0">
        <DeviceSelect
          label="Video Devices"
          devices={devices?.videoinputs}
          selected={selectedDevices?.videoinput}
          onSelect={onSelect}
        />

        <DeviceSelect
          label="Audio Devices"
          devices={devices?.audioinputs}
          selected={selectedDevices?.audioinput}
          onSelect={onSelect}
          disabled={!recordAudio}
        />
      </div>

      <div className="flex items-center space-x-4 flex-wrap">
        <Radio
          title="Add audio to your recorded video"
          label="Record Audio"
          value={recordAudio}
          onClick={toggleRecordAudio}
        />
        <Radio
          title="When toggled you won't hear yourself as you speak"
          label="Mute Playback"
          value={mutePlayback}
          onClick={toggleMutePlayback}
        />
      </div>
    </div>
  );
}
