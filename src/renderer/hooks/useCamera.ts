import { useMemo, useRef } from 'react';

export default function useCamera() {
  // FIXME: type this
  const cameraRef = useRef<any>();

  const actions = useMemo(
    () => ({
      screenshot() {
        const imageString = cameraRef.current?.getScreenshot();

        console.log(imageString);
      },
    }),
    [cameraRef]
  );

  return [cameraRef, actions] as const;
}
