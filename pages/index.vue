<script setup lang="ts">
useHead({
  title: "pronouns.blue",
  meta: [{ property: "og:image", content: "/og/index.png" }],
});
</script>

<template>
  <div class="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
    <main class="space-y-8">
      <div class="flex justify-center pb-2">
        <img
          src="/pronouns.blue.png"
          alt="pronouns.blue"
          width="966"
          height="396"
          class="h-auto w-auto max-h-60 max-w-full"
          loading="eager"
          style="view-transition-name: site-logo"
        />
      </div>
      <HomeUserSection />
      <section
        class="space-y-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center"
      >
        <p class="text-lg text-[var(--muted)]">
          Find any user by handle and view their names and pronouns.
        </p>
        <HandleSearch />
      </section>
    </main>
  </div>
</template>
