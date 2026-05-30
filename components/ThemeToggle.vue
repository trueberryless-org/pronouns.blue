<script setup lang="ts">
const { theme, setTheme, THEMES } = useTheme();
</script>

<template>
  <label class="text-sm text-[var(--muted)]">
    <span class="sr-only">Theme</span>
    <select
      :value="theme"
      @change="(e) => setTheme((e.target as HTMLSelectElement).value as 'light' | 'dark' | 'black')"
      class="min-h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm capitalize text-[var(--text)]"
    >
      <option v-for="t in THEMES" :key="t" :value="t">{{ t }}</option>
    </select>
  </label>
</template>
