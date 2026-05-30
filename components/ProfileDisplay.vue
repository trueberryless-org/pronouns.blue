<script setup lang="ts">
import type { LanguageGroup } from '~/lib/atproto/records';

const props = defineProps<{
  title: string;
  handle: string;
  avatar: string | null;
  groups: LanguageGroup[];
  bskyFallbackPronouns?: string | null;
  profileDid?: string;
}>();

const LANG_NAMES = new Intl.DisplayNames(['en'], { type: 'language' });
function langLabel(tag: string): string {
  try { return LANG_NAMES.of(tag) ?? tag; } catch { return tag; }
}

const activeGroups = computed(() => props.groups.filter(g => g.names.length > 0 || g.pronouns.length > 0));
const hasAny = computed(() => activeGroups.value.length > 0);
const hasBskyPronouns = computed(() => !hasAny.value && !!props.bskyFallbackPronouns);
const showLangLabels = computed(() => activeGroups.value.length > 1);
</script>

<template>
  <main class="mx-auto w-full max-w-3xl flex-1 min-h-screen px-4 pt-12 pb-16 sm:pt-16">
    <section class="w-full py-4">
      <ProfileEditButton v-if="profileDid" :profile-did="profileDid" />

      <div class="mb-8 flex flex-col items-center text-center">
        <!-- Avatar -->
        <div v-if="avatar" class="h-24 w-24 rounded-full border border-[var(--border)] bg-cover bg-center" :style="{ backgroundImage: `url(${avatar})` }" role="img" :aria-label="title" />
        <div v-else class="flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-3xl font-semibold text-[var(--text)]">{{ title.slice(0,1).toUpperCase() }}</div>

        <h1 class="mt-4 text-3xl font-bold text-[var(--text)]">{{ title }}</h1>
        <p class="mt-1 flex items-center gap-2 text-base text-[var(--muted)]">
          <span>@{{ handle }}</span>
          <a :href="`https://bsky.app/profile/${handle}`" target="_blank" rel="noopener noreferrer" aria-label="View on Bluesky" title="View on Bluesky" class="translate-y-0.3 text-[var(--muted)] transition-colors hover:text-[var(--accent)]">
            <svg role="img" viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026" /></svg>
          </a>
        </p>
      </div>

      <!-- Groups -->
      <div v-if="hasAny" class="space-y-8">
        <div v-for="group in activeGroups" :key="group.lang" class="space-y-4">
          <!-- Language label -->
          <div v-if="showLangLabels" class="flex items-center gap-2">
            <span class="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs font-medium text-[var(--muted)]">{{ langLabel(group.lang) }}</span>
            <div class="h-px flex-1 bg-[var(--line)]" />
          </div>
          <div :class="['grid gap-6', group.names.length > 0 && group.pronouns.length > 0 ? 'md:grid-cols-2' : '']">
            <!-- Names column -->
            <div v-if="group.names.length > 0">
              <div class="mb-3 flex items-center gap-2">
                <h2 class="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">Names</h2>
              </div>
              <ul>
                <li v-for="item in group.names" :key="item" class="flex items-center justify-between border-b border-[var(--line)] py-2 text-base text-[var(--text)]">
                  <span>{{ item }}</span>
                  <span v-if="group.preferredNames.includes(item)" title="Preferred">
                    <HeartIcon :filled="true" class="h-5 w-5 text-[var(--danger)]" />
                  </span>
                </li>
              </ul>
            </div>
            <!-- Pronouns column -->
            <div v-if="group.pronouns.length > 0">
              <div class="mb-3 flex items-center gap-2">
                <h2 class="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">Pronouns</h2>
              </div>
              <ul>
                <li v-for="item in group.pronouns" :key="item" class="flex items-center justify-between border-b border-[var(--line)] py-2 text-base text-[var(--text)]">
                  <span>{{ item }}</span>
                  <span v-if="group.preferredPronouns.includes(item)" title="Preferred">
                    <HeartIcon :filled="true" class="h-5 w-5 text-[var(--danger)]" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Bluesky fallback pronouns -->
      <div v-else-if="hasBskyPronouns" class="grid gap-6">
        <div>
          <div class="mb-3 flex items-center gap-2">
            <h2 class="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">Pronouns</h2>
            <span class="flex items-center gap-1 rounded-full border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-[var(--muted)]">
              <svg role="img" viewBox="0 0 24 24" class="h-2.5 w-2.5" fill="currentColor" aria-hidden="true"><path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026" /></svg>
              from Bluesky
            </span>
          </div>
          <ul>
            <li class="flex items-center justify-between border-b border-[var(--line)] py-2 text-base text-[var(--text)]">{{ bskyFallbackPronouns }}</li>
          </ul>
        </div>
      </div>

      <!-- Empty state -->
      <p v-else class="text-center text-[var(--muted)]">This user hasn't set any names or pronouns yet.</p>
    </section>
  </main>
</template>
