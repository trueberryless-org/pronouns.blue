globalThis.process ??= {}; globalThis.process.env ??= {};
import { j as jsxRuntimeExports } from './jsx-runtime.DoH26EBh.js';
import { r as reactExports } from './index.vKXFspdw.js';

function HandleSearch() {
  const [query, setQuery] = reactExports.useState("");
  const [suggestions, setSuggestions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const containerRef = reactExports.useRef(null);
  const normalizedQuery = reactExports.useMemo(() => query.trim(), [query]);
  reactExports.useEffect(() => {
    function handleMouseDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") setSuggestions([]);
    }
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  reactExports.useEffect(() => {
    if (!normalizedQuery) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    const APPVIEW = "https://public.api.bsky.app";
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${APPVIEW}/xrpc/app.bsky.actor.searchActors?q=${encodeURIComponent(normalizedQuery)}&limit=8`,
          { signal: controller.signal }
        );
        if (!response.ok) return;
        const data = await response.json();
        setSuggestions(
          (data.actors ?? []).map((a) => ({
            did: a.did,
            handle: a.handle,
            displayName: a.displayName ?? null,
            avatar: a.avatar ?? null
          }))
        );
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 120);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [normalizedQuery]);
  function openHandle(handle) {
    window.location.href = `/profile/${handle}`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-full max-w-2xl", ref: containerRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        value: query,
        onChange: (event) => setQuery(event.target.value.replace(/^@/, "")),
        onKeyDown: (event) => {
          if (event.key === "Enter" && normalizedQuery) {
            openHandle(normalizedQuery);
          }
        },
        placeholder: "Search handle (for example: trueberryless.org)",
        className: "min-h-14 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-lg text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
      }
    ),
    (loading || suggestions.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 top-16 z-20 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-2 text-sm text-[var(--muted)]", children: "Searching…" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "max-h-72 overflow-auto", children: suggestions.map((suggestion) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => openHandle(suggestion.handle),
        className: "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-[var(--surface-strong)]",
        children: [
          suggestion.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: suggestion.avatar,
              alt: "",
              loading: "lazy",
              width: 36,
              height: 36,
              className: "size-9 shrink-0 rounded-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-strong)] text-sm font-semibold text-[var(--text)]", children: (suggestion.displayName ?? suggestion.handle).charAt(0).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm font-medium text-[var(--text)]", children: suggestion.displayName ?? suggestion.handle }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate text-xs text-[var(--muted)]", children: [
              "@",
              suggestion.handle
            ] })
          ] })
        ]
      }
    ) }, suggestion.did)) }) })
  ] });
}

export { HandleSearch };
