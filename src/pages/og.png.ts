import type { APIRoute } from "astro";
import { createElement } from "react";
import { renderOgImage } from "@/lib/og/render";
import { C, OG_SIZE } from "@/lib/og/config";
import { getLogoDataUrl } from "@/lib/og/logo";

export const prerender = false;

export const GET: APIRoute = async () => {
  const logo = getLogoDataUrl();

  const png = await renderOgImage(
    createElement(
      "div",
      {
        style: {
          display: "flex",
          width: `${OG_SIZE.width}px`,
          height: `${OG_SIZE.height}px`,
          background: C.bg,
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden",
        },
      },
      createElement("div", {
        style: {
          position: "absolute",
          top: -180,
          left: -180,
          width: 620,
          height: 620,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(136,57,239,0.32) 0%, transparent 65%)",
        },
      }),
      createElement("div", {
        style: {
          position: "absolute",
          bottom: -160,
          right: -160,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(136,57,239,0.18) 0%, transparent 65%)",
        },
      }),
      createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            gap: 22,
            padding: "0 120px",
          },
        },
        createElement(
          "div",
          {
            style: {
              display: "flex",
              position: "relative",
              width: 104,
              height: 104,
              alignItems: "center",
              justifyContent: "center",
            },
          },
          createElement("div", {
            style: {
              position: "absolute",
              inset: -20,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(136,57,239,0.45) 0%, transparent 70%)",
            },
          }),
          logo
            ? createElement("img", {
                src: logo,
                alt: "pronouns.blue logo",
                width: 104,
                height: 104,
                style: { borderRadius: "50%" },
              })
            : createElement("div", {
                style: {
                  display: "flex",
                  width: 104,
                  height: 104,
                  borderRadius: "50%",
                  background: "linear-gradient(140deg, rgba(136,57,239,0.9) 0%, rgba(136,57,239,0.5) 100%)",
                  border: `1.5px solid ${C.accentRing}`,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 42,
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "-1px",
                },
              }),
        ),
        createElement(
          "div",
          {
            style: {
              display: "flex",
              fontSize: 82,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "-3px",
            },
          },
          createElement("span", { style: { color: C.text } }, "pronouns"),
          createElement("span", { style: { color: C.accent } }, ".blue"),
        ),
        createElement(
          "div",
          {
            style: {
              fontSize: 27,
              color: C.muted,
              textAlign: "center",
              lineHeight: 1.45,
            },
          },
          "Share your names and pronouns on the Bluesky network",
        ),
        createElement(
          "div",
          { style: { display: "flex", gap: 12, marginTop: 6 } },
          ...["AT Protocol", "Open Source", "Free Forever"].map((label) =>
            createElement(
              "div",
              {
                key: label,
                style: {
                  display: "flex",
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 999,
                  padding: "7px 20px",
                  fontSize: 17,
                  color: C.muted,
                },
              },
              label,
            ),
          ),
        ),
      ),
    ),
  );

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
