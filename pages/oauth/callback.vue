<script setup lang="ts">
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const { finishLogin } = await import("~/lib/auth/oauth.client");
    const did = await finishLogin(
      new URLSearchParams(window.location.hash.slice(1)),
    );
    history.replaceState(null, "", window.location.pathname);
    useState<string | null>("auth-did").value = did;
    await navigateTo("/settings", { replace: true });
  } catch (cause) {
    history.replaceState(null, "", window.location.pathname);
    error.value =
      cause instanceof Error ? cause.message : "Unable to complete login";
  }
});
</script>

<template>
  <main class="mx-auto w-full max-w-xl px-4 pb-8 sm:px-6">
    <section
      class="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center"
    >
      <p v-if="!error" class="text-[var(--text)]">Completing sign-in…</p>
      <template v-else>
        <h1 class="text-xl font-semibold text-[var(--text)]">Sign-in failed</h1>
        <p class="mt-2 text-sm text-[var(--danger)]">{{ error }}</p>
        <NuxtLink
          to="/"
          class="mt-5 inline-flex rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)]"
        >
          Return home
        </NuxtLink>
      </template>
    </section>
  </main>
</template>
