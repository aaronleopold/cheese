import Store from 'electron-store';
import create from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
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

export interface CheeseStore extends ThemeStore, WindowStore {}

const useStore = create<CheeseStore>(
  persist(
    (set, get) => ({
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
    }),
    {
      name: 'cheese-store',
      getStorage: () => ElectronStore,
    }
  )
);

export default useStore;
