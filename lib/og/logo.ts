import { readFileSync } from "fs";
import { join } from "path";

/**
 * Reads pronouns.blue-round.svg from the public/ folder and returns it as a
 * base64 data URL so Satori can embed it without a network request to self.
 *
 * Cached at module level — read once per serverless invocation.
 * Returns null if the file can't be read (OG images will skip the logo img).
 */
let cache: string | null | false = null;

export function getLogoDataUrl(): string | null {
  if (cache === false) return null;
  if (cache !== null) return cache;
  try {
    const buf = readFileSync(
      join(process.cwd(), "public", "pronouns.blue-round.svg"),
    );
    cache = `data:image/svg+xml;base64,${buf.toString("base64")}`;
    return cache;
  } catch {
    cache = false;
    return null;
  }
}
