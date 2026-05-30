export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none" | "Strict" | "Lax" | "None";
  maxAge?: number;
  path?: string;
}

/** Minimal cookie interface used by the auth layer. */
export interface CookieAdapter {
  get(name: string): string | undefined;
  set(name: string, value: string, options?: CookieOptions): void;
  delete(name: string): void;
  getAll(): { name: string; value: string }[];
}
