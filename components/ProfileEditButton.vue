<script setup lang="ts">
const props = defineProps<{ profileDid: string }>();
const { did } = useAuth();
const isOwner = computed(() => did.value?.toLowerCase() === props.profileDid.toLowerCase());
</script>

<template>
  <div v-if="isOwner" class="mb-4 flex justify-end">
    <NuxtLink to="/settings" class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]" aria-label="Edit your names and pronouns" title="Edit profile">
      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
    </NuxtLink>
  </div>
</template>
