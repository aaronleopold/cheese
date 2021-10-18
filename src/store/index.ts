import Store from 'electron-store';
import create from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
// import MediaStorage, { defaultMediaStorage } from './storage';
import ThemeStore from './theme';
import WindowStore from './window';

const store = new Store();

export { store as rawStore };

const ElectronStore = {
  getItem: async (key: string) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('getting', key, 'from storage');
    }

    return store.get(key, null);
  },
  setItem: (key: string, value: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(key, 'with value', value, 'has been saved');
    }

    store.set(key, value);
  },
} as StateStorage;

export enum ApplicationFlow {
  Home = 'Home',
  Recording = 'Recording',
  RecordingStopped = 'RecordingStopped',
  Screenshot = 'Screenshot',
}

export type VideoFormat =
  | 'video/mp4'
  | 'video/avi'
  | 'video/ogg'
  | 'video/webm';

export type ScreenshotFormat = 'image/webp' | 'image/png' | 'image/jpeg';

export interface CheeseStore extends ThemeStore, WindowStore {
  flow: ApplicationFlow;
  setFlow(newFlow: ApplicationFlow): void;

  recordAudio: boolean;
  toggleRecordAudio(): void;

  mutePlayback: boolean;
  toggleMutePlayback(): void;

  mirrorVideo: boolean;
  toggleMirrorVideo(): void;

  videoFormat: VideoFormat;
  setVideoFormat(format: VideoFormat): void;

  screenshotFormat: ScreenshotFormat;
  setScreenshotFormat(format: ScreenshotFormat): void;
}

const useStore = create<CheeseStore>(
  persist(
    (set, get) => ({
      // TODO: should this be part of a separate, non-persisted store?
      flow: ApplicationFlow.Home,
      setFlow(newFlow: ApplicationFlow) {
        set({ flow: newFlow });
      },

      theme: 'light',
      toggleTheme() {
        const theme = get().theme;

        if (theme === 'light') {
          set({ theme: 'dark' });
          // document.querySelector('html')?.classList.add('dark');
        } else {
          set({ theme: 'light' });
          // document.querySelector('html')?.classList.remove('dark');
        }
      },

      size: 'md',
      setSize(key) {
        set({ size: key });
      },

      // ...defaultMediaStorage,

      // setVideoDirectory(dir) {
      //   set({ videoDirectory: dir });
      // },

      // setPictureDirectory(dir) {
      //   set({ pictureDirectory: dir });
      // },

      recordAudio: true,
      toggleRecordAudio() {
        set({ recordAudio: !get().recordAudio });
      },

      mutePlayback: true,
      toggleMutePlayback() {
        set({ mutePlayback: !get().mutePlayback });
      },

      mirrorVideo: false,
      toggleMirrorVideo() {
        set({ mirrorVideo: !get().mirrorVideo });
      },

      videoFormat: 'video/mp4',
      setVideoFormat(format) {
        set({ videoFormat: format });
      },

      screenshotFormat: 'image/png',
      setScreenshotFormat(format) {
        set({ screenshotFormat: format });
      },
    }),
    {
      name: 'cheese-store',
      getStorage: () => ElectronStore,
    }
  )
);

export default useStore;
