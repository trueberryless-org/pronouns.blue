import { c as createComponent } from './astro-component_Ci2BsCNc.mjs';
import { U as renderTemplate } from './params-and-props_CGkvChX8.mjs';
import { r as renderComponent } from './server_ByVkxL6M.mjs';
import { H as HeartIcon, n as navigate, $ as $$BaseLayout } from './HeartIcon_BXK0kP2Z.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useSyncExternalStore, useState, useRef, useEffect } from 'react';
import { g as getActorProfile } from './profiles_BoBmfCD2.mjs';
import { g as getProfileRecordsFromPds } from './records_BqEqK-mF.mjs';

function subscribe() {
  return () => {
  };
}
function getDidPublic() {
  const match = document.cookie.match(/(?:^|;\s*)did-public=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
function EditIcon() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", className: "h-4 w-4", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("path", { d: "M12 20h9" }),
    /* @__PURE__ */ jsx("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" })
  ] });
}
function ProfileEditButton({ profileDid }) {
  const userDid = useSyncExternalStore(subscribe, getDidPublic, () => null);
  if (userDid?.toLowerCase() !== profileDid.toLowerCase()) return null;
  return /* @__PURE__ */ jsx("div", { className: "mb-4 flex justify-end", children: /* @__PURE__ */ jsx("a", { href: "/settings", className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]", "aria-label": "Edit your names and pronouns", title: "Edit profile", children: /* @__PURE__ */ jsx(EditIcon, {}) }) });
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
  return /* @__PURE__ */ jsx(
    "svg",
    {
      role: "img",
      viewBox: "0 0 24 24",
      className,
      fill: "currentColor",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx("path", { d: "M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026" })
    }
  );
}
function Avatar({ src, label }) {
  if (src) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "h-24 w-24 rounded-full border border-[var(--border)] bg-cover bg-center",
        style: { backgroundImage: `url(${src})` },
        role: "img",
        "aria-label": label
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className: "flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-3xl font-semibold text-[var(--text)]", children: label.slice(0, 1).toUpperCase() });
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
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold uppercase tracking-wide text-[var(--muted)]", children: label }),
      isFallback && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 rounded-full border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-[var(--muted)]", children: [
        /* @__PURE__ */ jsx(BlueskyIcon, { className: "h-2.5 w-2.5" }),
        "from Bluesky"
      ] })
    ] }),
    /* @__PURE__ */ jsx("ul", { children: effectiveItems.map((item) => /* @__PURE__ */ jsxs(
      "li",
      {
        className: "flex items-center justify-between border-b border-[var(--line)] py-2 text-base text-[var(--text)]",
        children: [
          /* @__PURE__ */ jsx("span", { children: item }),
          preferred.includes(item) && /* @__PURE__ */ jsx("span", { title: "Preferred", children: /* @__PURE__ */ jsx(HeartIcon, { filled: true, className: "h-5 w-5 text-[var(--danger)]" }) })
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
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    showLangLabel && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs font-medium text-[var(--muted)]", children: langLabel(group.lang) }),
      /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-[var(--line)]" })
    ] }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `grid gap-6 ${hasNames && hasPronouns ? "md:grid-cols-2" : ""}`,
        children: [
          hasNames && /* @__PURE__ */ jsx(
            EntryColumn,
            {
              label: "Names",
              items: group.names,
              preferred: group.preferredNames
            }
          ),
          hasPronouns && /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx("main", { className: "mx-auto w-full max-w-3xl flex-1 min-h-screen px-4 pt-12 pb-16 sm:pt-16", children: /* @__PURE__ */ jsxs("section", { className: "w-full py-4", children: [
    props.profileDid && /* @__PURE__ */ jsx(ProfileEditButton, { profileDid: props.profileDid }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsx(Avatar, { src: props.avatar, label: props.title }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-3xl font-bold text-[var(--text)]", children: props.title }),
      /* @__PURE__ */ jsxs("p", { className: "mt-1 flex items-center gap-2 text-base text-[var(--muted)]", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "@",
          props.handle
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `https://bsky.app/profile/${props.handle}`,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": "View on Bluesky",
            title: "View on Bluesky",
            className: "translate-y-0.3 text-[var(--muted)] transition-colors hover:text-[var(--accent)]",
            children: /* @__PURE__ */ jsx(BlueskyIcon, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    hasAny ? /* @__PURE__ */ jsx("div", { className: "space-y-8", children: activeGroups.map((group) => /* @__PURE__ */ jsx(
      LanguageGroupSection,
      {
        group,
        showLangLabel: showLangLabels
      },
      group.lang
    )) }) : hasBskyPronouns ? /* @__PURE__ */ jsx("div", { className: "grid gap-6", children: /* @__PURE__ */ jsx(
      EntryColumn,
      {
        label: "Pronouns",
        items: [],
        preferred: [],
        bskyFallback: props.bskyFallbackPronouns
      }
    ) }) : /* @__PURE__ */ jsx("p", { className: "text-center text-[var(--muted)]", children: "This user hasn't set any names or pronouns yet." })
  ] }) });
}

function FollowCard({ handle, displayName, avatar }) {
  const label = displayName ?? handle;
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href: `/profile/${encodeURIComponent(handle)}`,
      onClick: (e) => {
        e.preventDefault();
        void navigate();
      },
      className: "group flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center transition-colors hover:border-[var(--accent)]",
      children: [
        avatar ? /* @__PURE__ */ jsx("div", { className: "h-12 w-12 flex-shrink-0 rounded-full border border-[var(--border)] bg-cover bg-center", style: { backgroundImage: `url(${avatar})` }, role: "img", "aria-label": label }) : /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-lg font-semibold text-[var(--text)]", children: label.slice(0, 1).toUpperCase() }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 w-full", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium text-[var(--text)] transition-colors group-hover:text-[var(--accent)]", children: label }),
          /* @__PURE__ */ jsxs("p", { className: "truncate text-xs text-[var(--muted)]", children: [
            "@",
            handle
          ] })
        ] })
      ]
    }
  );
}
function CardSkeleton() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "h-12 w-12 animate-pulse rounded-full bg-[var(--surface-strong)]" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full space-y-1.5", children: [
      /* @__PURE__ */ jsx("div", { className: "h-3 animate-pulse rounded bg-[var(--surface-strong)]" }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto h-3 w-3/4 animate-pulse rounded bg-[var(--surface-strong)]" })
    ] })
  ] });
}
const SKELETON_COUNT = 12;
const PAGE_LIMIT = 48;
function FollowsGrid({ initialFollows, initialCursor, did }) {
  const [follows, setFollows] = useState(initialFollows);
  const [hasMore, setHasMore] = useState(Boolean(initialCursor));
  const [loading, setLoading] = useState(false);
  const cursorRef = useRef(initialCursor);
  const loadingRef = useRef(false);
  const retryAfterRef = useRef(0);
  const sentinelRef = useRef(null);
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting || loadingRef.current || !cursorRef.current) return;
        if (Date.now() < retryAfterRef.current) return;
        loadingRef.current = true;
        setLoading(true);
        try {
          const params = new URLSearchParams({ actor: did, cursor: cursorRef.current, limit: String(PAGE_LIMIT) });
          const res = await fetch(`/api/follows?${params}`);
          if (!res.ok) {
            retryAfterRef.current = Date.now() + 3e3;
            return;
          }
          const data = await res.json();
          setFollows((prev) => [...prev, ...data.follows]);
          cursorRef.current = data.cursor;
          setHasMore(Boolean(data.cursor));
        } catch {
          retryAfterRef.current = Date.now() + 3e3;
        } finally {
          loadingRef.current = false;
          setLoading(false);
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [did]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4", children: [
      follows.map((actor) => /* @__PURE__ */ jsx(FollowCard, { handle: actor.handle, displayName: actor.displayName, avatar: actor.avatar }, actor.did)),
      loading && Array.from({ length: SKELETON_COUNT }).map((_, i) => /* @__PURE__ */ jsx(CardSkeleton, {}, i))
    ] }),
    hasMore && /* @__PURE__ */ jsx("div", { ref: sentinelRef, className: "mt-8 h-px" }),
    !hasMore && follows.length > 0 && /* @__PURE__ */ jsx("p", { className: "mt-8 text-center text-xs text-[var(--muted)]", children: "All caught up ✓" })
  ] });
}

