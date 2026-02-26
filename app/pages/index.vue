<script setup lang="ts">
const { isLight, init } = useTheme()

onMounted(() => {
  init()
})
</script>

<template>
  <div>
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
