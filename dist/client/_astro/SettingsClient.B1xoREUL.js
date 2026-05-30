globalThis.process ??= {}; globalThis.process.env ??= {};
import { j as jsxRuntimeExports } from './jsx-runtime.DoH26EBh.js';
import { r as reactExports } from './index.vKXFspdw.js';
import { s as subscribeToCookies, g as getDidPublicCookie, a as getDidPublicCookieServer } from './client-cookie.aXwEpH1R.js';
import { H as HeartIcon } from './HeartIcon.Bff4aTeb.js';

const DEFAULT_LANG = "en";

const APPVIEW_URL = "https://public.api.bsky.app";
async function fetchActorProfile(actor) {
  try {
    const res = await fetch(
      `${APPVIEW_URL}/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(actor)}`
    );
    if (!res.ok) return null;
    const p = await res.json();
    return {
      did: p.did,
      handle: p.handle,
      displayName: p.displayName ?? null,
      avatar: p.avatar ?? null,
      pronouns: p.pronouns ?? null
    };
  } catch {
    return null;
  }
}
async function resolvePdsUrl(did) {
  try {
    let doc;
    if (did.startsWith("did:plc:")) {
      const res = await fetch(`https://plc.directory/${did}`);
      if (!res.ok) return null;
      doc = await res.json();
    } else if (did.startsWith("did:web:")) {
      const host = did.slice("did:web:".length);
      const res = await fetch(`https://${host}/.well-known/did.json`);
      if (!res.ok) return null;
      doc = await res.json();
    } else {
      return null;
    }
    const pds = doc.service?.find(
      (s) => s.type === "AtprotoPersonalDataServer"
    );
    return pds?.serviceEndpoint ?? null;
  } catch {
    return null;
  }
}
async function listAllRecords(pdsUrl, did, collection) {
  const records = [];
  let cursor;
  do {
    const url = new URL(`${pdsUrl}/xrpc/com.atproto.repo.listRecords`);
    url.searchParams.set("repo", did);
    url.searchParams.set("collection", collection);
    url.searchParams.set("limit", "100");
    if (cursor) url.searchParams.set("cursor", cursor);
    const res = await fetch(url.toString());
    if (!res.ok) break;
    const data = await res.json();
    records.push(...data.records);
    cursor = data.cursor;
  } while (cursor);
  return records;
}
function aggregateEntriesByLang(records) {
  const byLang = /* @__PURE__ */ new Map();
  for (const r of records) {
    let langMap = byLang.get(r.lang);
    if (!langMap) {
      langMap = /* @__PURE__ */ new Map();
      byLang.set(r.lang, langMap);
    }
    const key = r.value.toLocaleLowerCase();
    const cur = langMap.get(key);
    if (!cur || r.updatedAt > cur.updatedAt || r.updatedAt === cur.updatedAt && r.uri > cur.uri) {
      langMap.set(key, r);
    }
  }
  const result = /* @__PURE__ */ new Map();
  for (const [lang, langMap] of byLang) {
    const sorted = Array.from(langMap.values()).sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      if (a.updatedAt !== b.updatedAt)
        return a.updatedAt < b.updatedAt ? 1 : -1;
      return a.value.localeCompare(b.value);
    });
    result.set(lang, {
      values: sorted.map((e) => e.value),
      preferred: sorted.filter((e) => e.preferred).map((e) => e.value)
    });
  }
  return result;
}
async function fetchProfileRecords(did) {
  const pdsUrl = await resolvePdsUrl(did);
  if (!pdsUrl) return { groups: [] };
  const [nameRecords, pronounRecords] = await Promise.all([
    listAllRecords(pdsUrl, did, "blue.pronouns.name"),
    listAllRecords(pdsUrl, did, "blue.pronouns.pronoun")
  ]);
  const namesByLang = aggregateEntriesByLang(
    nameRecords.map((r) => ({
      uri: r.uri,
      value: r.value.value,
      preferred: r.value.preferred,
      lang: r.value.lang ?? DEFAULT_LANG,
      sortOrder: r.value.sortOrder ?? 0,
      updatedAt: r.value.updatedAt
    }))
  );
  const pronounsByLang = aggregateEntriesByLang(
    pronounRecords.map((r) => ({
      uri: r.uri,
      value: r.value.value,
      preferred: r.value.preferred,
      lang: r.value.lang ?? DEFAULT_LANG,
      sortOrder: r.value.sortOrder ?? 0,
      updatedAt: r.value.updatedAt
    }))
  );
  const allLangs = /* @__PURE__ */ new Set([
    ...namesByLang.keys(),
    ...pronounsByLang.keys()
  ]);
  const sortedLangs = [
    DEFAULT_LANG,
    ...Array.from(allLangs).filter((l) => l !== DEFAULT_LANG).sort()
  ].filter((l) => allLangs.has(l));
  const groups = sortedLangs.map((lang) => {
    const n = namesByLang.get(lang) ?? { values: [], preferred: [] };
    const p = pronounsByLang.get(lang) ?? { values: [], preferred: [] };
    return {
      lang,
      names: n.values,
      preferredNames: n.preferred,
      pronouns: p.values,
      preferredPronouns: p.preferred
    };
  });
  return { groups };
}

