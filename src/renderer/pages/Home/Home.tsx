import React from 'react';
import Webcam from 'react-webcam';
import shallow from 'zustand/shallow';
import useStore from '../../../store';
import { CAMERA_PREVIEW_SIZES } from '../../../store/window';
import Controls from '../../components/Controls';
import DeviceOptions from '../../components/DeviceOptions';
import FileExportModal from '../../components/FileExportModal';
import useCamera from '../../hooks/useCamera';
import useDevices from '../../hooks/useDevices';

export default function Home() {
  const [devices, selectedDevices, { selectDevice }] = useDevices();
  const [cameraRef, cameraData, cameraActions] = useCamera();

  const { size, recordAudio, mutePlayback } = useStore(
    (state) => state,
    shallow
  );

  const cameraWidth = CAMERA_PREVIEW_SIZES[size];

  return (
    <React.Fragment>
      <FileExportModal {...cameraData} />
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
          screenshotFormat="image/jpeg"
        />

        <DeviceOptions
          devices={devices}
          selectedDevices={selectedDevices}
          onSelect={selectDevice}
        />

        <Controls {...cameraActions} />
      </div>
    </React.Fragment>
  );
}
