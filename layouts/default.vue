<script setup lang="ts">
const themeScript = `(()=>{try{const k="pronounsblue-theme";const s=localStorage.getItem(k);document.documentElement.setAttribute("data-theme",s||"dark")}catch{document.documentElement.setAttribute("data-theme","dark")}})();`;
useHead({
  htmlAttrs: { lang: 'en', 'data-theme': 'dark' },
  script: [{ innerHTML: themeScript, tagPosition: 'head' }],
});
const { initTheme } = useTheme();
onMounted(initTheme);
</script>

<template>
  <div class="flex min-h-screen flex-col antialiased">
    <AppNav />
    <main class="flex flex-1 flex-col">
      <slot />
    </main>
    <footer class="border-t border-[var(--border)] py-4 text-center text-xs text-[var(--muted)]">
      <nav class="flex flex-wrap justify-center gap-x-5 gap-y-1">
        <a href="/privacy" class="hover:text-[var(--text)]">Privacy Policy</a>
        <a href="/terms" class="hover:text-[var(--text)]">Terms of Service</a>
        <a href="/credits" class="hover:text-[var(--text)]">Credits</a>
        <a href="https://github.com/trueberryless-org/pronouns.blue" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--text)]">GitHub</a>
      </nav>
    </footer>
  </div>
</template>
