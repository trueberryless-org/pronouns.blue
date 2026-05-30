<script setup lang="ts">
const route = useRoute();
const showLogo = computed(() => route.path !== '/');
</script>

<template>
  <a v-if="showLogo" href="/" class="flex items-center">
    <img
      src="/pronouns.blue.png"
      alt="pronouns.blue"
      width="966"
      height="396"
      class="h-14 w-auto"
      loading="eager"
      style="view-transition-name: site-logo"
    />
  </a>
</template>
