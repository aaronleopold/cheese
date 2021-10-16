export type Theme = 'light' | 'dark';

export default interface ThemeStore {
  theme: Theme;
  toggleTheme(): void;
}
