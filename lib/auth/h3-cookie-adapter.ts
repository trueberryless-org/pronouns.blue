import type { H3Event } from 'h3';
import { getCookie, setCookie, deleteCookie, parseCookies } from 'h3';
import type { CookieAdapter, CookieOptions } from './cookie-adapter';

export function createH3CookieAdapter(event: H3Event): CookieAdapter {
  return {
    get(name: string): string | undefined {
      return getCookie(event, name);
    },

    set(name: string, value: string, options?: CookieOptions): void {
      setCookie(event, name, value, {
        httpOnly: options?.httpOnly,
        secure: options?.secure,
        sameSite: options?.sameSite?.toLowerCase() as 'strict' | 'lax' | 'none' | undefined,
        maxAge: options?.maxAge,
        path: options?.path ?? '/',
      });
    },

    delete(name: string): void {
      deleteCookie(event, name, { path: '/' });
    },

    getAll(): { name: string; value: string }[] {
      const cookies = parseCookies(event);
      return Object.entries(cookies).map(([name, value]) => ({ name, value }));
    },
  };
}
