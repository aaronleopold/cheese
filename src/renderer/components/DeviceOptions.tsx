import React from 'react';
import { Devices, SelectedDevices } from '../hooks/useDevices';
import DeviceSelect from './DeviceSelect';
import Radio from './ui/Radio';

export interface DeviceOptionsProps {
  selectedDevices?: SelectedDevices;
  onSelect(device: MediaDeviceInfo): void;
  devices?: Devices;
  recordAudio: boolean;
  toggleRecordAudio(): void;
  mutePlayback: boolean;
  toggleMutePlayback(): void;
}

export default function DeviceOptions({
  devices,
  selectedDevices,
  onSelect,
  recordAudio,
  toggleRecordAudio,
  mutePlayback,
  toggleMutePlayback,
}: DeviceOptionsProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-4">
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

      <div className="flex items-center space-x-4">
        <Radio
          label="Record Audio"
          value={recordAudio}
          onClick={toggleRecordAudio}
        />
        <Radio
          label="Mute Playback"
          value={mutePlayback}
          onClick={toggleMutePlayback}
        />
      </div>
    </div>
  );
}
