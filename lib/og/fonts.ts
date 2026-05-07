/**
 * Loads Inter (Regular 400 + SemiBold 600) from jsDelivr CDN.
 * The promise is cached at module level so fonts are fetched at most once per
 * serverless function lifecycle — subsequent OG image requests in the same
 * invocation reuse the cached ArrayBuffers.
 */

let fontPromise: Promise<{
  regular: ArrayBuffer;
  semiBold: ArrayBuffer;
}> | null = null;

function preloadFonts() {
  if (!fontPromise) {
    const base =
      "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.1.1/files";
    fontPromise = Promise.all([
      fetch(`${base}/inter-latin-400-normal.woff`).then((r) => r.arrayBuffer()),
      fetch(`${base}/inter-latin-600-normal.woff`).then((r) => r.arrayBuffer()),
    ]).then(([regular, semiBold]) => ({ regular, semiBold }));
  }
  return fontPromise;
}

export async function getOgFontList() {
  const { regular, semiBold } = await preloadFonts();
  return [
    { name: "Inter", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "Inter", data: semiBold, style: "normal" as const, weight: 600 as const },
  ];
}
