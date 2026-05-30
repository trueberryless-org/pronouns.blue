globalThis.process ??= {}; globalThis.process.env ??= {};
import { j as jsxRuntimeExports } from './jsx-runtime.DoH26EBh.js';
import { H as HeartIcon } from './HeartIcon.Bff4aTeb.js';
import { r as reactExports } from './index.vKXFspdw.js';
import { s as subscribeToCookies, g as getDidPublicCookie } from './client-cookie.aXwEpH1R.js';

function EditIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: "h-4 w-4",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 20h9" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" })
      ]
    }
  );
}
function ProfileEditButton({ profileDid }) {
  const userDid = reactExports.useSyncExternalStore(
    subscribeToCookies,
    getDidPublicCookie,
    () => null
  );
  if (userDid?.toLowerCase() !== profileDid.toLowerCase()) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "a",
    {
      href: "/settings",
      className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
      "aria-label": "Edit your names and pronouns",
      title: "Edit profile",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(EditIcon, {})
    }
  ) });
}

const LANG_NAMES = new Intl.DisplayNames(["en"], { type: "language" });
function langLabel(tag) {
  try {
    return LANG_NAMES.of(tag) ?? tag;
  } catch {
    return tag;
  }
}
function BlueskyIcon({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      role: "img",
      viewBox: "0 0 24 24",
      className,
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026" })
    }
  );
}
function Avatar({ src, label }) {
  if (src) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-24 w-24 rounded-full border border-[var(--border)] bg-cover bg-center",
        style: { backgroundImage: `url(${src})` },
        role: "img",
        "aria-label": label
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-3xl font-semibold text-[var(--text)]", children: label.slice(0, 1).toUpperCase() });
}
function EntryColumn({
  label,
  items,
  preferred,
  bskyFallback
}) {
  const isFallback = items.length === 0 && !!bskyFallback;
  const effectiveItems = isFallback ? [bskyFallback] : items;
  if (effectiveItems.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wide text-[var(--muted)]", children: label }),
      isFallback && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded-full border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-[var(--muted)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BlueskyIcon, { className: "h-2.5 w-2.5" }),
        "from Bluesky"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: effectiveItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex items-center justify-between border-b border-[var(--line)] py-2 text-base text-[var(--text)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item }),
          preferred.includes(item) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Preferred", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeartIcon, { filled: true, className: "h-5 w-5 text-[var(--danger)]" }) })
        ]
      },
      item
    )) })
  ] });
}
function LanguageGroupSection({
  group,
  showLangLabel
}) {
  const hasNames = group.names.length > 0;
  const hasPronouns = group.pronouns.length > 0;
  if (!hasNames && !hasPronouns) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    showLangLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs font-medium text-[var(--muted)]", children: langLabel(group.lang) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-[var(--line)]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `grid gap-6 ${hasNames && hasPronouns ? "md:grid-cols-2" : ""}`,
        children: [
          hasNames && /* @__PURE__ */ jsxRuntimeExports.jsx(
            EntryColumn,
            {
              label: "Names",
              items: group.names,
              preferred: group.preferredNames
            }
          ),
          hasPronouns && /* @__PURE__ */ jsxRuntimeExports.jsx(
            EntryColumn,
            {
              label: "Pronouns",
              items: group.pronouns,
              preferred: group.preferredPronouns
            }
          )
        ]
      }
    )
  ] });
}
function ProfileDisplay(props) {
  const activeGroups = props.groups.filter(
    (g) => g.names.length > 0 || g.pronouns.length > 0
  );
  const hasAny = activeGroups.length > 0;
  const hasBskyPronouns = !hasAny && !!props.bskyFallbackPronouns;
  const showLangLabels = activeGroups.length > 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto w-full max-w-3xl flex-1 min-h-screen px-4 pt-12 pb-16 sm:pt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "w-full py-4", children: [
    props.profileDid && /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileEditButton, { profileDid: props.profileDid }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { src: props.avatar, label: props.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-3xl font-bold text-[var(--text)]", children: props.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-2 text-base text-[var(--muted)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "@",
          props.handle
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://bsky.app/profile/${props.handle}`,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "View on Bluesky",
            title: "View on Bluesky",
            className: "translate-y-0.3 text-[var(--muted)] transition-colors hover:text-[var(--accent)]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlueskyIcon, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    hasAny ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: activeGroups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      LanguageGroupSection,
      {
        group,
        showLangLabel: showLangLabels
      },
      group.lang
    )) }) : hasBskyPronouns ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EntryColumn,
      {
        label: "Pronouns",
        items: [],
        preferred: [],
        bskyFallback: props.bskyFallbackPronouns
      }
    ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[var(--muted)]", children: "This user hasn't set any names or pronouns yet." })
  ] }) });
}

export { ProfileDisplay };
