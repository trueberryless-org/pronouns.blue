<script setup lang="ts">
import { setResponseHeader } from "h3";
import { getActorProfile } from "~/lib/atproto/profiles";
import { getProfileRecordsFromPds } from "~/lib/atproto/records";

const route = useRoute();
const handle = decodeURIComponent(String(route.params.handle ?? "")).replace(
  /^@/,
  "",
);

const { data, error } = await useAsyncData(`profile-${handle}`, async () => {
  const actor = await getActorProfile(handle);
  if (!actor) return null;

  const profile = await getProfileRecordsFromPds(actor.did);

  const followsRes = (await fetch(
    `https://public.api.bsky.app/xrpc/app.bsky.graph.getFollows?actor=${encodeURIComponent(actor.did)}&limit=48`,
  ).then((r) => (r.ok ? r.json() : { follows: [], cursor: undefined }))) as {
    follows: {
      did: string;
      handle: string;
      displayName?: string;
      avatar?: string;
    }[];
    cursor?: string;
  };

  return {
    actor,
    groups: profile.groups,
    initialFollows: followsRes.follows.map((f) => ({
      did: f.did,
      handle: f.handle,
      displayName: f.displayName ?? null,
      avatar: f.avatar ?? null,
    })),
    initialCursor: followsRes.cursor,
  };
});

// 404 if actor not found
if (!data.value || error.value) {
  throw createError({ statusCode: 404, statusMessage: "Profile not found" });
}

const { actor, groups, initialFollows, initialCursor } = data.value;

// Set CDN cache headers
const event = useRequestEvent();
if (event) {
  setResponseHeader(
    event,
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400",
  );
}

useHead({
  title: `@${actor.handle} – pronouns.blue`,
  meta: [
    {
      name: "description",
      content: `View @${actor.handle}'s preferred names and pronouns on pronouns.blue`,
    },
    { property: "og:title", content: `@${actor.handle} – pronouns.blue` },
    {
      property: "og:description",
      content: `View @${actor.handle}'s preferred names and pronouns on pronouns.blue`,
    },
    { property: "og:image", content: `/og/profile/${actor.handle}.png` },
  ],
});

const title = actor.displayName ?? actor.handle;
</script>

<template>
  <div>
    <ProfileDisplay
      :title="title"
      :handle="actor.handle"
      :avatar="actor.avatar ?? null"
      :groups="groups"
      :bsky-fallback-pronouns="actor.pronouns"
      :profile-did="actor.did"
    />

    <section
      v-if="initialFollows.length > 0"
      class="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6"
    >
      <div class="border-t border-[var(--border)] pt-10">
        <h2 class="mb-1 text-lg font-semibold text-[var(--text)]">
          More to explore
        </h2>
        <p class="mb-6 text-sm text-[var(--muted)]">
          People {{ title }} follows on Bluesky
        </p>
        <FollowsGrid
          :initial-follows="initialFollows"
          :initial-cursor="initialCursor"
          :did="actor.did"
        />
      </div>
    </section>

    <FloatingProfileBack :title="title" :avatar="actor.avatar ?? null" />
  </div>
</template>
