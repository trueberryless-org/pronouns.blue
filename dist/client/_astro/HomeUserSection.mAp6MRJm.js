globalThis.process ??= {}; globalThis.process.env ??= {};
import { j as jsxRuntimeExports } from './jsx-runtime.DoH26EBh.js';
import { r as reactExports } from './index.vKXFspdw.js';

function HomeUserSection() {
  const [user, setUser] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)did-public=([^;]+)/);
    if (!match) {
      Promise.resolve().then(() => setUser(null));
      return;
    }
    const did = decodeURIComponent(match[1]);
    fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${did}`
    ).then((r) => r.json()).then(
      (p) => setUser({
        did,
        handle: p.handle ?? null,
        displayName: p.displayName ?? null,
        avatar: p.avatar ?? null
      })
    ).catch(() => setUser(null));
  }, []);
  if (!user) return null;
  const profileHref = user.handle ? `/profile/${encodeURIComponent(user.handle.replace(/^@/, ""))}` : "/settings";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: "/settings",
        className: "rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-[var(--text)]", children: "Set pronouns and names" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-[var(--muted)]", children: "Update your profile entries and preferred options." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: profileHref,
        className: "rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            user.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "h-12 w-12 rounded-full border border-[var(--border)] bg-cover bg-center",
                style: { backgroundImage: `url(${user.avatar})` },
                role: "img",
                "aria-label": user.displayName ?? user.handle ?? void 0
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-lg font-semibold text-[var(--text)]", children: (user.displayName ?? user.handle ?? "U").slice(0, 1).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-lg font-semibold text-[var(--text)]", children: user.displayName ?? user.handle ?? user.did }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-sm text-[var(--muted)]", children: [
                "@",
                user.handle ?? user.did
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-[var(--muted)]", children: "View your profile" })
        ]
      }
    )
  ] });
}

export { HomeUserSection };
