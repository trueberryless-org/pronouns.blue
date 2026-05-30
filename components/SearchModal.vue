<script setup lang="ts">
interface Suggestion {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
}

const open = ref(false);
const query = ref('');
const suggestions = ref<Suggestion[]>([]);
const loading = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const normalizedQuery = computed(() => query.value.trim());

onMounted(() => {
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      open.value = true;
    }
  });
});

watch(open, (val) => {
  if (val) requestAnimationFrame(() => inputRef.value?.focus());
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

function closeModal() {
  open.value = false;
  query.value = '';
  suggestions.value = [];
}

function openHandle(handle: string) {
  closeModal();
  window.location.href = `/profile/${handle}`;
}
</script>

<template>
  <button
    type="button"
    @click="open = true"
    aria-label="Search handles (Ctrl+K)"
    class="flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 text-[var(--muted)] outline-none transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
  >
    <svg viewBox="0 0 24 24" class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
    <span class="hidden text-sm sm:inline">Search…</span>
    <kbd class="hidden items-center gap-0.5 rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] leading-none lg:inline-flex"><span class="text-xs">⌘</span>K</kbd>
  </button>

  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[15vh] backdrop-blur-sm"
      @click.self="closeModal"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div class="mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
        <div class="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            ref="inputRef"
            v-model="query"
            @keydown.enter="normalizedQuery && openHandle(normalizedQuery)"
            @keydown.escape="closeModal"
            placeholder="Search handle…"
            class="flex-1 bg-transparent text-base text-[var(--text)] placeholder-[var(--muted)] outline-none"
          />
          <kbd class="inline-flex h-6 items-center rounded border border-[var(--border)] px-1.5 font-mono text-xs text-[var(--muted)]">esc</kbd>
        </div>

        <div v-if="loading || suggestions.length > 0 || normalizedQuery" class="max-h-72 overflow-auto p-2">
          <p v-if="loading" class="px-3 py-2 text-sm text-[var(--muted)]">Searching…</p>
          <p v-else-if="suggestions.length === 0" class="px-3 py-2 text-sm text-[var(--muted)]">No results for "{{ normalizedQuery }}"</p>
          <ul v-else>
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
    </div>
  </Teleport>
</template>
