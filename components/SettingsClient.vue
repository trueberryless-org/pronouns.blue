<script setup lang="ts">
import { fetchActorProfile, fetchProfileRecords, type ClientActorProfile } from '~/lib/atproto/client-api';
import type { LanguageGroup } from '~/lib/atproto/records';

const { did } = useAuth();
const actor = ref<ClientActorProfile | null | undefined>(undefined);
const groups = ref<LanguageGroup[] | null>(null);

onMounted(() => {
  watchEffect(async () => {
    const d = did.value;
    if (d === null) { window.location.replace('/'); return; }
    if (!d) return; // still loading

    try {
      const [actorData, profileData] = await Promise.all([fetchActorProfile(d), fetchProfileRecords(d)]);
      actor.value = actorData;
      groups.value = profileData.groups;
    } catch {
      actor.value = null;
      groups.value = [];
    }
  });
});

const normalizedHandle = computed(() => actor.value?.handle?.replace(/^@/, ''));
const profileHref = computed(() => normalizedHandle.value ? `/profile/${encodeURIComponent(normalizedHandle.value)}` : null);
const isFirstTime = computed(() => !groups.value || groups.value.length === 0 || groups.value.every(g => g.names.length === 0 && g.pronouns.length === 0));
</script>

<template>
  <!-- Skeleton while loading -->
  <main v-if="did === null || actor === undefined || groups === null" class="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
    <section class="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div class="h-8 w-48 animate-pulse rounded-md bg-[var(--surface-strong)]" />
      <div class="h-4 w-64 animate-pulse rounded-md bg-[var(--surface-strong)]" />
      <div class="h-64 animate-pulse rounded-2xl bg-[var(--surface-strong)]" />
    </section>
  </main>

  <main v-else class="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
    <section class="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 class="text-2xl font-semibold text-[var(--text)]">{{ isFirstTime ? 'Set up your profile' : 'Settings' }}</h1>
          <p class="text-sm text-[var(--muted)]">{{ isFirstTime ? 'Add your names and pronouns to get started.' : 'Update your names and pronouns.' }}</p>
        </div>
        <a v-if="profileHref" :href="profileHref" class="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>
          Show profile
        </a>
      </div>
      <ProfileEditor :initial-groups="groups!" :is-first-time="isFirstTime" :profile-href="profileHref ?? undefined" />
    </section>
  </main>
</template>