function FollowsSection({ did, title }) {
  const [follows, setFollows] = useState(null);
  const [cursor, setCursor] = useState(void 0);
  useEffect(() => {
    fetch(`/api/follows?actor=${encodeURIComponent(did)}&limit=48`).then((r) => r.json()).then((data) => {
      setFollows(data.follows);
      setCursor(data.cursor);
    }).catch(() => setFollows([]));
  }, [did]);
  if (follows === null) return /* @__PURE__ */ jsx(FollowsSkeleton, {});
  if (follows.length === 0) return null;
  return /* @__PURE__ */ jsx("section", { className: "mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "border-t border-[var(--border)] pt-10", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-1 text-lg font-semibold text-[var(--text)]", children: "More to explore" }),
    /* @__PURE__ */ jsxs("p", { className: "mb-6 text-sm text-[var(--muted)]", children: [
      "People ",
      title,
      " follows on Bluesky"
    ] }),
    /* @__PURE__ */ jsx(FollowsGrid, { initialFollows: follows, initialCursor: cursor, did })
  ] }) });
}
function FollowsSkeleton() {
  return /* @__PURE__ */ jsx("section", { className: "mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "border-t border-[var(--border)] pt-10", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-1 h-6 w-40 animate-pulse rounded-md bg-[var(--surface-strong)]" }),
    /* @__PURE__ */ jsx("div", { className: "mb-6 h-4 w-56 animate-pulse rounded-md bg-[var(--surface-strong)]" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-12 w-12 animate-pulse rounded-full bg-[var(--surface-strong)]" }),
      /* @__PURE__ */ jsxs("div", { className: "w-full space-y-1.5", children: [
        /* @__PURE__ */ jsx("div", { className: "h-3 animate-pulse rounded bg-[var(--surface-strong)]" }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto h-3 w-3/4 animate-pulse rounded bg-[var(--surface-strong)]" })
      ] })
    ] }, i)) })
  ] }) });
}

