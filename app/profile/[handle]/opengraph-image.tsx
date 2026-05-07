import { ImageResponse } from "next/og";
import { C, OG_SIZE } from "@/lib/og/config";
import { getOgFontList } from "@/lib/og/fonts";
import { getLogoDataUrl } from "@/lib/og/logo";
import { getActorProfile } from "@/lib/atproto/profiles";
import { getProfileRecordsFromPds } from "@/lib/atproto/records";

export const alt = "Profile on pronouns.blue";
export const size = OG_SIZE;
export const contentType = "image/png";
export const revalidate = 3600;

const MAX_NAMES = 4;
const MAX_PRONOUNS = 4;

function truncate(s: string, max: number) {
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}

/** Bluesky CDN serves WebP by default; Satori only handles JPEG/PNG/GIF. */
function toJpegUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  return url.includes("@") ? url : url + "@jpeg";
}

export default async function Image({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle: rawHandle } = await params;
  const handle = decodeURIComponent(rawHandle).replace(/^@/, "");

  const [fonts, logo, actor] = await Promise.all([
    getOgFontList(),
    Promise.resolve(getLogoDataUrl()),
    getActorProfile(handle),
  ]);

  const profile = actor ? await getProfileRecordsFromPds(actor.did) : null;
  const displayName = actor
    ? truncate(actor.displayName ?? actor.handle, 24)
    : handle;
  const displayHandle = truncate(actor?.handle ?? handle, 26);
  const hasNames = (profile?.names.length ?? 0) > 0;
  const hasPronouns = (profile?.pronouns.length ?? 0) > 0;
  const names = profile?.names.slice(0, MAX_NAMES) ?? [];
  const extraNames = (profile?.names.length ?? 0) - names.length;
  const pronouns = profile?.pronouns.slice(0, MAX_PRONOUNS) ?? [];
  const extraPronouns = (profile?.pronouns.length ?? 0) - pronouns.length;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "1200px",
          height: "630px",
          background: C.bg,
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Atmospheric gradient orb (top-right) ── */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(136,57,239,0.28) 0%, transparent 65%)",
          }}
        />
        {/* Soft secondary orb (bottom-left) */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(136,57,239,0.12) 0%, transparent 65%)",
          }}
        />

        {/* ── Main layout: natural height, outer column centres it ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Left column: avatar + identity */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 252,
              flexShrink: 0,
              gap: 20,
              paddingRight: 48,
            }}
          >
            {/* Avatar */}
            {actor?.avatar ? (
              <img
                src={toJpegUrl(actor.avatar)!}
                alt={displayName}
                width={120}
                height={120}
                style={{
                  borderRadius: "50%",
                  border: `3px solid ${C.border}`,
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: C.surface,
                  border: `3px solid ${C.border}`,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 48,
                  fontWeight: 600,
                  color: C.text,
                }}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Name + handle */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  color: C.text,
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                {displayName}
              </div>
              <div style={{ fontSize: 16, color: C.muted }}>
                {`@${displayHandle}`}
              </div>
            </div>
          </div>

          {/* Vertical divider — short & subtle */}
          <div
            style={{
              width: 1,
              height: 156,
              alignSelf: "center",
              background: C.border,
              opacity: 0.35,
              flexShrink: 0,
            }}
          />

          {/* Right column: names + pronouns */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 580,
              paddingLeft: 56,
              gap: 32,
            }}
          >
            {hasNames && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.dim,
                    letterSpacing: 2.5,
                    textTransform: "uppercase",
                  }}
                >
                  Names
                </div>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
                >
                  {names.map((name, i) => {
                    const preferred = profile!.preferredNames.includes(name);
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          background: preferred ? C.accentFill : C.surface,
                          border: `1px solid ${preferred ? C.accentRing : C.border}`,
                          borderRadius: 10,
                          padding: "9px 22px",
                          fontSize: 23,
                          fontWeight: preferred ? 600 : 400,
                          color: C.text,
                        }}
                      >
                        {name}
                      </div>
                    );
                  })}
                  {extraNames > 0 && (
                    <div
                      style={{
                        display: "flex",
                        background: C.surface,
                        border: `1px solid ${C.border}`,
                        borderRadius: 10,
                        padding: "9px 22px",
                        fontSize: 23,
                        color: C.dim,
                      }}
                    >
                      {`+${extraNames}`}
                    </div>
                  )}
                </div>
              </div>
            )}

            {hasPronouns && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.dim,
                    letterSpacing: 2.5,
                    textTransform: "uppercase",
                  }}
                >
                  Pronouns
                </div>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: 10 }}
                >
                  {pronouns.map((pronoun, i) => {
                    const preferred =
                      profile!.preferredPronouns.includes(pronoun);
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          background: preferred ? C.accentFill : C.surface,
                          border: `1px solid ${preferred ? C.accentRing : C.border}`,
                          borderRadius: 10,
                          padding: "9px 22px",
                          fontSize: 23,
                          fontWeight: preferred ? 600 : 400,
                          color: C.text,
                        }}
                      >
                        {pronoun}
                      </div>
                    );
                  })}
                  {extraPronouns > 0 && (
                    <div
                      style={{
                        display: "flex",
                        background: C.surface,
                        border: `1px solid ${C.border}`,
                        borderRadius: 10,
                        padding: "9px 22px",
                        fontSize: 23,
                        color: C.dim,
                      }}
                    >
                      {`+${extraPronouns}`}
                    </div>
                  )}
                </div>
              </div>
            )}

            {!hasNames && !hasPronouns && (
              <div style={{ fontSize: 22, color: C.dim }}>
                No names or pronouns set yet
              </div>
            )}
          </div>
        </div>

        {/* Subtle watermark — absolute, bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: 26,
            right: 44,
            display: "flex",
            alignItems: "center",
            gap: 8,
            opacity: 0.45,
          }}
        >
          {logo ? (
            <img src={logo} alt="" width={20} height={20} />
          ) : null}
          <div style={{ fontSize: 14, color: C.muted }}>
            pronouns.blue
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
