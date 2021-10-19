import { useCallback, useMemo, useRef, useState } from 'react';
import { generate } from 'randomstring';
import useStore from '../../store';

export default function useCamera() {
  // FIXME: type this
  const cameraRef = useRef<any>();
  const mediaRecorderRef = useRef<any>();

  const [screenshotData, setScreenshotData] = useState<string>();
  const [recordedChunks, setRecordedChunks] = useState<any[]>([]);

  const { videoFormat, screenshotFormat } = useStore((state) => state);

  function getDownloadFileName(format: string) {
    return `${generate({ length: 7 })}.${format.split('/')[1]}`;
  }

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

      downloadScreenshot() {
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.classList.add('hidden');
        a.href = screenshotData!;
        a.download = getDownloadFileName(screenshotFormat);
        a.click();
        document.removeChild(a);
      },

      startRecording() {
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
      },

      downloadRecording() {
        if (recordedChunks.length) {
          const blob = new Blob(recordedChunks, {
            type: videoFormat,
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.classList.add('hidden');
          a.href = url;
          a.download = getDownloadFileName(videoFormat);
          a.click();
          window.URL.revokeObjectURL(url);
          document.removeChild(a);
        }
      },

      clear() {
        setScreenshotData(undefined);
        setRecordedChunks([]);
      },
    }),
    [
      cameraRef,
      mediaRecorderRef,
      recordedChunks,
      screenshotData,
      videoFormat,
      screenshotFormat,
    ]
  );

  return [cameraRef, { screenshotData, recordedChunks }, actions] as const;
}
