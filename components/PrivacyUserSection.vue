<script setup lang="ts">
const { did } = useAuth();
const pronounHref = computed(() => `https://pdsls.dev/at://${did.value}/blue.pronouns.pronoun`);
const nameHref = computed(() => `https://pdsls.dev/at://${did.value}/blue.pronouns.name`);
</script>

<template>
  <section v-if="did" class="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
    <h2 class="mb-3 text-xl font-semibold text-[var(--text)]">View your records in PDSLS</h2>
    <p class="text-[var(--muted)]">Since you are signed in, you can inspect your published lexicon records directly in <a href="https://pdsls.dev" target="_blank" rel="noopener noreferrer" class="text-[var(--accent)] underline underline-offset-4">PDSLS</a>.</p>
    <div class="mt-4 flex flex-wrap gap-2">
      <a :href="pronounHref" target="_blank" rel="noopener noreferrer" class="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]">blue.pronouns.pronoun</a>
      <a :href="nameHref" target="_blank" rel="noopener noreferrer" class="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]">blue.pronouns.name</a>
    </div>
  </section>
</template>
