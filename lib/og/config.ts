export const OG_SIZE = { width: 1200, height: 630 };

/** Fixed dark-theme palette — OG images always render in dark mode. */
export const C = {
  bg: "#1e1e2e",
  surface: "#313244",
  strong: "#45475a",
  text: "#cdd6f4",
  muted: "#a6adc8",
  dim: "#6c7086",
  border: "#585b70",
  accent: "#8839ef",
  accentFill: "rgba(136,57,239,0.22)",
  accentRing: "rgba(136,57,239,0.55)",
} as const;

export function getBaseUrl(): string {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
}
