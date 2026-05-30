globalThis.process ??= {}; globalThis.process.env ??= {};
function subscribeToCookies() {
  return () => {
  };
}
function getDidPublicCookie() {
  const match = document.cookie.match(/(?:^|;\s*)did-public=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
function getDidPublicCookieServer() {
  return null;
}

export { getDidPublicCookieServer as a, getDidPublicCookie as g, subscribeToCookies as s };
