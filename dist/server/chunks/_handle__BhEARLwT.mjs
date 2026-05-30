globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createComponent } from "./astro-component_CxCYgq1g.mjs";
import { j as createRenderInstruction, i as addAttribute, t as renderTemplate, r as reactExports, s as renderSlot, p as renderComponent, v as unescapeHTML, q as renderHead, n as maybeRenderHead } from "./worker-entry_gMPfSA4_.mjs";
import { g as getActorProfile } from "./profiles_CDCZdndc.mjs";
import { g as getProfileRecordsFromPds } from "./records_Dm89wn-w.mjs";
async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}<\/script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/trueberryless/repos/trueberryless-org/pronouns.blue/node_modules/.pnpm/astro@6.4.2_@types+node@24.12.2_tsx@4.21.0/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/trueberryless/repos/trueberryless-org/pronouns.blue/node_modules/.pnpm/astro@6.4.2_@types+node@24.12.2_tsx@4.21.0/node_modules/astro/components/ClientRouter.astro", void 0);
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_production.jsx = jsxProd;
  reactJsxRuntime_production.jsxs = jsxProd;
  return reactJsxRuntime_production;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  {
    jsxRuntime.exports = requireReactJsxRuntime_production();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
const STORAGE_KEY = "pronounsblue-theme";
const THEMES = ["light", "dark", "black"];
const THEME_EVENT = "pronounsblue-theme-change";
function getThemeSnapshot() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && THEMES.includes(saved)) return saved;
  const attr = document.documentElement.getAttribute(
    "data-theme"
  );
  if (attr && THEMES.includes(attr)) return attr;
  return "dark";
}
function subscribeToTheme(callback) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT));
}
function ThemeToggle() {
  const theme = reactExports.useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => "dark"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm text-[var(--muted)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Theme" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "select",
      {
        value: theme,
        onChange: (event) => {
          const nextTheme = event.target.value;
          if (!THEMES.includes(nextTheme)) return;
          setTheme(nextTheme);
        },
        className: "min-h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm capitalize text-[var(--text)]",
        children: THEMES.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option, children: option }, option))
      }
    )
  ] });
}
function getPathname() {
  return typeof window !== "undefined" ? window.location.pathname : "/";
}
function subscribe(cb) {
  window.addEventListener("popstate", cb);
  return () => window.removeEventListener("popstate", cb);
}
function NavLogo() {
  const pathname = reactExports.useSyncExternalStore(subscribe, getPathname, () => "/");
  if (pathname === "/") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: "/pronouns.blue.png",
      alt: "pronouns.blue",
      width: 966,
      height: 396,
      className: "h-14 w-auto",
      style: { viewTransitionName: "site-logo" },
      loading: "eager"
    }
  ) });
}
function SearchIcon({ className = "h-5 w-5" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      className,
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m21 21-4.3-4.3" })
      ]
    }
  );
}
function SearchModal() {
  const [open, setOpen] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const [suggestions, setSuggestions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const normalizedQuery = reactExports.useMemo(() => query.trim(), [query]);
  reactExports.useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  reactExports.useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);
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
  function closeModal() {
    setOpen(false);
    setQuery("");
    setSuggestions([]);
  }
  function openHandle(handle) {
    closeModal();
    window.location.href = `/profile/${handle}`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen(true),
        "aria-label": "Search handles (Ctrl+K)",
        className: "flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 text-[var(--muted)] outline-none transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SearchIcon, { className: "h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden text-sm sm:inline", children: "Search…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("kbd", { className: "hidden items-center gap-0.5 rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] leading-none lg:inline-flex", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "⌘" }),
            "K"
          ] })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[15vh] backdrop-blur-sm",
        onClick: (e) => {
          if (e.target === e.currentTarget) closeModal();
        },
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Search",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 border-b border-[var(--border)] px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SearchIcon, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: inputRef,
                value: query,
                onChange: (e) => setQuery(e.target.value.replace(/^@/, "")),
                onKeyDown: (e) => {
                  if (e.key === "Enter" && normalizedQuery) {
                    openHandle(normalizedQuery);
                  }
                  if (e.key === "Escape") closeModal();
                },
                placeholder: "Search handle…",
                className: "flex-1 bg-transparent text-base text-[var(--text)] placeholder-[var(--muted)] outline-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "inline-flex h-6 items-center rounded border border-[var(--border)] px-1.5 font-mono text-xs text-[var(--muted)]", children: "esc" })
          ] }),
          (loading || suggestions.length > 0 || normalizedQuery) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-72 overflow-auto p-2", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-2 text-sm text-[var(--muted)]", children: "Searching…" }) : suggestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "px-3 py-2 text-sm text-[var(--muted)]", children: [
            "No results for “",
            normalizedQuery,
            "”"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: suggestions.map((suggestion) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
        ] })
      }
    )
  ] });
}
function UserIcon() {
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 21a8 8 0 0 0-16 0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "8", r: "4" })
      ]
    }
  );
}
function LogoutIcon() {
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m16 17 5-5-5-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 12H9" })
      ]
    }
  );
}
function CogsIcon() {
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h.1a1.6 1.6 0 0 0 .9-1.4V3a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 1 1.5h.1a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.4.9h.2a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.5 1Z" })
      ]
    }
  );
}
function AuthNav({
  signedIn,
  did,
  handle,
  displayName,
  avatar
}) {
  const [loginHandle, setLoginHandle] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [open, setOpen] = reactExports.useState(false);
  const menuRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    function handleDocumentClick(event) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target)) setOpen(false);
    }
    if (!open) return;
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [open]);
  async function startLogin() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/oauth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle: loginHandle })
      });
      const data = await res.json();
      if (!res.ok || !data.redirectUrl) {
        throw new Error(data.error || "Login failed");
      }
      window.location.href = data.redirectUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }
  async function handleLogout() {
    await fetch("/oauth/logout", { method: "POST" });
    window.location.href = "/";
  }
  if (signedIn) {
    const label = displayName ?? handle ?? did ?? "profile";
    const normalizedHandle = handle?.replace(/^@/, "");
    const profileHref = normalizedHandle ? `/profile/${encodeURIComponent(normalizedHandle)}` : "/settings";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: menuRef, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setOpen((state) => !state),
          className: "flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-sm font-semibold text-[var(--text)] hover:border-[var(--accent)]",
          "aria-haspopup": "menu",
          "aria-expanded": open,
          "aria-label": "Open account menu",
          children: avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "h-full w-full bg-cover bg-center",
              style: { backgroundImage: `url(${avatar})` },
              role: "img",
              "aria-label": label
            }
          ) : label.slice(0, 1).toUpperCase()
        }
      ),
      open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          role: "menu",
          className: "absolute right-0 z-20 mt-2 min-w-44 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 shadow-md",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: profileHref,
                role: "menuitem",
                className: "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]",
                onClick: () => setOpen(false),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserIcon, {}),
                  "Profile"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "/settings",
                role: "menuitem",
                className: "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]",
                onClick: () => setOpen(false),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CogsIcon, {}),
                  "Settings"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                role: "menuitem",
                onClick: handleLogout,
                className: "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogoutIcon, {}),
                  "Log out"
                ]
              }
            )
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: loginHandle,
          onChange: (event) => setLoginHandle(event.target.value),
          onKeyDown: (event) => {
            if (event.key === "Enter" && loginHandle.trim() && !loading)
              startLogin();
          },
          placeholder: "handle.bsky.social",
          className: "min-h-10 w-48 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--text)]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          disabled: loading || !loginHandle.trim(),
          onClick: startLogin,
          className: "min-h-10 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)] disabled:opacity-50",
          children: loading ? "..." : "Log in / Sign up"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[var(--danger)]", children: error })
  ] });
}
function BurgerIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: "h-5 w-5",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" })
      ]
    }
  );
}
function XIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: "h-5 w-5",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
      ]
    }
  );
}
function MobileNav({
  signedIn,
  did,
  handle,
  displayName,
  avatar
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [loginHandle, setLoginHandle] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const menuRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    function handleDocumentClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (!open) return;
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [open]);
  async function startLogin() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/oauth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle: loginHandle })
      });
      const data = await res.json();
      if (!res.ok || !data.redirectUrl) {
        throw new Error(data.error ?? "Login failed");
      }
      window.location.href = data.redirectUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }
  async function handleLogout() {
    await fetch("/oauth/logout", { method: "POST" });
    window.location.href = "/";
  }
  const label = displayName ?? handle ?? did ?? "profile";
  const normalizedHandle = handle?.replace(/^@/, "");
  const profileHref = normalizedHandle ? `/profile/${encodeURIComponent(normalizedHandle)}` : "/settings";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative sm:hidden", ref: menuRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        "aria-label": open ? "Close menu" : "Open menu",
        "aria-expanded": open,
        "aria-haspopup": "menu",
        className: "flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]",
        children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(XIcon, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(BurgerIcon, {})
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        role: "menu",
        className: "absolute right-0 z-20 mt-2 min-w-56 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-[var(--border)] px-1 pb-3 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1.5 px-2 text-xs font-medium text-[var(--muted)]", children: "Theme" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
          ] }),
          signedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            avatar && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "h-7 w-7 flex-shrink-0 rounded-full bg-cover bg-center border border-[var(--border)]",
                  style: { backgroundImage: `url(${avatar})` },
                  role: "img",
                  "aria-label": label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm font-medium text-[var(--text)]", children: label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: profileHref,
                role: "menuitem",
                onClick: () => setOpen(false),
                className: "flex items-center rounded-md px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]",
                children: "Profile"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "/settings",
                role: "menuitem",
                onClick: () => setOpen(false),
                className: "flex items-center rounded-md px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]",
                children: "Settings"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                role: "menuitem",
                onClick: handleLogout,
                className: "flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]",
                children: "Log out"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 p-1 pt-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: loginHandle,
                onChange: (e) => setLoginHandle(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter" && loginHandle.trim() && !loading)
                    startLogin();
                },
                placeholder: "handle.bsky.social",
                className: "min-h-10 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--text)]"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                disabled: loading || !loginHandle.trim(),
                onClick: startLogin,
                className: "min-h-10 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)] disabled:opacity-50",
                children: loading ? "..." : "Log in / Sign up"
              }
            ),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[var(--danger)]", children: error })
          ] })
        ]
      }
    )
  ] });
}
function readDidPublicCookie() {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)did-public=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
function NavUser() {
  const [user, setUser] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const did = readDidPublicCookie();
    if (!did) {
      Promise.resolve().then(() => setUser(null));
      return;
    }
    fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${did}`
    ).then((r) => r.json()).then(
      (p) => setUser({
        did,
        handle: p.handle,
        displayName: p.displayName ?? null,
        avatar: p.avatar ?? null
      })
    ).catch(() => setUser(null));
  }, []);
  const signedIn = user !== void 0 && Boolean(user);
  const navProps = {
    signedIn,
    did: user?.did,
    handle: user?.handle,
    displayName: user?.displayName,
    avatar: user?.avatar
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden items-center sm:flex", children: user === void 0 ? (
      // Skeleton while auth state loads — matches the avatar button size
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 animate-pulse rounded-full bg-[var(--surface-strong)]" })
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AuthNav, { ...navProps }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MobileNav, { ...navProps })
  ] });
}
function AppNav() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mb-8 mt-4 border-b border-[var(--line)] pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex w-full max-w-6xl min-h-14 items-center gap-3 px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavLogo, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SearchModal, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden items-center gap-4 sm:flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavUser, {})
    ] })
  ] }) });
}
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "pronouns.blue",
    description = "Share your names and pronouns with the ATProto network.",
    ogImage = "/og/index.png"
  } = Astro2.props;
  const themeScript = `
(() => {
  try {
    const key = "pronounsblue-theme";
    const saved = localStorage.getItem(key);
    const theme = saved || "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-theme="dark"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>', '</title><meta name="description"', '><link rel="icon" type="image/svg+xml" href="/pronouns.blue-round.svg"><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:type" content="website"><meta name="twitter:card" content="summary_large_image">', "", '</head> <body class="flex min-h-screen flex-col antialiased"> <script>', "<\/script> ", ' <main class="flex flex-1 flex-col"> ', ' </main> <footer class="border-t border-[var(--border)] py-4 text-center text-xs text-[var(--muted)]"> <nav class="flex flex-wrap justify-center gap-x-5 gap-y-1"> <a href="/privacy" class="hover:text-[var(--text)]">Privacy Policy</a> <a href="/terms" class="hover:text-[var(--text)]">Terms of Service</a> <a href="/credits" class="hover:text-[var(--text)]">Credits</a> <a href="https://github.com/trueberryless-org/pronouns.blue" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--text)]">GitHub</a> </nav> </footer> </body></html>'])), title, addAttribute(description, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(ogImage, "content"), renderComponent($$result, "ClientRouter", $$ClientRouter, {}), renderHead(), unescapeHTML(themeScript), renderComponent($$result, "AppNav", AppNav, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/AppNav", "client:component-export": "AppNav" }), renderSlot($$result, $$slots["default"]));
}, "/Users/trueberryless/repos/trueberryless-org/pronouns.blue/src/layouts/Layout.astro", void 0);
function HeartIcon({
  filled,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
      className,
      fill: filled ? "currentColor" : "none",
      stroke: "currentColor",
      strokeWidth: 1.8,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 20.5C11.7 20.5 11.4 20.4 11.2 20.2L4.2 13.8C2.2 12 2 8.9 3.8 6.9C5.6 4.9 8.7 4.7 10.7 6.5L12 7.7L13.3 6.5C15.3 4.7 18.4 4.9 20.2 6.9C22 8.9 21.8 12 19.8 13.8L12.8 20.2C12.6 20.4 12.3 20.5 12 20.5Z" })
    }
  );
}
function subscribeToCookies() {
  return () => {
  };
}
function getDidPublicCookie() {
  const match = document.cookie.match(/(?:^|;\s*)did-public=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
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
function ChevronUpIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: "h-3.5 w-3.5",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m18 15-6-6-6 6" })
    }
  );
}
function ArrowLeftIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: "h-3.5 w-3.5",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19 12H5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m12 19-7-7 7-7" })
      ]
    }
  );
}
function FloatingProfileBack({
  title,
  avatar
}) {
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.65);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "aria-hidden": !visible,
      className: `fixed bottom-6 right-6 z-30 flex overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-lg shadow-black/10 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
            title: "Back to profile",
            "aria-label": `Scroll back to ${title}'s profile`,
            className: "flex items-center gap-2 py-2 pl-2 pr-3 transition-colors hover:bg-[var(--surface-strong)]",
            children: [
              avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "h-8 w-8 flex-shrink-0 rounded-full border border-[var(--border)] bg-cover bg-center",
                  style: { backgroundImage: `url(${avatar})` },
                  role: "img",
                  "aria-label": title
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-sm font-semibold text-[var(--text)]", children: title.slice(0, 1).toUpperCase() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-28 truncate text-sm font-medium text-[var(--text)]", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[var(--muted)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUpIcon, {}) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-2 w-px bg-[var(--border)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => window.history.back(),
            title: "Go back",
            "aria-label": "Go back to previous page",
            className: "flex items-center px-3 text-[var(--muted)] transition-colors hover:bg-[var(--surface-strong)] hover:text-[var(--text)]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeftIcon, {})
          }
        )
      ]
    }
  );
}
const prerender = false;
const $$handle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$handle;
  const { handle: rawHandle } = Astro2.params;
  const handle = decodeURIComponent(rawHandle ?? "").replace(/^@/, "");
  const actor = await getActorProfile(handle);
  if (!actor) {
    return Astro2.rewrite("/404");
  }
  const profile = await getProfileRecordsFromPds(actor.did);
  const title = actor.displayName ?? actor.handle;
  const followsRes = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.graph.getFollows?actor=${encodeURIComponent(actor.did)}&limit=48`
  ).then((r) => r.ok ? r.json() : { follows: [], cursor: void 0 });
  const initialFollows = followsRes.follows.map((f) => ({
    did: f.did,
    handle: f.handle,
    displayName: f.displayName ?? null,
    avatar: f.avatar ?? null
  }));
  const initialCursor = followsRes.cursor;
  Astro2.response.headers.set(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `@${actor.handle} – pronouns.blue`, "description": `View @${actor.handle}'s preferred names and pronouns on pronouns.blue`, "ogImage": `/og/profile/${actor.handle}.png` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ProfileDisplay", ProfileDisplay, { "title": title, "handle": actor.handle, "avatar": actor.avatar, "groups": profile.groups, "bskyFallbackPronouns": actor.pronouns, "profileDid": actor.did, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/ProfileDisplay", "client:component-export": "ProfileDisplay" })} ${initialFollows.length > 0 && renderTemplate`${maybeRenderHead()}<section class="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6"> <div class="border-t border-[var(--border)] pt-10"> <h2 class="mb-1 text-lg font-semibold text-[var(--text)]">More to explore</h2> <p class="mb-6 text-sm text-[var(--muted)]">
People ${title} follows on Bluesky
</p> ${renderComponent($$result2, "FollowsGrid", FollowsGrid, { "initialFollows": initialFollows, "initialCursor": initialCursor, "did": actor.did, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/FollowsGrid", "client:component-export": "FollowsGrid" })} </div> </section>`}${renderComponent($$result2, "FloatingProfileBack", FloatingProfileBack, { "title": title, "avatar": actor.avatar, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/FloatingProfileBack", "client:component-export": "FloatingProfileBack" })} ` })}`;
}, "/Users/trueberryless/repos/trueberryless-org/pronouns.blue/src/pages/profile/[handle].astro", void 0);
const $$file = "/Users/trueberryless/repos/trueberryless-org/pronouns.blue/src/pages/profile/[handle].astro";
const $$url = "/profile/[handle]";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$handle,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