function FloatingProfileBack({ title, avatar }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.65);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-hidden": !visible,
      className: `fixed bottom-6 right-6 z-30 flex overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-lg shadow-black/10 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`,
      children: [
        /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }), title: "Back to profile", "aria-label": `Scroll back to ${title}'s profile`, className: "flex items-center gap-2 py-2 pl-2 pr-3 transition-colors hover:bg-[var(--surface-strong)]", children: [
          avatar ? /* @__PURE__ */ jsx("span", { className: "h-8 w-8 flex-shrink-0 rounded-full border border-[var(--border)] bg-cover bg-center", style: { backgroundImage: `url(${avatar})` }, role: "img", "aria-label": title }) : /* @__PURE__ */ jsx("span", { className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-sm font-semibold text-[var(--text)]", children: title.slice(0, 1).toUpperCase() }),
          /* @__PURE__ */ jsx("span", { className: "max-w-28 truncate text-sm font-medium text-[var(--text)]", children: title }),
          /* @__PURE__ */ jsx("span", { className: "text-[var(--muted)]", children: /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", className: "h-3.5 w-3.5", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "m18 15-6-6-6 6" }) }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "my-2 w-px bg-[var(--border)]" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: () => window.history.back(), title: "Go back", "aria-label": "Go back to previous page", className: "flex items-center px-3 text-[var(--muted)] transition-colors hover:bg-[var(--surface-strong)] hover:text-[var(--text)]", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", className: "h-3.5 w-3.5", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx("path", { d: "M19 12H5" }),
          /* @__PURE__ */ jsx("path", { d: "m12 19-7-7 7-7" })
        ] }) })
      ]
    }
  );
}

const $$handle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$handle;
  const { handle: rawHandle } = Astro2.params;
  const handle = decodeURIComponent(rawHandle ?? "").replace(/^@/, "");
  const actor = await getActorProfile(handle);
  if (!actor) return Astro2.redirect("/404");
  const profile = await getProfileRecordsFromPds(actor.did);
  const title = actor.displayName ?? actor.handle;
  const description = `View ${title}'s preferred names and pronouns on pronouns.blue`;
  const ogImageUrl = new URL(`/profile/${encodeURIComponent(handle)}/og.png`, Astro2.url).toString();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${title} – pronouns.blue`, "description": description, "ogImage": ogImageUrl }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ProfileDisplay", ProfileDisplay, { "client:load": true, "title": title, "handle": actor.handle, "avatar": actor.avatar ?? null, "groups": profile.groups, "bskyFallbackPronouns": actor.pronouns, "profileDid": actor.did, "client:component-hydration": "load", "client:component-path": "@/components/ProfileDisplay", "client:component-export": "ProfileDisplay" })} ${renderComponent($$result2, "FollowsSection", FollowsSection, { "client:load": true, "did": actor.did, "title": title, "client:component-hydration": "load", "client:component-path": "@/components/FollowsSection", "client:component-export": "FollowsSection" })} ${renderComponent($$result2, "FloatingProfileBack", FloatingProfileBack, { "client:load": true, "title": title, "avatar": actor.avatar ?? null, "client:component-hydration": "load", "client:component-path": "@/components/FloatingProfileBack", "client:component-export": "FloatingProfileBack" })} ` })}`;
}, "/Users/trueberryless/repos/trueberryless-org/pronouns.blue/src/pages/profile/[handle].astro", void 0);

const $$file = "/Users/trueberryless/repos/trueberryless-org/pronouns.blue/src/pages/profile/[handle].astro";
const $$url = "/profile/[handle]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$handle,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
