globalThis.process ??= {}; globalThis.process.env ??= {};
import { j as jsxRuntimeExports } from './jsx-runtime.DoH26EBh.js';
import { r as reactExports } from './index.vKXFspdw.js';
import { s as subscribeToCookies, g as getDidPublicCookie } from './client-cookie.aXwEpH1R.js';

function PrivacyUserSection() {
  const did = reactExports.useSyncExternalStore(
    subscribeToCookies,
    getDidPublicCookie,
    () => null
  );
  if (!did) return null;
  const pronounHref = `https://pdsls.dev/at://${did}/blue.pronouns.pronoun`;
  const nameHref = `https://pdsls.dev/at://${did}/blue.pronouns.name`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-xl font-semibold text-[var(--text)]", children: "View your records in PDSLS" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[var(--muted)]", children: [
      "Since you are signed in, you can inspect your published lexicon records directly in",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "https://pdsls.dev",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-[var(--accent)] underline underline-offset-4",
          children: "PDSLS"
        }
      ),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: pronounHref,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
          children: "blue.pronouns.pronoun"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: nameHref,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
          children: "blue.pronouns.name"
        }
      )
    ] })
  ] });
}

export { PrivacyUserSection };
