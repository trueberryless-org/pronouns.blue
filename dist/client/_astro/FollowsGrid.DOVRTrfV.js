globalThis.process ??= {}; globalThis.process.env ??= {};
import { j as jsxRuntimeExports } from './jsx-runtime.DoH26EBh.js';
import { r as reactExports } from './index.vKXFspdw.js';

function FollowCard({
  handle,
  displayName,
  avatar
}) {
  const label = displayName ?? handle;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: `/profile/${encodeURIComponent(handle)}`,
      className: "group flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center transition-colors hover:border-[var(--accent)]",
      children: [
        avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-12 w-12 flex-shrink-0 rounded-full border border-[var(--border)] bg-cover bg-center",
            style: { backgroundImage: `url(${avatar})` },
            role: "img",
            "aria-label": label
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-lg font-semibold text-[var(--text)]", children: label.slice(0, 1).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium text-[var(--text)] transition-colors group-hover:text-[var(--accent)]", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-xs text-[var(--muted)]", children: [
            "@",
            handle
          ] })
        ] })
      ]
    }
  );
}
function CardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 animate-pulse rounded-full bg-[var(--surface-strong)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 animate-pulse rounded bg-[var(--surface-strong)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-3 w-3/4 animate-pulse rounded bg-[var(--surface-strong)]" })
    ] })
  ] });
}
const SKELETON_COUNT = 12;
const PAGE_LIMIT = 48;
function FollowsGrid({
  initialFollows,
  initialCursor,
  did
}) {
  const [follows, setFollows] = reactExports.useState(initialFollows);
  const [hasMore, setHasMore] = reactExports.useState(Boolean(initialCursor));
  const [loading, setLoading] = reactExports.useState(false);
  const cursorRef = reactExports.useRef(initialCursor);
  const loadingRef = reactExports.useRef(false);
  const retryAfterRef = reactExports.useRef(0);
  const sentinelRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting || loadingRef.current || !cursorRef.current)
          return;
        if (Date.now() < retryAfterRef.current) return;
        loadingRef.current = true;
        setLoading(true);
        try {
          const APPVIEW = "https://public.api.bsky.app";
          const params = new URLSearchParams({
            actor: did,
            cursor: cursorRef.current,
            limit: String(PAGE_LIMIT)
          });
          const res = await fetch(
            `${APPVIEW}/xrpc/app.bsky.graph.getFollows?${params}`
          );
          if (!res.ok) {
            retryAfterRef.current = Date.now() + 3e3;
            return;
          }
          const data = await res.json();
          setFollows((prev) => [
            ...prev,
            ...data.follows.map((f) => ({
              did: f.did,
              handle: f.handle,
              displayName: f.displayName ?? null,
              avatar: f.avatar ?? null
            }))
          ]);
          cursorRef.current = data.cursor;
          setHasMore(Boolean(data.cursor));
        } catch {
          retryAfterRef.current = Date.now() + 3e3;
        } finally {
          loadingRef.current = false;
          setLoading(false);
        }
      },
      // Start fetching before the sentinel enters the viewport so cards appear
      // before the user scrolls all the way to the bottom.
      { rootMargin: "400px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [did]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4", children: [
      follows.map((actor) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        FollowCard,
        {
          handle: actor.handle,
          displayName: actor.displayName,
          avatar: actor.avatar
        },
        actor.did
      )),
      loading && Array.from({ length: SKELETON_COUNT }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, i))
    ] }),
    hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: sentinelRef, className: "mt-8 h-px" }),
    !hasMore && follows.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-center text-xs text-[var(--muted)]", children: "All caught up ✓" })
  ] });
}

export { FollowsGrid };
