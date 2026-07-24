<script setup lang="ts">
interface UserInfo {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
}

const { did } = useAuth();

const user = ref<UserInfo | null | undefined>(undefined); // undefined = loading

// Fetch profile when DID becomes known on client
onMounted(() => {
  watchEffect(async () => {
    const currentDid = did.value;
    if (!currentDid) {
      user.value = null;
      return;
    }
    try {
      const r = await fetch(
        `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${currentDid}`,
      );
      const p = await r.json();
      user.value = {
        did: currentDid,
        handle: p.handle,
        displayName: p.displayName ?? null,
        avatar: p.avatar ?? null,
      };
    } catch {
      user.value = null;
    }
  });
});

const signedIn = computed(() => !!user.value);
const label = computed(
  () =>
    user.value?.displayName ??
    user.value?.handle ??
    user.value?.did ??
    "profile",
);
const normalizedHandle = computed(() => user.value?.handle?.replace(/^@/, ""));
const profileHref = computed(() =>
  normalizedHandle.value
    ? `/profile/${encodeURIComponent(normalizedHandle.value)}`
    : "/settings",
);

// Desktop dropdown
const desktopMenuOpen = ref(false);
const desktopMenuRef = ref<HTMLElement | null>(null);

function handleDesktopOutsideClick(e: MouseEvent) {
  if (
    desktopMenuRef.value &&
    !desktopMenuRef.value.contains(e.target as Node)
  ) {
    desktopMenuOpen.value = false;
  }
}
watch(desktopMenuOpen, (open) => {
  if (open) document.addEventListener("mousedown", handleDesktopOutsideClick);
  else document.removeEventListener("mousedown", handleDesktopOutsideClick);
});

// Mobile menu
const mobileMenuOpen = ref(false);
const mobileMenuRef = ref<HTMLElement | null>(null);

function handleMobileOutsideClick(e: MouseEvent) {
  if (mobileMenuRef.value && !mobileMenuRef.value.contains(e.target as Node)) {
    mobileMenuOpen.value = false;
  }
}
watch(mobileMenuOpen, (open) => {
  if (open) document.addEventListener("mousedown", handleMobileOutsideClick);
  else document.removeEventListener("mousedown", handleMobileOutsideClick);
});

// Login form
const loginHandle = ref("");
const loginLoading = ref(false);
const loginError = ref<string | null>(null);

async function startLogin() {
  loginLoading.value = true;
  loginError.value = null;
  try {
    const { beginLogin } = await import("~/lib/auth/oauth.client");
    await beginLogin(loginHandle.value.trim());
  } catch (err) {
    loginError.value = err instanceof Error ? err.message : "Login failed";
    loginLoading.value = false;
  }
}

async function handleLogout() {
  const currentDid = did.value;
  if (currentDid) {
    const { signOut } = await import("~/lib/auth/oauth.client");
    await signOut(currentDid);
  }
  did.value = null;
  await navigateTo("/", { replace: true });
}
</script>

