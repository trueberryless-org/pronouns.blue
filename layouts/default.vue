<script setup lang="ts">
const themeScript = `(()=>{try{const k="pronounsblue-theme";const s=localStorage.getItem(k);document.documentElement.setAttribute("data-theme",s||"dark")}catch{document.documentElement.setAttribute("data-theme","dark")}})();`;

const { theme } = useTheme();

// Reactive head: data-theme tracks theme.value so navigation never resets it to a
// stale 'dark' default. The inline script ensures the correct theme is applied on
// first paint (before Vue hydrates) to avoid FOUC.
useHead(
  computed(() => ({
    htmlAttrs: { lang: "en", "data-theme": theme.value },
    script: [{ innerHTML: themeScript, tagPosition: "head" as const }],
  })),
);
</script>

<template>
  <div class="flex min-h-screen flex-col antialiased">
    <AppNav />
    <main class="flex flex-1 flex-col">
      <slot />
    </main>
    <footer
      class="border-t border-[var(--border)] py-4 text-center text-xs text-[var(--muted)]"
    >
      <nav class="flex flex-wrap justify-center gap-x-5 gap-y-1">
        <NuxtLink to="/privacy" class="hover:text-[var(--text)]"
          >Privacy Policy</NuxtLink
        >
        <NuxtLink to="/terms" class="hover:text-[var(--text)]"
          >Terms of Service</NuxtLink
        >
        <NuxtLink to="/credits" class="hover:text-[var(--text)]"
          >Credits</NuxtLink
        >
        <a
          href="https://github.com/trueberryless-org/pronouns.blue"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-[var(--text)]"
          >GitHub</a
        >
      </nav>
    </footer>
  </div>
</template>
