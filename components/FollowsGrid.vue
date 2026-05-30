<script setup lang="ts">
interface ActorProfile {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
}

const props = defineProps<{
  initialFollows: ActorProfile[];
  initialCursor?: string;
  did: string;
}>();

const PAGE_LIMIT = 48;
const SKELETON_COUNT = 12;

const follows = ref<ActorProfile[]>(props.initialFollows);
const hasMore = ref(Boolean(props.initialCursor));
const loading = ref(false);
const cursor = ref<string | undefined>(props.initialCursor);
const retryAfter = ref(0);
const sentinelRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const sentinel = sentinelRef.value;
  if (!sentinel) return;

  const observer = new IntersectionObserver(
    async (entries) => {
      if (!entries[0].isIntersecting || loading.value || !cursor.value) return;
      if (Date.now() < retryAfter.value) return;

      loading.value = true;
      try {
        const params = new URLSearchParams({
          actor: props.did,
          cursor: cursor.value,
          limit: String(PAGE_LIMIT),
        });
        const res = await fetch(
          `https://public.api.bsky.app/xrpc/app.bsky.graph.getFollows?${params}`,
        );
        if (!res.ok) {
          retryAfter.value = Date.now() + 3000;
          return;
        }
        const data = (await res.json()) as {
          follows: {
            did: string;
            handle: string;
            displayName?: string;
            avatar?: string;
          }[];
          cursor?: string;
        };
        follows.value = [
          ...follows.value,
          ...data.follows.map((f) => ({
            did: f.did,
            handle: f.handle,
            displayName: f.displayName ?? null,
            avatar: f.avatar ?? null,
          })),
        ];
        cursor.value = data.cursor;
        hasMore.value = Boolean(data.cursor);
      } catch {
        retryAfter.value = Date.now() + 3000;
      } finally {
        loading.value = false;
      }
    },
    { rootMargin: "400px" },
  );

  observer.observe(sentinel);
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      <NuxtLink
        v-for="actor in follows"
        :key="actor.did"
        :to="`/profile/${encodeURIComponent(actor.handle)}`"
        class="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center transition-colors hover:border-[var(--accent)]"
      >
        <div
          v-if="actor.avatar"
          class="h-12 w-12 flex-shrink-0 rounded-full border border-[var(--border)] bg-cover bg-center"
          :style="{ backgroundImage: `url(${actor.avatar})` }"
          role="img"
          :aria-label="actor.displayName ?? actor.handle"
        />
        <div
          v-else
          class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-lg font-semibold text-[var(--text)]"
        >
          {{ (actor.displayName ?? actor.handle).slice(0, 1).toUpperCase() }}
        </div>
        <div class="min-w-0 w-full">
          <p
            class="truncate text-sm font-medium text-[var(--text)] transition-colors group-hover:text-[var(--accent)]"
          >
            {{ actor.displayName ?? actor.handle }}
          </p>
          <p class="truncate text-xs text-[var(--muted)]">
            @{{ actor.handle }}
          </p>
        </div>
      </NuxtLink>
      <template v-if="loading">
        <div
          v-for="i in SKELETON_COUNT"
          :key="i"
          class="flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
        >
          <div
            class="h-12 w-12 animate-pulse rounded-full bg-[var(--surface-strong)]"
          />
          <div class="w-full space-y-1.5">
            <div class="h-3 animate-pulse rounded bg-[var(--surface-strong)]" />
            <div
              class="mx-auto h-3 w-3/4 animate-pulse rounded bg-[var(--surface-strong)]"
            />
          </div>
        </div>
      </template>
    </div>
    <div v-if="hasMore" ref="sentinelRef" class="mt-8 h-px" />
    <p
      v-if="!hasMore && follows.length > 0"
      class="mt-8 text-center text-xs text-[var(--muted)]"
    >
      All caught up ✓
    </p>
  </div>
</template>
