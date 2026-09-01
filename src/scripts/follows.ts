interface Follow {
  handle: string;
  displayName?: string;
  avatar?: string;
}

function followCard(actor: Follow) {
  const link = document.createElement("a");
  link.className = "follow card";
  link.href = `/profile/${encodeURIComponent(actor.handle)}`;
  const avatar = actor.avatar
    ? Object.assign(document.createElement("img"), {
        src: actor.avatar,
        alt: "",
        width: 48,
        height: 48,
        loading: "lazy",
      })
    : Object.assign(document.createElement("span"), {
        textContent: (actor.displayName ?? actor.handle).charAt(0).toUpperCase(),
      });
  const name = document.createElement("strong");
  name.textContent = actor.displayName ?? actor.handle;
  const handle = document.createElement("small");
  handle.textContent = `@${actor.handle}`;
  link.append(avatar, name, handle);
  return link;
}

export function initializeFollows() {
  const section = document.querySelector<HTMLElement>("[data-follows]");
  const button = section?.querySelector<HTMLButtonElement>("[data-load-follows]");
  const grid = section?.querySelector<HTMLElement>("[data-follows-grid]");
  if (!section || !button || !grid) return;
  button.addEventListener("click", async () => {
    button.disabled = true;
    const url = new URL("https://public.api.bsky.app/xrpc/app.bsky.graph.getFollows");
    url.searchParams.set("actor", section.dataset.did!);
    url.searchParams.set("cursor", section.dataset.cursor!);
    url.searchParams.set("limit", "48");
    const response = await fetch(url);
    if (response.ok) {
      const value = (await response.json()) as { follows: Follow[]; cursor?: string };
      grid.append(...value.follows.map(followCard));
      section.dataset.cursor = value.cursor ?? "";
      if (!value.cursor) button.remove();
    }
    button.disabled = false;
  });
}
