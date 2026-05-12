import { createElement } from 'react';
import { g as getLogoDataUrl, r as renderOgImage, C, O as OG_SIZE } from './logo_CG2oq4UI.mjs';
import { g as getActorProfile } from './profiles_BoBmfCD2.mjs';
import { g as getProfileRecordsFromPds } from './records_BqEqK-mF.mjs';

const prerender = false;
const MAX_NAMES = 4;
const MAX_PRONOUNS = 4;
function truncate(s, max) {
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}
function toJpegUrl(url) {
  if (!url) return void 0;
  return url.includes("@") ? url : url + "@jpeg";
}
const GET = async ({ params }) => {
  const rawHandle = params.handle ?? "";
  const handle = decodeURIComponent(rawHandle).replace(/^@/, "");
  const logo = getLogoDataUrl();
  const actor = await getActorProfile(handle);
  const profile = actor ? await getProfileRecordsFromPds(actor.did) : null;
  const displayName = actor ? truncate(actor.displayName ?? actor.handle, 24) : handle;
  const displayHandle = truncate(actor?.handle ?? handle, 26);
  const allNames = profile?.groups.flatMap((g) => g.names) ?? [];
  const allPreferredNames = profile?.groups.flatMap((g) => g.preferredNames) ?? [];
  const allPronouns = profile?.groups.flatMap((g) => g.pronouns) ?? [];
  const allPreferredPronouns = profile?.groups.flatMap((g) => g.preferredPronouns) ?? [];
  const hasNames = allNames.length > 0;
  const hasPronouns = allPronouns.length > 0;
  const bskyPronouns = !hasPronouns && actor?.pronouns ? actor.pronouns : null;
  const hasAny = hasNames || hasPronouns || !!bskyPronouns;
  const names = allNames.slice(0, MAX_NAMES);
  const extraNames = allNames.length - names.length;
  const pronouns = allPronouns.slice(0, MAX_PRONOUNS);
  const extraPronouns = allPronouns.length - pronouns.length;
  const tag = (bg, border, text, label, bold) => createElement(
    "div",
    {
      style: {
        display: "flex",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 10,
        padding: "9px 22px",
        fontSize: 23,
        fontWeight: bold ? 600 : 400,
        color: text
      }
    },
    label
  );
  const png = await renderOgImage(
    createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: `${OG_SIZE.width}px`,
          height: `${OG_SIZE.height}px`,
          background: C.bg,
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden"
        }
      },
      createElement("div", {
        style: {
          position: "absolute",
          top: -160,
          right: -160,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(136,57,239,0.28) 0%, transparent 65%)"
        }
      }),
      createElement("div", {
        style: {
          position: "absolute",
          bottom: -100,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(136,57,239,0.12) 0%, transparent 65%)"
        }
      }),
      createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }
        },
        // Left column: avatar + identity
        createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 252,
              flexShrink: 0,
              gap: 20,
              paddingRight: 48
            }
          },
          actor?.avatar ? createElement("img", {
            src: toJpegUrl(actor.avatar),
            alt: displayName,
            width: 120,
            height: 120,
            style: { borderRadius: "50%", border: `3px solid ${C.border}` }
          }) : createElement("div", {
            style: {
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
              color: C.text
            }
          }),
          createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 } },
            createElement("div", { style: { fontSize: 28, fontWeight: 600, color: C.text, textAlign: "center", lineHeight: 1.2 } }, displayName),
            createElement("div", { style: { fontSize: 16, color: C.muted } }, `@${displayHandle}`)
          )
        ),
        createElement("div", {
          style: { width: 1, height: 156, alignSelf: "center", background: C.border, opacity: 0.35, flexShrink: 0 }
        }),
        // Right column: names + pronouns
        createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", width: 580, paddingLeft: 56, gap: 32 } },
          hasNames && createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 14 } },
            createElement("div", { style: { fontSize: 11, fontWeight: 600, color: C.dim, letterSpacing: 2.5, textTransform: "uppercase" } }, "Names"),
            createElement(
              "div",
              { style: { display: "flex", flexWrap: "wrap", gap: 10 } },
              ...names.map(
                (name, i) => tag(
                  allPreferredNames.includes(name) ? C.accentFill : C.surface,
                  allPreferredNames.includes(name) ? C.accentRing : C.border,
                  C.text,
                  name,
                  allPreferredNames.includes(name)
                )
              ),
              extraNames > 0 && tag(C.surface, C.border, C.dim, `+${extraNames}`, false)
            )
          ),
          (hasPronouns || bskyPronouns) && createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 14 } },
            createElement("div", { style: { fontSize: 11, fontWeight: 600, color: C.dim, letterSpacing: 2.5, textTransform: "uppercase" } }, "Pronouns"),
            createElement(
              "div",
              { style: { display: "flex", flexWrap: "wrap", gap: 10 } },
              hasPronouns ? [
                ...pronouns.map(
                  (p) => tag(
                    allPreferredPronouns.includes(p) ? C.accentFill : C.surface,
                    allPreferredPronouns.includes(p) ? C.accentRing : C.border,
                    C.text,
                    p,
                    allPreferredPronouns.includes(p)
                  )
                ),
                extraPronouns > 0 && tag(C.surface, C.border, C.dim, `+${extraPronouns}`, false)
              ] : [tag(C.surface, C.border, C.muted, bskyPronouns, false)]
            )
          ),
          !hasAny && createElement("div", { style: { fontSize: 22, color: C.dim } }, "No names or pronouns set yet")
        )
      ),
      // Watermark
      createElement(
        "div",
        {
          style: {
            position: "absolute",
            bottom: 26,
            right: 44,
            display: "flex",
            alignItems: "center",
            gap: 8,
            opacity: 0.45
          }
        },
        logo && createElement("img", { src: logo, alt: "", width: 20, height: 20 }),
        createElement("div", { style: { fontSize: 14, color: C.muted } }, "pronouns.blue")
      )
    )
  );
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
