import { ImageResponse } from "next/og";
import { C, OG_SIZE } from "@/lib/og/config";
import { getOgFontList } from "@/lib/og/fonts";
import { getLogoDataUrl } from "@/lib/og/logo";

export const alt = "Settings – pronouns.blue";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const [fonts, logo] = await Promise.all([
    getOgFontList(),
    Promise.resolve(getLogoDataUrl()),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        background: C.bg,
        fontFamily: "Inter",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: -150,
          right: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(136,57,239,0.25) 0%, transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -120,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(136,57,239,0.14) 0%, transparent 65%)",
        }}
      />

      {/* Centre content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          gap: 24,
        }}
      >
        {/* Page icon — gear motif as a styled ring */}
        <div
          style={{
            display: "flex",
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: C.accentFill,
            border: `2px solid ${C.accentRing}`,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 42,
          }}
        >
          ⚙️
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 66,
            fontWeight: 600,
            color: C.text,
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          Settings
        </div>

        <div
          style={{
            fontSize: 26,
            color: C.muted,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 680,
          }}
        >
          Manage your preferred names and pronouns
        </div>
      </div>

      {/* Branding strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 56px",
          borderTop: `1px solid rgba(88,91,112,0.35)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {logo ? (
            <img src={logo} alt="pronouns.blue logo" width={28} height={28} />
          ) : (
            <div
              style={{
                display: "flex",
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: C.accent,
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              p
            </div>
          )}
          <span style={{ fontSize: 17, fontWeight: 600, color: C.text }}>
            pronouns.blue
          </span>
        </div>
        <span style={{ fontSize: 14, color: C.dim }}>
          Share your names &amp; pronouns on AT Protocol
        </span>
      </div>
    </div>,
    { ...size, fonts },
  );
}
