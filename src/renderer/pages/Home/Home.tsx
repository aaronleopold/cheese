import React, { useCallback } from 'react';
import Webcam from 'react-webcam';
import shallow from 'zustand/shallow';
import useStore from '../../../store';
// import { CAMERA_PREVIEW_SIZES } from '../../../store/window';
import Controls from '../../components/Controls';
import DeviceOptions from '../../components/DeviceOptions';
import FileExportModal from '../../components/FileExportModal';
import Loader from '../../components/ui/Loader';
import useCamera from '../../hooks/useCamera';
import useDevices from '../../hooks/useDevices';
import useToggle from '../../hooks/useToggle';

export default function Home() {
  const [devices, selectedDevices, { selectDevice }] = useDevices();
  const [cameraRef, cameraData, cameraActions] = useCamera();

  const [loading, { off }] = useToggle(true);

  const { recordAudio, mutePlayback, screenshotFormat } = useStore(
    (state) => state,
    shallow
  );

  // const cameraWidth = CAMERA_PREVIEW_SIZES[size];

  const handleMediaLoaded = useCallback(() => {
    off();
  }, []);

  return (
    <React.Fragment>
      <FileExportModal {...cameraData} {...cameraActions} />
      <div className="flex flex-col space-y-4 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white dark:bg-dark-800 p-4 rounded-md shadow-sm">
        {/* TODO: fix the size of this container, rather than the size of the video */}
        <div className="relative">
          {loading && <Loader active={loading} />}
          <Webcam
            ref={cameraRef}
            // width={cameraWidth}
            className="rounded-md z-0"
            audio={recordAudio}
            muted={mutePlayback}
            screenshotFormat={screenshotFormat}
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
            onUserMedia={handleMediaLoaded}
          />
        </div>

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
