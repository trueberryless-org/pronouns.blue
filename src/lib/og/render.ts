import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import type { ReactNode } from "react";
import { getOgFontList } from "./fonts";
import { OG_SIZE } from "./config";

export async function renderOgImage(element: ReactNode): Promise<Uint8Array> {
  const fonts = await getOgFontList();
  const svg = await satori(element as Parameters<typeof satori>[0], {
    width: OG_SIZE.width,
    height: OG_SIZE.height,
    fonts,
  });
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: OG_SIZE.width },
  });
  return resvg.render().asPng();
}
