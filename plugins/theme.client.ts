/**
 * Client-only plugin that initialises the theme from localStorage before Vue
 * mounts. Running it here (rather than in a layout's onMounted) means the
 * useState('theme') ref holds the correct value before any component's
 * template is evaluated on the client, so ThemeToggle renders the right
 * selected option on first paint without a reactive patch cycle.
 *
 * app:mounted fires after hydration, avoiding a SSR/client mismatch.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    useTheme().initTheme();
  });
});
