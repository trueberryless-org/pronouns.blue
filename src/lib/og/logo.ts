import { readFileSync } from "node:fs";
import { join } from "node:path";

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
