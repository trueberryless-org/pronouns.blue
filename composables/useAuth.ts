/**
 * Reactive auth state composable.
 *
 * The OAuth client owns its token storage in the browser. Only the selected DID
 * is exposed to the app's reactive state.
 */
export const useAuth = () => {
  const did = useState<string | null>("auth-did", () => null);

  const isSignedIn = computed(() => !!did.value);

  return { did, isSignedIn };
};
