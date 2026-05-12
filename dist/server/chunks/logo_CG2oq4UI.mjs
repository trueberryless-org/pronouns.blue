import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

let fontPromise = null;
function preloadFonts() {
  if (!fontPromise) {
    const base = "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.1.1/files";
    fontPromise = Promise.all([
      fetch(`${base}/inter-latin-400-normal.woff`).then((r) => r.arrayBuffer()),
      fetch(`${base}/inter-latin-600-normal.woff`).then((r) => r.arrayBuffer())
    ]).then(([regular, semiBold]) => ({ regular, semiBold }));
  }
  return fontPromise;
}
async function getOgFontList() {
  const { regular, semiBold } = await preloadFonts();
  return [
    { name: "Inter", data: regular, style: "normal", weight: 400 },
    { name: "Inter", data: semiBold, style: "normal", weight: 600 }
  ];
}

const OG_SIZE = { width: 1200, height: 630 };
const C = {
  bg: "#1e1e2e",
  surface: "#313244",
  text: "#cdd6f4",
  muted: "#a6adc8",
  dim: "#6c7086",
  border: "#585b70",
  accent: "#8839ef",
  accentFill: "rgba(136,57,239,0.22)",
  accentRing: "rgba(136,57,239,0.55)"
};

async function renderOgImage(element) {
  const fonts = await getOgFontList();
  const svg = await satori(element, {
    width: OG_SIZE.width,
    height: OG_SIZE.height,
    fonts
  });
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: OG_SIZE.width }
  });
  return resvg.render().asPng();
}

let cache = null;
function getLogoDataUrl() {
  if (cache === false) return null;
  if (cache !== null) return cache;
  try {
    const buf = readFileSync(
      join(process.cwd(), "public", "pronouns.blue-round.svg")
    );
    cache = `data:image/svg+xml;base64,${buf.toString("base64")}`;
    return cache;
  } catch {
    cache = false;
    return null;
  }
}

export { C, OG_SIZE as O, getLogoDataUrl as g, renderOgImage as r };
