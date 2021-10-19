import { systemPreferences } from 'electron';
import { platform } from 'process';

export default async function askForMediaAccess(): Promise<boolean> {
  try {
    if (platform !== 'darwin') {
      return true;
    }

    const micStatus = await systemPreferences.getMediaAccessStatus(
      'microphone'
    );

    let micAllowed = true;

    if (micStatus === 'not-determined' || micStatus === 'denied') {
      const success = await systemPreferences.askForMediaAccess('microphone');
      micAllowed = success.valueOf();
    }

    const camStatus = await systemPreferences.getMediaAccessStatus('camera');

    let camAllowed = true;

    if (camStatus === 'not-determined' || camStatus === 'denied') {
      const success = await systemPreferences.askForMediaAccess('microphone');
      camAllowed = success.valueOf();
    }

    return micAllowed && camAllowed;
  } catch (error) {
    console.error(
      'Could not get microphone permission:',
      (error as any).message
    );
  }
  return false;
}
