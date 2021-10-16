import React from 'react';
import Webcam from 'react-webcam';
import shallow from 'zustand/shallow';
import useStore from '../../../store';
import { CAMERA_PREVIEW_SIZES } from '../../../store/window';
import Controls from '../../components/Controls';
import DeviceOptions from '../../components/DeviceOptions';
import useCamera from '../../hooks/useCamera';
import useDevices from '../../hooks/useDevices';

export default function Home() {
  const [devices, selectedDevices, { selectDevice }] = useDevices();
  const [cameraRef, cameraActions] = useCamera();

  const { size, recordAudio, mutePlayback } = useStore(
    (state) => state,
    shallow
  );

  const cameraWidth = CAMERA_PREVIEW_SIZES[size];

  return (
    <div className="flex flex-col space-y-4 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white dark:bg-dark-800 p-4 rounded-md shadow-sm">
      <Webcam
        ref={cameraRef}
        width={cameraWidth}
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
      />

      <Controls {...cameraActions} />
    </div>
  );
}
