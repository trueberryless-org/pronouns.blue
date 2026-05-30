import type { AstroCookies } from "astro";
import type { CookieAdapter, CookieOptions } from "./cookie-adapter";

export class AstroCookieAdapter implements CookieAdapter {
  constructor(
    private readonly cookies: AstroCookies,
    private readonly request: Request,
  ) {}

  get(name: string): string | undefined {
    return this.cookies.get(name)?.value;
  }

  set(name: string, value: string, options?: CookieOptions): void {
    this.cookies.set(name, value, options);
  }

  delete(name: string): void {
    this.cookies.delete(name, { path: "/" });
  }

  getAll(): { name: string; value: string }[] {
    const header = this.request.headers.get("cookie");
    if (!header) return [];
    return header.split(";").flatMap((part) => {
      const eqIndex = part.indexOf("=");
      if (eqIndex === -1) return [];
      const name = part.slice(0, eqIndex).trim();
      const rawValue = part.slice(eqIndex + 1).trim();
      if (!name) return [];
      let value = rawValue;
      try {
        value = decodeURIComponent(rawValue);
      } catch {
        // leave as-is if decoding fails
      }
      return [{ name, value }];
    });
  }
}

export function createAstroCookieAdapter(
  cookies: AstroCookies,
  request: Request,
): CookieAdapter {
  return new AstroCookieAdapter(cookies, request);
}
