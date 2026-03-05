<script setup lang="ts">
const { locale, t } = useI18n()

useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
  title: () => t('seo.title'),
  meta: [
    { name: 'description', content: () => t('seo.description') },
    { property: 'og:title', content: () => t('seo.ogTitle') },
    { property: 'og:description', content: () => t('seo.ogDescription') },
  ],
})
</script>

<template>
  <NuxtPage />
</template>