const COMMON_PRONOUNS = [
  "she/her",
  "he/him",
  "they/them",
  "she/they",
  "he/they",
  "xe/xem",
  "ze/zir",
  "fae/faer",
  "it/its",
  "any/all",
  "ask me",
  "name only"
];
const COMMON_LANGUAGES = [
  { tag: "en", label: "English" },
  { tag: "de", label: "Deutsch (German)" },
  { tag: "fr", label: "Français (French)" },
  { tag: "es", label: "Español (Spanish)" },
  { tag: "pt", label: "Português (Portuguese)" },
  { tag: "pt-BR", label: "Português (Brazil)" },
  { tag: "it", label: "Italiano (Italian)" },
  { tag: "nl", label: "Nederlands (Dutch)" },
  { tag: "pl", label: "Polski (Polish)" },
  { tag: "ru", label: "Русский (Russian)" },
  { tag: "uk", label: "Українська (Ukrainian)" },
  { tag: "cs", label: "Čeština (Czech)" },
  { tag: "sv", label: "Svenska (Swedish)" },
  { tag: "nb", label: "Norsk bokmål (Norwegian)" },
  { tag: "fi", label: "Suomi (Finnish)" },
  { tag: "ja", label: "日本語 (Japanese)" },
  { tag: "zh", label: "中文 (Chinese)" },
  { tag: "zh-CN", label: "中文 (Simplified)" },
  { tag: "zh-TW", label: "中文 (Traditional)" },
  { tag: "ko", label: "한국어 (Korean)" },
  { tag: "ar", label: "العربية (Arabic)" },
  { tag: "tr", label: "Türkçe (Turkish)" },
  { tag: "id", label: "Bahasa Indonesia" },
  { tag: "hi", label: "हिन्दी (Hindi)" }
];
function langLabel(tag) {
  return COMMON_LANGUAGES.find((l) => l.tag === tag)?.label ?? tag;
}
function ArrowUpIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: "h-4 w-4",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 19V5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m5 12 7-7 7 7" })
      ]
    }
  );
}
function ArrowDownIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: "h-4 w-4",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 5v14" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m19 12-7 7-7-7" })
      ]
    }
  );
}
function TrashIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      className: "h-4 w-4",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 6h18" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
      ]
    }
  );
}
function normalizeEntries(entries) {
  return Array.from(
    new Map(entries.map((e) => [e.toLocaleLowerCase(), e])).values()
  );
}
function splitInput(raw) {
  return raw.split(/[,\n;]/).map((e) => e.trim()).filter(Boolean);
}
function moveEntry(entries, from, to) {
  if (from === to || from < 0 || to < 0 || from >= entries.length || to >= entries.length)
    return entries;
  const next = [...entries];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}
