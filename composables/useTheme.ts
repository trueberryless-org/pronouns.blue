type Theme = 'light' | 'dark' | 'black';

const STORAGE_KEY = 'pronounsblue-theme';
export const THEMES: Theme[] = ['light', 'dark', 'black'];

/**
 * Reactive theme composable. Uses `useState` so all components share the same
 * theme instance. The initial value is hydrated from localStorage on the client.
 */
export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'dark');

  function setTheme(newTheme: Theme) {
    if (!THEMES.includes(newTheme)) return;
    theme.value = newTheme;
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
    }
  }

  function initTheme() {
    if (!import.meta.client) return;
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial: Theme = saved && THEMES.includes(saved) ? saved : 'dark';
    theme.value = initial;
    document.documentElement.setAttribute('data-theme', initial);
  }

  return { theme, setTheme, initTheme, THEMES };
};
