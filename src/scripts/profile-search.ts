interface Actor {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

let timer: ReturnType<typeof setTimeout>;
let controller: AbortController | undefined;

function resultButton(actor: Actor) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "profile-result";
  const avatar = actor.avatar
    ? Object.assign(document.createElement("img"), { src: actor.avatar, alt: "", loading: "lazy" })
    : Object.assign(document.createElement("span"), {
        className: "profile-result-avatar",
        textContent: (actor.displayName ?? actor.handle).charAt(0).toUpperCase(),
      });
  const label = document.createElement("span");
  label.className = "profile-result-label";
  const name = document.createElement("span");
  name.textContent = actor.displayName ?? actor.handle;
  const handle = document.createElement("span");
  handle.textContent = `@${actor.handle}`;
  label.append(name, handle);
  button.append(avatar, label);
  button.addEventListener("click", () => {
    window.location.assign(`/profile/${encodeURIComponent(actor.handle)}`);
  });
  return button;
}

export function initializeProfileSearch() {
  const root = document.querySelector<HTMLElement>("[data-profile-search]");
  const input = root?.querySelector<HTMLInputElement>("input");
  const results = root?.querySelector<HTMLElement>("[data-profile-results]");
  if (!root || !input || !results || root.dataset.initialized) return;
  root.dataset.initialized = "true";
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && input.value.trim()) {
      window.location.assign(`/profile/${encodeURIComponent(input.value.trim().replace(/^@/, ""))}`);
    }
    if (event.key === "Escape") results.hidden = true;
  });
  input.addEventListener("input", () => {
    clearTimeout(timer);
    controller?.abort();
    const query = input.value.trim();
    results.replaceChildren();
    results.hidden = true;
    if (!query) return;
    controller = new AbortController();
    timer = setTimeout(async () => {
      results.hidden = false;
      results.textContent = "Searching…";
      try {
        const response = await fetch(
          `https://public.api.bsky.app/xrpc/app.bsky.actor.searchActors?q=${encodeURIComponent(query)}&limit=8`,
          { signal: controller?.signal },
        );
        if (!response.ok) throw new Error();
        const data = (await response.json()) as { actors?: Actor[] };
        results.replaceChildren(...(data.actors ?? []).map(resultButton));
        results.hidden = !data.actors?.length;
      } catch {
        results.hidden = true;
      }
    }, 120);
  });
  document.addEventListener("mousedown", (event) => {
    if (!root.contains(event.target as Node)) results.hidden = true;
  });
}
