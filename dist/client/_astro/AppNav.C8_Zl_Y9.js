globalThis.process ??= {}; globalThis.process.env ??= {};
import { j as jsxRuntimeExports } from './jsx-runtime.DoH26EBh.js';
import { r as reactExports } from './index.vKXFspdw.js';

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

export { AppNav };