function TutorialTooltip({
  text,
  onDismiss
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-[fade-in-up_0.2s_ease-out_both]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--accent)] py-1 pl-3 pr-1.5 text-xs font-medium text-[var(--accent-contrast)] shadow-lg", children: [
      text,
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: (e) => {
            e.stopPropagation();
            onDismiss();
          },
          "aria-label": "Dismiss hint",
          className: "flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent-contrast)]/20 opacity-80 hover:opacity-100",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              viewBox: "0 0 24 24",
              className: "h-2.5 w-2.5",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 3,
              strokeLinecap: "round",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ]
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute left-1/2 top-full -translate-x-1/2",
        style: {
          width: 0,
          height: 0,
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: "5px solid var(--accent)"
        }
      }
    )
  ] }) });
}
function EntryList({
  label,
  items,
  preferred,
  tutorialStep = 0,
  onTogglePreferred,
  onMoveUp,
  onMoveDown,
  onRemove,
  onTutorialAdvance,
  onTutorialDismiss
}) {
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "border-b border-[var(--line)] py-3 text-sm text-[var(--muted)]", children: [
      "No ",
      label,
      " yet."
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: items.map((item, index) => {
    const isPreferred = preferred.includes(item);
    const showHeartTip = tutorialStep === 1 && index === 0;
    const showArrowTip = tutorialStep === 2 && index === 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex items-center gap-3 border-b border-[var(--line)] py-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-base text-[var(--text)]", children: item }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-shrink-0 items-center gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              showHeartTip && /* @__PURE__ */ jsxRuntimeExports.jsx(
                TutorialTooltip,
                {
                  text: "mark as preferred",
                  onDismiss: () => onTutorialDismiss?.()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    onTogglePreferred(item);
                    if (showHeartTip) onTutorialAdvance?.();
                  },
                  "aria-pressed": isPreferred,
                  "aria-label": `${isPreferred ? "Unmark" : "Mark"} ${item} as preferred`,
                  className: `rounded p-1.5 transition-colors ${isPreferred ? "text-[var(--danger)]" : "text-[var(--muted)] hover:text-[var(--danger)]"} ${showHeartTip ? "ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--surface)]" : ""}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeartIcon, { filled: isPreferred, className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-0.5", children: [
              showArrowTip && /* @__PURE__ */ jsxRuntimeExports.jsx(
                TutorialTooltip,
                {
                  text: "set the order",
                  onDismiss: () => onTutorialDismiss?.()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    onMoveUp(item);
                    if (showArrowTip) onTutorialAdvance?.();
                  },
                  disabled: index === 0,
                  className: `rounded p-1.5 text-[var(--muted)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40 ${showArrowTip ? "ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--surface)]" : ""}`,
                  "aria-label": `Move ${item} up`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpIcon, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    onMoveDown(item);
                    if (showArrowTip) onTutorialAdvance?.();
                  },
                  disabled: index === items.length - 1,
                  className: `rounded p-1.5 text-[var(--muted)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40 ${showArrowTip ? "ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--surface)]" : ""}`,
                  "aria-label": `Move ${item} down`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownIcon, {})
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onRemove(item),
                className: "rounded p-1.5 text-[var(--muted)] hover:text-[var(--danger)]",
                "aria-label": `Remove ${item}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, {})
              }
            )
          ] })
        ]
      },
      item
    );
  }) });
}
const displayNames = new Intl.DisplayNames(["en"], { type: "language" });
function checkBCP47(raw) {
  const v = raw.trim();
  if (v.length < 2) return { status: "empty" };
  try {
    new Intl.Locale(v);
  } catch {
    return { status: "invalid", msg: "Not a valid BCP-47 tag" };
  }
  try {
    const name = displayNames.of(v);
    if (name && name.toLowerCase() !== v.toLowerCase()) {
      return { status: "recognized", displayName: name };
    }
  } catch {
  }
  return {
    status: "invalid",
    msg: "Unrecognized language — check the IANA registry"
  };
}
function LanguageSelector({
  value,
  usedLangs,
  onChange,
  onValidityChange
}) {
  const [customMode, setCustomMode] = reactExports.useState(
    !COMMON_LANGUAGES.some((l) => l.tag === value)
  );
  const [customInput, setCustomInput] = reactExports.useState(customMode ? value : "");
  const [check, setCheck] = reactExports.useState(
    () => customMode ? checkBCP47(value) : { status: "empty" }
  );
  const availableOptions = COMMON_LANGUAGES.filter(
    (l) => l.tag === value || !usedLangs.includes(l.tag)
  );
  function handleCustomChange(raw) {
    setCustomInput(raw);
    const result = checkBCP47(raw);
    setCheck(result);
    onValidityChange(result.status !== "invalid");
    if (result.status === "recognized") onChange(raw.trim());
  }
  function commitCustomTag() {
    const result = checkBCP47(customInput);
    setCheck(result);
    const valid = result.status !== "invalid";
    onValidityChange(valid);
    if (valid && result.status === "recognized") onChange(customInput.trim());
  }
  if (customMode) {
    const isInvalid = check.status === "invalid";
    const borderClass = isInvalid ? "border-[var(--danger)]" : "border-[var(--border)]";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setCustomMode(false);
            setCheck({ status: "empty" });
            onValidityChange(true);
            onChange(availableOptions[0]?.tag ?? DEFAULT_LANG);
          },
          className: "text-xs text-[var(--muted)] hover:text-[var(--text)]",
          "aria-label": "Back to language list",
          children: "↩"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: customInput,
          onChange: (e) => handleCustomChange(e.target.value),
          onBlur: commitCustomTag,
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commitCustomTag();
            }
          },
          placeholder: "BCP-47, e.g. en-GB",
          "aria-label": "Custom BCP-47 language tag",
          "aria-invalid": isInvalid,
          className: `w-32 rounded border bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] ${borderClass}`
        }
      ),
      check.status === "recognized" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[var(--muted)]", children: [
        "→ ",
        check.displayName
      ] }),
      check.status === "invalid" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-[var(--danger)]", children: [
        check.msg,
        " · ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "underline underline-offset-2 hover:opacity-80",
            title: "IANA Language Subtag Registry",
            children: "valid tags ↗"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "select",
    {
      value,
      onChange: (e) => {
        if (e.target.value === "__custom__") {
          setCustomMode(true);
          onValidityChange(true);
          return;
        }
        onChange(e.target.value);
      },
      className: "rounded border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]",
      "aria-label": "Language",
      children: [
        availableOptions.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: l.tag, children: l.label }, l.tag)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "__custom__", children: "Other (BCP-47)…" })
      ]
    }
  ) });
}
function LanguageGroupCard({
  group,
  usedLangs,
  isOnly,
  tutorialStep,
  onChange,
  onRemove,
  onTutorialAdvance,
  onTutorialDismiss
}) {
  const isEnglish = group.lang === DEFAULT_LANG;
  function addNames(raw) {
    const additions = splitInput(raw);
    if (additions.length === 0) return;
    onChange({
      ...group,
      names: normalizeEntries([...group.names, ...additions]),
      nameInput: ""
    });
  }
  function addPronouns(raw) {
    const additions = splitInput(raw);
    if (additions.length === 0) return;
    onChange({
      ...group,
      pronouns: normalizeEntries([...group.pronouns, ...additions]),
      pronounInput: ""
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wide text-[var(--muted)]", children: "Language" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          LanguageSelector,
          {
            value: group.lang,
            usedLangs,
            onChange: (lang) => onChange({ ...group, lang, langInvalid: false }),
            onValidityChange: (valid) => onChange({ ...group, langInvalid: !valid })
          }
        )
      ] }),
      !isEnglish || !isOnly ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onRemove,
          className: "flex items-center gap-1 rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)] hover:border-[var(--danger)] hover:text-[var(--danger)]",
          "aria-label": `Remove ${langLabel(group.lang)} group`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrashIcon, {}),
            "Remove"
          ]
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1 text-base font-semibold text-[var(--text)]", children: "Names" }),
        isEnglish && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm text-[var(--muted)]", children: "Add one or more names — you can have as many as you like." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: group.nameInput,
              onChange: (e) => onChange({ ...group, nameInput: e.target.value }),
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addNames(group.nameInput);
                }
              },
              placeholder: "Name, Name 2",
              className: "min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => addNames(group.nameInput),
              className: "min-h-11 rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-contrast)]",
              children: "Add"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EntryList,
          {
            label: "names",
            items: group.names,
            preferred: group.preferredNames,
            tutorialStep: isEnglish ? tutorialStep : 0,
            onTutorialAdvance,
            onTutorialDismiss,
            onTogglePreferred: (item) => onChange({
              ...group,
              preferredNames: group.preferredNames.includes(item) ? group.preferredNames.filter((e) => e !== item) : [...group.preferredNames, item]
            }),
            onMoveUp: (item) => {
              const i = group.names.indexOf(item);
              onChange({ ...group, names: moveEntry(group.names, i, i - 1) });
            },
            onMoveDown: (item) => {
              const i = group.names.indexOf(item);
              onChange({ ...group, names: moveEntry(group.names, i, i + 1) });
            },
            onRemove: (item) => onChange({
              ...group,
              names: group.names.filter((e) => e !== item),
              preferredNames: group.preferredNames.filter((e) => e !== item)
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1 text-base font-semibold text-[var(--text)]", children: "Pronouns" }),
        isEnglish && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm text-[var(--muted)]", children: "Pick from common options or type your own." }),
        isEnglish && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex flex-wrap gap-2", children: COMMON_PRONOUNS.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => addPronouns(entry),
            className: "rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--text)] hover:border-[var(--accent)]",
            children: entry
          },
          entry
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: group.pronounInput,
              onChange: (e) => onChange({ ...group, pronounInput: e.target.value }),
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addPronouns(group.pronounInput);
                }
              },
              placeholder: isEnglish ? "they/them, she/her" : "Add pronoun…",
              className: "min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => addPronouns(group.pronounInput),
              className: "min-h-11 rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-contrast)]",
              children: "Add"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EntryList,
          {
            label: "pronouns",
            items: group.pronouns,
            preferred: group.preferredPronouns,
            onTogglePreferred: (item) => onChange({
              ...group,
              preferredPronouns: group.preferredPronouns.includes(item) ? group.preferredPronouns.filter((e) => e !== item) : [...group.preferredPronouns, item]
            }),
            onMoveUp: (item) => {
              const i = group.pronouns.indexOf(item);
              onChange({
                ...group,
                pronouns: moveEntry(group.pronouns, i, i - 1)
              });
            },
            onMoveDown: (item) => {
              const i = group.pronouns.indexOf(item);
              onChange({
                ...group,
                pronouns: moveEntry(group.pronouns, i, i + 1)
              });
            },
            onRemove: (item) => onChange({
              ...group,
              pronouns: group.pronouns.filter((e) => e !== item),
              preferredPronouns: group.preferredPronouns.filter(
                (e) => e !== item
              )
            })
          }
        )
      ] })
    ] })
  ] });
}
function groupsToState(groups) {
  const states = groups.map((g) => ({
    lang: g.lang,
    names: normalizeEntries(g.names),
    preferredNames: normalizeEntries(g.preferredNames).filter(
      (e) => g.names.includes(e)
    ),
    pronouns: normalizeEntries(g.pronouns),
    preferredPronouns: normalizeEntries(g.preferredPronouns).filter(
      (e) => g.pronouns.includes(e)
    ),
    nameInput: "",
    pronounInput: ""
  }));
  if (!states.some((g) => g.lang === DEFAULT_LANG)) {
    states.unshift({
      lang: DEFAULT_LANG,
      names: [],
      preferredNames: [],
      pronouns: [],
      preferredPronouns: [],
      nameInput: "",
      pronounInput: ""
    });
  }
  return states;
}
function ProfileEditor({
  initialGroups,
  isFirstTime = false,
  profileHref
}) {
  const [groups, setGroups] = reactExports.useState(
    () => groupsToState(initialGroups)
  );
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const [saved, setSaved] = reactExports.useState(false);
  const [tutorialStep, setTutorialStep] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const done = localStorage.getItem("pronounsblue-tutorial") === "done";
    if (!done) setTutorialStep(1);
  }, []);
  function advanceTutorial() {
    const eng = groups.find((g) => g.lang === DEFAULT_LANG);
    if (tutorialStep === 1) {
      if (eng && eng.names.length >= 2) {
        setTutorialStep(2);
      } else {
        setTutorialStep(0);
        localStorage.setItem("pronounsblue-tutorial", "done");
      }
    } else if (tutorialStep === 2) {
      setTutorialStep(0);
      localStorage.setItem("pronounsblue-tutorial", "done");
    }
  }
  function dismissTutorial() {
    setTutorialStep(0);
    localStorage.setItem("pronounsblue-tutorial", "done");
  }
  const canSave = reactExports.useMemo(
    () => groups.some((g) => g.names.length > 0 || g.pronouns.length > 0) && !groups.some((g) => g.langInvalid) && !isSaving,
    [groups, isSaving]
  );
  const usedLangs = groups.map((g) => g.lang);
  function addLanguageGroup() {
    const nextLang = COMMON_LANGUAGES.find((l) => !usedLangs.includes(l.tag))?.tag ?? "x-custom";
    setGroups((prev) => [
      ...prev,
      {
        lang: nextLang,
        names: [],
        preferredNames: [],
        pronouns: [],
        preferredPronouns: [],
        nameInput: "",
        pronounInput: ""
      }
    ]);
    setSaved(false);
  }
  async function saveProfile() {
    setIsSaving(true);
    setError(null);
    setSaved(false);
    try {
      const payload = groups.filter((g) => g.names.length > 0 || g.pronouns.length > 0).map(
        ({ lang, names, pronouns, preferredNames, preferredPronouns }) => ({
          lang,
          names,
          pronouns,
          preferredNames: preferredNames.filter((e) => names.includes(e)),
          preferredPronouns: preferredPronouns.filter(
            (e) => pronouns.includes(e)
          )
        })
      );
      const response = await fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groups: payload })
      });
      const data = response.headers.get("content-type")?.includes("application/json") ? await response.json() : {};
      if (!response.ok)
        throw new Error(data.error || `Server error ${response.status}`);
      setSaved(true);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  }
  COMMON_LANGUAGES.some((l) => !usedLangs.includes(l.tag)) || true;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    isFirstTime && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-col items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--accent-contrast)]", children: "✓" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-[var(--text)]", children: "Sign in" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mt-4 h-px flex-1",
            style: { background: "var(--accent)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-col items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${saved ? "bg-[var(--accent)] text-[var(--accent-contrast)]" : "border-2 border-[var(--accent)] text-[var(--accent)]"}`,
              children: saved ? "✓" : "2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-[var(--text)]", children: "Add your info" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mt-4 h-px flex-1 transition-colors",
            style: { background: saved ? "var(--accent)" : "var(--border)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 flex-col items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${saved ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--border)] text-[var(--muted)]"}`,
              children: "3"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `text-xs transition-colors ${saved ? "font-medium text-[var(--text)]" : "text-[var(--muted)]"}`,
              children: "Share"
            }
          )
        ] })
      ] }),
      saved && profileHref && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🎉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-[var(--text)]", children: "You're all set!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[var(--muted)]", children: "Your profile is live and ready to share." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: profileHref,
            className: "inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)] transition-opacity hover:opacity-90",
            children: [
              "View your profile",
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "svg",
                {
                  viewBox: "0 0 24 24",
                  className: "h-4 w-4",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: 2.5,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12h14" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m13 6 6 6-6 6" })
                  ]
                }
              )
            ]
          }
        )
      ] })
    ] }),
    groups.map((group, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      LanguageGroupCard,
      {
        group,
        usedLangs,
        isOnly: groups.length === 1,
        tutorialStep: index === 0 ? tutorialStep : 0,
        onChange: (updated) => {
          setGroups(
            (prev) => prev.map((g, i) => i === index ? updated : g)
          );
          setSaved(false);
        },
        onRemove: () => {
          setGroups((prev) => prev.filter((_, i) => i !== index));
          setSaved(false);
        },
        onTutorialAdvance: advanceTutorial,
        onTutorialDismiss: dismissTutorial
      },
      group.lang
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: addLanguageGroup,
        className: "flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border)] py-3 text-sm text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              viewBox: "0 0 24 24",
              className: "h-4 w-4",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 5v14" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12h14" })
              ]
            }
          ),
          "Add another language"
        ]
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "border-b border-[var(--line)] py-2 text-sm text-[var(--danger)]", children: error }),
    saved && !isFirstTime && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "border-b border-[var(--line)] py-2 text-sm text-[var(--success)]", children: "Profile updated." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: !canSave,
        onClick: saveProfile,
        className: "min-h-12 rounded-lg bg-[var(--accent)] px-6 py-3 text-base font-semibold text-[var(--accent-contrast)] disabled:cursor-not-allowed disabled:opacity-50",
        children: isSaving ? "Saving..." : "Save profile"
      }
    )
  ] });
}

function ArrowIcon() {
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 12h14" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m13 6 6 6-6 6" })
      ]
    }
  );
}
function SettingsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-48 animate-pulse rounded-md bg-[var(--surface-strong)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-64 animate-pulse rounded-md bg-[var(--surface-strong)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 animate-pulse rounded-2xl bg-[var(--surface-strong)]" })
  ] }) });
}
function SettingsClient() {
  const did = reactExports.useSyncExternalStore(
    subscribeToCookies,
    getDidPublicCookie,
    getDidPublicCookieServer
  );
  const [actor, setActor] = reactExports.useState(
    void 0
  );
  const [groups, setGroups] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (did === null) {
      window.location.replace("/");
      return;
    }
    Promise.all([fetchActorProfile(did), fetchProfileRecords(did)]).then(([actorData, profileData]) => {
      setActor(actorData);
      setGroups(profileData.groups);
    }).catch(() => {
      setActor(null);
      setGroups([]);
    });
  }, [did]);
  if (did === null || actor === void 0 || groups === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSkeleton, {});
  }
  const normalizedHandle = actor?.handle?.replace(/^@/, "");
  const profileHref = normalizedHandle ? `/profile/${encodeURIComponent(normalizedHandle)}` : null;
  const isFirstTime = groups.length === 0 || groups.every((g) => g.names.length === 0 && g.pronouns.length === 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-[var(--text)]", children: isFirstTime ? "Set up your profile" : "Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[var(--muted)]", children: isFirstTime ? "Add your names and pronouns to get started." : "Update your names and pronouns." })
      ] }),
      profileHref && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: profileHref,
          className: "inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowIcon, {}),
            "Show profile"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProfileEditor,
      {
        initialGroups: groups,
        isFirstTime,
        profileHref: profileHref ?? void 0
      }
    )
  ] }) });
}

export { SettingsClient };
