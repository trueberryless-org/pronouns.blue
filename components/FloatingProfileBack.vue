<script setup lang="ts">
const props = defineProps<{ title: string; avatar: string | null }>();
const visible = ref(false);

onMounted(() => {
  function onScroll() { visible.value = window.scrollY > window.innerHeight * 0.65; }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  onUnmounted(() => window.removeEventListener('scroll', onScroll));
});
</script>

<template>
  <div
    :aria-hidden="!visible"
    :class="['fixed bottom-6 right-6 z-30 flex overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-lg shadow-black/10 transition-all duration-300', visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0']"
  >
    <button type="button" @click="window.scrollTo({ top: 0, behavior: 'smooth' })" :title="`Back to ${props.title}'s profile`" :aria-label="`Scroll back to ${props.title}'s profile`" class="flex items-center gap-2 py-2 pl-2 pr-3 transition-colors hover:bg-[var(--surface-strong)]">
      <span v-if="props.avatar" class="h-8 w-8 flex-shrink-0 rounded-full border border-[var(--border)] bg-cover bg-center" :style="{ backgroundImage: `url(${props.avatar})` }" role="img" :aria-label="props.title" />
      <span v-else class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-sm font-semibold text-[var(--text)]">{{ props.title.slice(0,1).toUpperCase() }}</span>
      <span class="max-w-28 truncate text-sm font-medium text-[var(--text)]">{{ props.title }}</span>
      <span class="text-[var(--muted)]">
        <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6" /></svg>
      </span>
    </button>
    <div class="my-2 w-px bg-[var(--border)]" />
    <button type="button" @click="window.history.back()" title="Go back" aria-label="Go back to previous page" class="flex items-center px-3 text-[var(--muted)] transition-colors hover:bg-[var(--surface-strong)] hover:text-[var(--text)]">
      <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
    </button>
  </div>
</template>
