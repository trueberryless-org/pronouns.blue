import { getAuthenticatedDid } from "../lib/auth/oauth";

interface Actor {
  handle: string;
  displayName?: string;
  avatar?: string;
}

export async function initializeHomeUser() {
  const section = document.querySelector<HTMLElement>("[data-home-user]");
  if (!section) return;
  const did = getAuthenticatedDid();
  if (!did) {
    section.hidden = true;
    return;
  }
  const response = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(did)}`,
  );
  if (!response.ok) return;
  const actor = (await response.json()) as Actor;
  const label = actor.displayName ?? actor.handle;
  const link = section.querySelector<HTMLAnchorElement>("[data-home-profile]");
  const avatar = section.querySelector<HTMLElement>("[data-home-avatar]");
  const name = section.querySelector<HTMLElement>("[data-home-name]");
  const handle = section.querySelector<HTMLElement>("[data-home-handle]");
  if (link) link.href = `/profile/${encodeURIComponent(actor.handle)}`;
  if (avatar) {
    avatar.textContent = label.charAt(0).toUpperCase();
    if (actor.avatar) avatar.style.backgroundImage = `url("${actor.avatar}")`;
  }
  if (name) name.textContent = label;
  if (handle) handle.textContent = `@${actor.handle}`;
  section.hidden = false;
}
