import { beginLogin, getAuthenticatedDid, signOut } from "../lib/auth/oauth";

interface Actor {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

let searchTimer: ReturnType<typeof setTimeout>;
let shortcutInitialized = false;
let accountDismissInitialized = false;

function setTheme(value: string) {
  document.documentElement.dataset.theme = value;
  localStorage.setItem("pronounsblue-theme", value);
}

async function fetchActor(did: string): Promise<Actor | null> {
  const response = await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(did)}`,
  );
  return response.ok ? ((await response.json()) as Actor) : null;
}

function renderSearchResult(actor: Actor) {
  const link = document.createElement("a");
  link.className = "search-result";
  link.href = `/profile/${encodeURIComponent(actor.handle)}`;
  const avatar = actor.avatar
    ? Object.assign(document.createElement("img"), { src: actor.avatar, alt: "" })
    : Object.assign(document.createElement("span"), {
        className: "search-fallback",
        textContent: (actor.displayName ?? actor.handle).charAt(0).toUpperCase(),
      });
  const label = document.createElement("span");
  label.className = "search-label";
  const name = document.createElement("span");
  name.textContent = actor.displayName ?? actor.handle;
  const handle = document.createElement("small");
  handle.textContent = `@${actor.handle}`;
  label.append(name, handle);
  link.append(avatar, label);
  return link;
}

function initializeSearch() {
  const dialog = document.querySelector<HTMLDialogElement>("[data-search-dialog]");
  const input = dialog?.querySelector<HTMLInputElement>("[data-search-input]");
  const results = dialog?.querySelector<HTMLElement>("[data-search-results]");
  if (!dialog || !input || !results) return;

  document.querySelector("[data-open-search]")?.addEventListener("click", () => {
    dialog.showModal();
    input.focus();
  });
  if (!shortcutInitialized) {
    shortcutInitialized = true;
    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        const activeDialog =
          document.querySelector<HTMLDialogElement>("[data-search-dialog]");
        const activeInput =
          activeDialog?.querySelector<HTMLInputElement>("[data-search-input]");
        activeDialog?.showModal();
        activeInput?.focus();
      }
    });
  }
  input.addEventListener("input", () => {
    clearTimeout(searchTimer);
    const query = input.value.trim();
    results.replaceChildren();
    if (!query) return;
    searchTimer = setTimeout(async () => {
      const response = await fetch(
        `https://public.api.bsky.app/xrpc/app.bsky.actor.searchActors?q=${encodeURIComponent(query)}&limit=8`,
      );
      if (!response.ok) return;
      const value = (await response.json()) as { actors: Actor[] };
      results.replaceChildren(...value.actors.map(renderSearchResult));
    }, 150);
  });
}

async function initializeAccount() {
  const login = document.querySelector<HTMLFormElement>("[data-login-form]");
  const account = document.querySelector<HTMLElement>("[data-account]");
  if (!login || !account) return;
  const did = getAuthenticatedDid();
  if (did) {
    const actor = await fetchActor(did);
    if (actor) {
      login.hidden = true;
      account.hidden = false;
      const avatar = account.querySelector<HTMLElement>("[data-account-avatar]");
      if (avatar) {
        avatar.textContent = (actor.displayName ?? actor.handle).charAt(0).toUpperCase();
        avatar.style.removeProperty("background-image");
        if (actor.avatar) {
          const image = new Image();
          image.addEventListener("load", () => {
            if (!avatar.isConnected) return;
            avatar.textContent = "";
            avatar.style.backgroundImage = `url("${actor.avatar}")`;
          });
          image.src = actor.avatar;
        }
      }
      const profileLink = account.querySelector<HTMLAnchorElement>("[data-profile-link]");
      if (profileLink) profileLink.href = `/profile/${encodeURIComponent(actor.handle)}`;
    }
  }
  login.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(login);
    const output = login.querySelector<HTMLOutputElement>("[data-login-error]");
    const entered = String(data.get("handle") ?? "").trim();
    const identifier =
      entered || window.prompt("Enter your AT Protocol handle or DID")?.trim() || "";
    if (!identifier) return;
    try {
      await beginLogin(identifier);
    } catch (error) {
      if (output) output.textContent = error instanceof Error ? error.message : "Login failed";
    }
  });
  account.querySelector("[data-account-toggle]")?.addEventListener("click", (event) => {
    const menu = account.querySelector<HTMLElement>("[data-account-menu]");
    if (menu) {
      menu.hidden = !menu.hidden;
      (event.currentTarget as HTMLElement).setAttribute("aria-expanded", String(!menu.hidden));
    }
  });
  if (!accountDismissInitialized) {
    accountDismissInitialized = true;
    document.addEventListener("mousedown", (event) => {
      const currentAccount = document.querySelector<HTMLElement>("[data-account]");
      const menu = currentAccount?.querySelector<HTMLElement>("[data-account-menu]");
      if (currentAccount && menu && !currentAccount.contains(event.target as Node)) {
        menu.hidden = true;
        currentAccount.querySelector("[data-account-toggle]")?.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const menu = document.querySelector<HTMLElement>("[data-account-menu]");
        if (menu) menu.hidden = true;
        document.querySelector("[data-account-toggle]")?.setAttribute("aria-expanded", "false");
      }
    });
  }
  account.querySelector("[data-logout]")?.addEventListener("click", async () => {
    const currentDid = getAuthenticatedDid();
    if (currentDid) await signOut(currentDid);
    window.location.assign("/");
  });
}

export function initializeHeader() {
  const theme = document.querySelector<HTMLSelectElement>("[data-theme-select]");
  if (theme) {
    theme.value = document.documentElement.dataset.theme ?? "light";
    theme.addEventListener("change", () => setTheme(theme.value));
  }
  initializeSearch();
  void initializeAccount();
}
