<script setup lang="ts">
const { theme, setTheme, THEMES } = useTheme();

// Writable computed so v-model on <select> correctly reads AND writes the
// shared useState ref via setTheme (which also updates localStorage + DOM).
const themeModel = computed({
  get: () => theme.value,
  set: (val: string) => setTheme(val as "light" | "dark" | "black"),
});
</script>

<template>
  <label class="text-sm text-[var(--muted)]">
    <span class="sr-only">Theme</span>
    <select
      v-model="themeModel"
      class="min-h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm capitalize text-[var(--text)]"
    >
      <option v-for="t in THEMES" :key="t" :value="t">{{ t }}</option>
    </select>
  </label>
</template>
