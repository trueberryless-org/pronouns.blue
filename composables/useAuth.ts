/**
 * Reactive auth state composable.
 *
 * Reads the non-httpOnly `did-public` cookie set by server/middleware/did-public.ts.
 * On the server this uses the SSR cookie context; on the client it's reactive.
 * No cookie-polling or useSyncExternalStore hacks needed.
 */
export const useAuth = () => {
  const did = useCookie<string | null>("did-public", {
    default: () => null,
  });

  const isSignedIn = computed(() => !!did.value);

  return { did, isSignedIn };
};
