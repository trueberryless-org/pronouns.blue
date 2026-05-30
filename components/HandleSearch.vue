<script setup lang="ts">
interface Suggestion {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
}

const query = ref('');
const suggestions = ref<Suggestion[]>([]);
const loading = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const normalizedQuery = computed(() => query.value.trim());

onMounted(() => {
  function handleMouseDown(e: MouseEvent) {
    if (containerRef.value && !containerRef.value.contains(e.target as Node)) suggestions.value = [];
  }
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') suggestions.value = [];
  }
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('keydown', handleKeyDown);
  onUnmounted(() => {
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('keydown', handleKeyDown);
  });
});

let searchTimeout: ReturnType<typeof setTimeout> | undefined;
let controller: AbortController | undefined;

watch(normalizedQuery, (q) => {
  clearTimeout(searchTimeout);
  controller?.abort();
  if (!q) { suggestions.value = []; return; }
  controller = new AbortController();
  searchTimeout = setTimeout(async () => {
    loading.value = true;
    try {
      const r = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.actor.searchActors?q=${encodeURIComponent(q)}&limit=8`, { signal: controller!.signal });
      if (!r.ok) return;
      const data = await r.json() as { actors?: { did: string; handle: string; displayName?: string; avatar?: string }[] };
      suggestions.value = (data.actors ?? []).map(a => ({ did: a.did, handle: a.handle, displayName: a.displayName ?? null, avatar: a.avatar ?? null }));
    } catch { suggestions.value = []; }
    finally { loading.value = false; }
  }, 120);
});

function openHandle(handle: string) {
  window.location.href = `/profile/${handle}`;
}
</script>

<template>
  <div class="relative mx-auto w-full max-w-2xl" ref="containerRef">
    <input
      v-model="query"
      @keydown.enter="normalizedQuery && openHandle(normalizedQuery)"
      placeholder="Search handle (for example: trueberryless.org)"
      class="min-h-14 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-lg text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
    />
    <div v-if="loading || suggestions.length > 0" class="absolute left-0 right-0 top-16 z-20 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg">
      <p v-if="loading" class="px-3 py-2 text-sm text-[var(--muted)]">Searching…</p>
      <ul v-else class="max-h-72 overflow-auto">
        <li v-for="s in suggestions" :key="s.did">
          <button type="button" @click="openHandle(s.handle)" class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-[var(--surface-strong)]">
            <img v-if="s.avatar" :src="s.avatar" alt="" loading="lazy" width="36" height="36" class="size-9 shrink-0 rounded-full object-cover" />
            <span v-else class="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-strong)] text-sm font-semibold text-[var(--text)]">{{ (s.displayName ?? s.handle).charAt(0).toUpperCase() }}</span>
            <span class="flex min-w-0 flex-col">
              <span class="truncate text-sm font-medium text-[var(--text)]">{{ s.displayName ?? s.handle }}</span>
              <span class="truncate text-xs text-[var(--muted)]">@{{ s.handle }}</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
