import type { LanguageGroup } from "../atproto/records";
import { COMMON_LANGUAGES, COMMON_PRONOUNS } from "./constants";

function escape(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]!,
  );
}

function entryRow(
  value: string,
  index: number,
  count: number,
  preferred: boolean,
  type: "name" | "pronoun",
) {
  return `
    <li>
      <span>${escape(value)}</span>
      <div>
        <button type="button" data-action="preferred" data-type="${type}" data-entry="${escape(value)}" aria-label="${preferred ? "Unmark" : "Mark"} ${escape(value)} as preferred" aria-pressed="${preferred}">${preferred ? "♥" : "♡"}</button>
        <button type="button" data-action="move-up" data-type="${type}" data-index="${index}" aria-label="Move ${escape(value)} up" ${index === 0 ? "disabled" : ""}>↑</button>
        <button type="button" data-action="move-down" data-type="${type}" data-index="${index}" aria-label="Move ${escape(value)} down" ${index === count - 1 ? "disabled" : ""}>↓</button>
        <button type="button" data-action="remove-entry" data-type="${type}" data-entry="${escape(value)}" aria-label="Remove ${escape(value)}">×</button>
      </div>
    </li>`;
}

function entrySection(
  title: string,
  type: "name" | "pronoun",
  values: string[],
  preferred: string[],
) {
  const suggestions =
    type === "pronoun"
      ? `<div class="suggestions">${COMMON_PRONOUNS.map(
          (entry) =>
            `<button type="button" data-action="suggest" data-value="${entry}">${entry}</button>`,
        ).join("")}</div>`
      : "";
  return `
    <section class="entry-section">
      <h3>${title}</h3>
      ${suggestions}
      <form data-entry-form data-type="${type}">
        <input class="field" name="entry" maxlength="64" placeholder="${type === "name" ? "Name, Name 2" : "they/them, she/her"}" required>
        <button class="button primary" type="submit">Add</button>
      </form>
      <ul>${values.length ? values.map((value, index) => entryRow(value, index, values.length, preferred.includes(value), type)).join("") : `<li class="empty">No ${title.toLowerCase()} yet.</li>`}</ul>
    </section>`;
}

function languageOptions(current: string, groups: LanguageGroup[]) {
  const options = COMMON_LANGUAGES.filter(
    ([tag]) => tag === current || !groups.some((group) => group.lang === tag),
  )
    .map(
      ([tag, name]) =>
        `<option value="${tag}" ${tag === current ? "selected" : ""}>${name}</option>`,
    )
    .join("");
  const custom = COMMON_LANGUAGES.some(([tag]) => tag === current)
    ? ""
    : `<option value="${escape(current)}" selected>${escape(current)}</option>`;
  return options + custom;
}

export function renderEditor(groups: LanguageGroup[]) {
  return groups
    .map(
      (group, index) => `
        <article class="language-card card" data-group="${index}">
          <header>
            <label>Language
              <select class="field" data-language>
                ${languageOptions(group.lang, groups)}
                <option value="__custom__">Other BCP-47 tag…</option>
              </select>
            </label>
            ${groups.length > 1 ? `<button class="button remove-language" type="button" data-action="remove-language">Remove language</button>` : ""}
          </header>
          <div class="entry-grid">
            ${entrySection("Names", "name", group.names, group.preferredNames)}
            ${entrySection("Pronouns", "pronoun", group.pronouns, group.preferredPronouns)}
          </div>
        </article>`,
    )
    .join("");
}
