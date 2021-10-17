import { useCallback, useMemo, useRef, useState } from 'react';

export default function useCamera() {
  // FIXME: type this
  const cameraRef = useRef<any>();
  const mediaRecorderRef = useRef<any>();

  const [screenshotData, setScreenshotData] = useState<string>();
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev: any) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const actions = useMemo(
    () => ({
      screenshot() {
        setScreenshotData(cameraRef.current?.getScreenshot());
      },

      startRecording() {
        // setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(cameraRef.current.stream, {
          mimeType: 'video/webm',
        });
        mediaRecorderRef.current.addEventListener(
          'dataavailable',
          handleDataAvailable
        );
        mediaRecorderRef.current.start();
      },

      stopRecording() {
        mediaRecorderRef.current.stop();
        // setCapturing(false);
      },

      downloadRecording() {
        if (recordedChunks.length) {
          const blob = new Blob(recordedChunks, {
            type: 'video/webm',
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.classList.add('hidden');
          // a.style = 'display: none';
          a.href = url;
          a.download = 'react-webcam-stream-capture.webm';
          a.click();
          window.URL.revokeObjectURL(url);
          setRecordedChunks([]);
        }
      },
    }),
    [cameraRef, mediaRecorderRef, recordedChunks, screenshotData]
  );

  return [cameraRef, { screenshotData, recordedChunks }, actions] as const;
}
