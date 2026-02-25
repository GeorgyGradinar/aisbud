<script setup lang="ts">
const { isLight, init } = useTheme()

onMounted(() => {
  init()
})
</script>

<template>
  <div :class="{ light: isLight }">
    <AppHeader />
    <HeroSection />
    <ServicesSection />
    <StagesSection />
    <VideosSection />
    <PortfolioSection />
    <AboutSection />
    <CtaSection />
    <AppFooter />
  </div>
</template>
