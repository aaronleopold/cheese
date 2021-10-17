import { PropsOf } from '@headlessui/react/dist/types';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import React from 'react';
import shallow from 'zustand/shallow';
import useStore, { ApplicationFlow } from '../../store';

interface ControlButtonProps extends PropsOf<'button'> {
  circle?: boolean;
  justify: 'center' | 'end' | 'start';
  colSpan?: number;
}

function ControlButton({
  colSpan = 1,
  justify,
  circle = false,
  ...props
}: ControlButtonProps) {
  return (
    <div
      className={`flex items-center col-span-${colSpan} justify-${justify} w-full`}
    >
      <button
        className={clsx(
          circle ? 'rounded-full p-1.5' : 'rounded-md px-2.5 py-1.5',
          'inline-flex items-center border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        )}
        {...props}
      />
    </div>
  );
}

export interface ControlsProps {
  screenshot(): void;
  startRecording(): void;
  stopRecording(): void;
}

export default function Controls({
  screenshot,
  startRecording,
  stopRecording,
}: ControlsProps) {
  const { flow, setFlow } = useStore((state) => state, shallow);

  function shouldShowRecordButton() {
    return flow !== ApplicationFlow.Recording;
  }

  function shouldShowStopRecordingButton() {
    return flow === ApplicationFlow.Recording;
  }

  function handleScreenshot() {
    screenshot();
    setFlow(ApplicationFlow.Screenshot);
  }

  function handleStartRecording() {
    startRecording();
    setFlow(ApplicationFlow.Recording);
  }

  function handleStopRecording() {
    stopRecording();
    setFlow(ApplicationFlow.RecordingStopped);
  }

  return (
    <div className="pt-4 grid grid-cols-6 items-center w-full">
      <ControlButton
        circle
        justify="start"
        title="Take Picture"
        onClick={handleScreenshot}
      >
        <CameraIcon className="w-7 h-7" />
      </ControlButton>

      {shouldShowRecordButton() && (
        <ControlButton
          colSpan={4}
          justify="center"
          title="Start Recording"
          onClick={handleStartRecording}
        >
          <VideoCameraIcon className="w-7 h-7" />
          Start Recording
        </ControlButton>
      )}

      {shouldShowStopRecordingButton() && (
        <ControlButton
          colSpan={4}
          justify="center"
          title="Stop Recording"
          onClick={handleStopRecording}
        >
          <VideoCameraIcon className="w-7 h-7" />
          Stop Recording
        </ControlButton>
      )}

      <div className="col-span-1 justify-end" />
    </div>
  );
}