<template>
  <nav class="mb-8 mt-4 border-b border-[var(--border)] pb-4">
    <div
      class="mx-auto flex w-full max-w-6xl min-h-14 items-center gap-3 px-4 sm:px-6"
    >
      <NavLogo />

      <div class="ml-auto flex items-center gap-4">
        <SearchModal />

        <!-- Desktop: theme toggle -->
        <div class="hidden items-center gap-4 sm:flex">
          <ThemeToggle />
        </div>

        <!-- Desktop: auth -->
        <div class="hidden items-center sm:flex">
          <!-- Loading skeleton -->
          <div
            v-if="user === undefined"
            class="h-10 w-10 animate-pulse rounded-full bg-[var(--surface-strong)]"
          />

          <!-- Signed in: avatar + dropdown -->
          <div v-else-if="signedIn" ref="desktopMenuRef" class="relative">
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-sm font-semibold text-[var(--text)] hover:border-[var(--accent)]"
              aria-haspopup="menu"
              :aria-expanded="desktopMenuOpen"
              aria-label="Open account menu"
              @click="desktopMenuOpen = !desktopMenuOpen"
            >
              <span
                v-if="user?.avatar"
                class="h-full w-full bg-cover bg-center"
                :style="{ backgroundImage: `url(${user.avatar})` }"
                role="img"
                :aria-label="label"
              />
              <span v-else>{{ label.slice(0, 1).toUpperCase() }}</span>
            </button>

            <div
              v-if="desktopMenuOpen"
              role="menu"
              class="absolute right-0 z-20 mt-2 min-w-44 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1 shadow-md"
            >
              <NuxtLink
                :to="profileHref"
                role="menuitem"
                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]"
                @click="desktopMenuOpen = false"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="8" r="4" />
                </svg>
                Profile
              </NuxtLink>
              <NuxtLink
                to="/settings"
                role="menuitem"
                class="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]"
                @click="desktopMenuOpen = false"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path
                    d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3h.1a1.6 1.6 0 0 0 .9-1.4V3a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 1 1.5h.1a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8v.1a1.6 1.6 0 0 0 1.4.9h.2a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.5 1Z"
                  />
                </svg>
                Settings
              </NuxtLink>
              <button
                type="button"
                role="menuitem"
                class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]"
                @click="handleLogout"
              >
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <path d="m16 17 5-5-5-5" />
                  <path d="M21 12H9" />
                </svg>
                Log out
              </button>
            </div>
          </div>

          <!-- Signed out: login form -->
          <div v-else class="flex flex-col items-end gap-1">
            <div class="flex items-center gap-2">
              <input
                v-model="loginHandle"
                placeholder="handle.bsky.social"
                class="min-h-10 w-48 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--text)]"
                @keydown.enter="
                  loginHandle.trim() && !loginLoading && startLogin()
                "
              />
              <button
                type="button"
                :disabled="loginLoading || !loginHandle.trim()"
                class="min-h-10 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)] disabled:opacity-50"
                @click="startLogin"
              >
                {{ loginLoading ? "..." : "Log in / Sign up" }}
              </button>
            </div>
            <p v-if="loginError" class="text-xs text-[var(--danger)]">
              {{ loginError }}
            </p>
          </div>
        </div>

        <!-- Mobile: burger menu -->
        <div ref="mobileMenuRef" class="relative sm:hidden">
          <button
            type="button"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="mobileMenuOpen"
            aria-haspopup="menu"
            class="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg
              v-if="mobileMenuOpen"
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div
            v-if="mobileMenuOpen"
            role="menu"
            class="absolute right-0 z-20 mt-2 min-w-56 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg"
          >
            <div class="border-b border-[var(--border)] px-1 pb-3 mb-2">
              <p class="mb-1.5 px-2 text-xs font-medium text-[var(--muted)]">
                Theme
              </p>
              <ThemeToggle />
            </div>

            <template v-if="signedIn">
              <div
                v-if="user?.avatar"
                class="flex items-center gap-2 px-3 py-2 mb-1"
              >
                <span
                  class="h-7 w-7 flex-shrink-0 rounded-full bg-cover bg-center border border-[var(--border)]"
                  :style="{ backgroundImage: `url(${user.avatar})` }"
                  role="img"
                  :aria-label="label"
                />
                <span class="truncate text-sm font-medium text-[var(--text)]">{{
                  label
                }}</span>
              </div>
              <NuxtLink
                :to="profileHref"
                role="menuitem"
                class="flex items-center rounded-md px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]"
                @click="mobileMenuOpen = false"
                >Profile</NuxtLink
              >
              <NuxtLink
                to="/settings"
                role="menuitem"
                class="flex items-center rounded-md px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]"
                @click="mobileMenuOpen = false"
                >Settings</NuxtLink
              >
              <button
                type="button"
                role="menuitem"
                class="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]"
                @click="handleLogout"
              >
                Log out
              </button>
            </template>

            <template v-else>
              <div class="flex flex-col gap-2 p-1 pt-0">
                <input
                  v-model="loginHandle"
                  placeholder="handle.bsky.social"
                  class="min-h-10 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--text)]"
                  @keydown.enter="
                    loginHandle.trim() && !loginLoading && startLogin()
                  "
                />
                <button
                  type="button"
                  :disabled="loginLoading || !loginHandle.trim()"
                  class="min-h-10 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)] disabled:opacity-50"
                  @click="startLogin"
                >
                  {{ loginLoading ? "..." : "Log in / Sign up" }}
                </button>
                <p v-if="loginError" class="text-xs text-[var(--danger)]">
                  {{ loginError }}
                </p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
