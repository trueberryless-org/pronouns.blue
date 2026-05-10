/** No-op subscribe for useSyncExternalStore — cookie changes don't fire DOM events. */
export function subscribeToCookies(): () => void {
  return () => {};
}

/** Reads the non-httpOnly `did-public` cookie set by middleware. */
export function getDidPublicCookie(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)did-public=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/** Server snapshot for useSyncExternalStore — cookies are not accessible on the server. */
export function getDidPublicCookieServer(): null {
  return null;
}
