import type { Did } from "@atcute/lexicons/syntax";
import { getActorProfile } from "../lib/atproto/profile";
import { getProfileRecords, type LanguageGroup } from "../lib/atproto/records";
import { publishProfile } from "../lib/atproto/publisher";
import { COMMON_LANGUAGES } from "../lib/editor/constants";
import {
  addEntries,
  createGroup,
  moveEntry,
  normalizeGroups,
  validLanguageTag,
} from "../lib/editor/model";
import { renderEditor } from "../lib/editor/render";
import { getAuthenticatedClient, getAuthenticatedDid } from "../lib/auth/oauth";

let groups: LanguageGroup[] = [];

function groupFrom(target: Element) {
  const element = target.closest<HTMLElement>("[data-group]");
  return element ? Number(element.dataset.group) : -1;
}

function entries(group: LanguageGroup, type: string) {
  return type === "name"
    ? { values: group.names, preferred: group.preferredNames }
    : { values: group.pronouns, preferred: group.preferredPronouns };
}

function repaint(root: HTMLElement) {
  root.innerHTML = renderEditor(groups);
}

function mutateEntry(target: HTMLElement, root: HTMLElement) {
  const index = groupFrom(target);
  const group = groups[index];
  if (!group) return;
  const type = target.dataset.type ?? "";
  const state = entries(group, type);
  const entry = target.dataset.entry ?? "";
  switch (target.dataset.action) {
    case "preferred":
      state.preferred = state.preferred.includes(entry)
        ? state.preferred.filter((value) => value !== entry)
        : [...state.preferred, entry];
      if (type === "name") group.preferredNames = state.preferred;
      else group.preferredPronouns = state.preferred;
      break;
    case "remove-entry":
      state.values = state.values.filter((value) => value !== entry);
      state.preferred = state.preferred.filter((value) => value !== entry);
      if (type === "name") {
        group.names = state.values;
        group.preferredNames = state.preferred;
      } else {
        group.pronouns = state.values;
        group.preferredPronouns = state.preferred;
      }
      break;
    case "move-up":
    case "move-down": {
      const moved = moveEntry(
        state.values,
        Number(target.dataset.index),
        target.dataset.action === "move-up" ? -1 : 1,
      );
      if (type === "name") group.names = moved;
      else group.pronouns = moved;
      break;
    }
  }
  repaint(root);
}

function bindEditor(root: HTMLElement) {
  root.addEventListener("submit", (event) => {
    const form = (event.target as Element).closest<HTMLFormElement>("[data-entry-form]");
    if (!form) return;
    event.preventDefault();
    const index = groupFrom(form);
    const group = groups[index];
    const type = form.dataset.type ?? "";
    const value = String(new FormData(form).get("entry") ?? "");
    if (type === "name") group.names = addEntries(group.names, value);
    else group.pronouns = addEntries(group.pronouns, value);
    repaint(root);
  });
  root.addEventListener("click", (event) => {
    const target = (event.target as Element).closest<HTMLElement>("[data-action]");
    if (!target) return;
    const index = groupFrom(target);
    if (target.dataset.action === "remove-language") {
      groups.splice(index, 1);
      repaint(root);
      return;
    }
    if (target.dataset.action === "suggest") {
      groups[index].pronouns = addEntries(groups[index].pronouns, target.dataset.value ?? "");
      repaint(root);
      return;
    }
    mutateEntry(target, root);
  });
  root.addEventListener("change", (event) => {
    const select = (event.target as Element).closest<HTMLSelectElement>("[data-language]");
    if (!select) return;
    const index = groupFrom(select);
    if (select.value === "__custom__") {
      const value = window.prompt("Enter a BCP-47 language tag, for example en-GB");
      if (value && validLanguageTag(value) && !groups.some((group) => group.lang === value)) {
        groups[index].lang = value;
      }
    } else {
      groups[index].lang = select.value;
    }
    repaint(root);
  });
}

async function save(did: Did, root: HTMLElement) {
  const status = document.querySelector<HTMLOutputElement>("[data-save-status]");
  const button = document.querySelector<HTMLButtonElement>("[data-save]");
  if (!status || !button) return;
  button.disabled = true;
  status.textContent = "Saving…";
  try {
    if (groups.some((group) => !validLanguageTag(group.lang))) {
      throw new Error("Every language must use a valid BCP-47 tag.");
    }
    if (groups.some((group) => group.names.length > 128 || group.pronouns.length > 128)) {
      throw new Error("Each language supports up to 128 names and 128 pronouns.");
    }
    const filtered = groups.filter((group) => group.names.length > 0 || group.pronouns.length > 0);
    const rpc = await getAuthenticatedClient(did);
    await publishProfile(rpc, did, filtered);
    const invalidation = await fetch("/api/cache/invalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ did }),
    });
    if (!invalidation.ok) {
      throw new Error("Your records were saved, but the profile cache could not be refreshed.");
    }
    status.textContent = "Saved. Your public profile cache has been refreshed.";
    status.dataset.state = "success";
    repaint(root);
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : "Unable to save profile";
    status.dataset.state = "error";
  } finally {
    button.disabled = false;
  }
}

export async function initializeSettings() {
  const root = document.querySelector<HTMLElement>("[data-editor]");
  const loading = document.querySelector<HTMLElement>("[data-settings-loading]");
  const content = document.querySelector<HTMLElement>("[data-settings-content]");
  if (!root || !loading || !content) return;
  const did = getAuthenticatedDid();
  if (!did) {
    window.location.replace("/");
    return;
  }
  const [actor, profile] = await Promise.all([getActorProfile(did), getProfileRecords(did)]);
  groups = normalizeGroups(profile.groups);
  repaint(root);
  bindEditor(root);
  const profileLink = document.querySelector<HTMLAnchorElement>("[data-own-profile]");
  if (actor && profileLink) {
    profileLink.href = `/profile/${encodeURIComponent(actor.handle)}`;
    profileLink.hidden = false;
  }
  document.querySelector("[data-add-language]")?.addEventListener("click", () => {
    const language =
      COMMON_LANGUAGES.find(([tag]) => !groups.some((group) => group.lang === tag))?.[0] ??
      `und-x-group-${groups.length + 1}`;
    groups.push(createGroup(language));
    repaint(root);
  });
  document.querySelector("[data-save]")?.addEventListener("click", () => void save(did, root));
  loading.hidden = true;
  content.hidden = false;
}
