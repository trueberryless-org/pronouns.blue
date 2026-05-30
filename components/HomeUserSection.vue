<script setup lang="ts">
interface UserInfo {
  did: string;
  handle: string | null;
  displayName: string | null;
  avatar: string | null;
}

const { did } = useAuth();
const user = ref<UserInfo | null>(null);

onMounted(() => {
  watchEffect(async () => {
    const d = did.value;
    if (!d) { user.value = null; return; }
    try {
      const r = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${d}`);
      const p = await r.json();
      user.value = { did: d, handle: p.handle ?? null, displayName: p.displayName ?? null, avatar: p.avatar ?? null };
    } catch { user.value = null; }
  });
});

const profileHref = computed(() => {
  if (!user.value?.handle) return '/settings';
  return `/profile/${encodeURIComponent(user.value.handle.replace(/^@/, ''))}`;
});

const label = computed(() => user.value?.displayName ?? user.value?.handle ?? user.value?.did ?? 'U');
</script>

<template>
  <section v-if="user" class="grid gap-4 md:grid-cols-2">
    <a href="/settings" class="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]">
      <p class="text-lg font-semibold text-[var(--text)]">Set pronouns and names</p>
      <p class="mt-1 text-sm text-[var(--muted)]">Update your profile entries and preferred options.</p>
    </a>
    <a :href="profileHref" class="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]">
      <div class="flex items-center gap-3">
        <span v-if="user.avatar" class="h-12 w-12 rounded-full border border-[var(--border)] bg-cover bg-center" :style="{ backgroundImage: `url(${user.avatar})` }" role="img" :aria-label="label" />
        <span v-else class="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-lg font-semibold text-[var(--text)]">{{ label.slice(0,1).toUpperCase() }}</span>
        <span class="min-w-0">
          <p class="truncate text-lg font-semibold text-[var(--text)]">{{ user.displayName ?? user.handle ?? user.did }}</p>
          <p class="truncate text-sm text-[var(--muted)]">@{{ user.handle ?? user.did }}</p>
        </span>
      </div>
      <p class="mt-2 text-sm text-[var(--muted)]">View your profile</p>
    </a>
  </section>
</template>
