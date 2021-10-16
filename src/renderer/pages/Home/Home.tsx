import React from 'react';
import Webcam from 'react-webcam';
import DeviceOptions from '../../components/DeviceOptions';
import useDevices from '../../hooks/useDevices';
import useToggle from '../../hooks/useToggle';

export default function Home() {
  const [devices, selectedDevices, { selectDevice }] = useDevices();
  const [recordAudio, { toggle: toggleAudio }] = useToggle(true);
  const [mutePlayback, { toggle: toggleMute }] = useToggle(true);

  return (
    <div className="flex flex-col space-y-4 mt-4">
      <div className="flex items-center justify-center">
        <div className="flex flex-col space-y-4 bg-white dark:bg-dark-800 p-4 rounded-md shadow-sm">
          <Webcam
            onLoad={() => console.log('VIDEO LOADED')}
            className="rounded-md overflow-hidden"
            audio={recordAudio}
            muted={mutePlayback}
            videoConstraints={{
              deviceId: selectedDevices?.videoinput?.deviceId,
            }}
            audioConstraints={{
              deviceId: selectedDevices?.audioinput?.deviceId,
              advanced: [
                {
                  echoCancellation: true,
                },
              ],
            }}
          />

          <DeviceOptions
            devices={devices}
            selectedDevices={selectedDevices}
            onSelect={selectDevice}
            recordAudio={recordAudio}
            mutePlayback={mutePlayback}
            toggleRecordAudio={toggleAudio}
            toggleMutePlayback={toggleMute}
          />

          <div className="">playback controls here</div>
        </div>
      </div>
    </div>
  );
}
