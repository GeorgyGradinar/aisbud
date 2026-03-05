<script setup lang="ts">
const { el: headerRef, revealed: headerRevealed } = useReveal()
const { el: imageRef, revealed: imageRevealed } = useReveal()
const { el: textRef, revealed: textRevealed } = useReveal()
const { el: statsRef, revealed: statsRevealed } = useReveal({ threshold: 0.3 })

const statDefs = [
  { end: 3, suffix: '+', labelKey: 'about.stats.years' },
  { end: 50, suffix: '+', labelKey: 'about.stats.projects' },
  { end: 100, suffix: '%', labelKey: 'about.stats.guarantee' },
]

const counters = ref([0, 0, 0])

watch(statsRevealed, (isRevealed) => {
  if (!isRevealed) return
  statDefs.forEach((stat, i) => {
    const duration = 1800
    const start = performance.now()
    function animate(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      counters.value[i] = Math.round(eased * stat.end)
      if (progress < 1) requestAnimationFrame(animate)
    }
    setTimeout(() => requestAnimationFrame(animate), i * 200)
  })
})
</script>

<template>
  <section id="about" class="about">
    <div class="container">
      <div class="about__inner">
        <div class="about__left">
          <div ref="headerRef" class="section-reveal" :class="{ revealed: headerRevealed }">
            <p class="section-label">{{ $t('about.label') }}</p>
            <h2 class="section-title">{{ $t('about.title1') }}<br>{{ $t('about.title2') }}</h2>
          </div>
          <div ref="imageRef" class="about__image image-reveal" :class="{ revealed: imageRevealed }">
            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80" :alt="$t('about.imageAlt')" loading="lazy">
          </div>
        </div>
        <div class="about__right">
          <div ref="textRef" class="section-reveal" :class="{ revealed: textRevealed }" style="transition-delay: 0.15s">
            <p class="about__text">{{ $t('about.text1') }}</p>
            <p class="about__text">{{ $t('about.text2') }}</p>
          </div>
          <div ref="statsRef" class="about__stats">
            <div
              v-for="(stat, i) in statDefs"
              :key="i"
              class="stat section-reveal"
              :class="{ revealed: statsRevealed }"
              :style="{ transitionDelay: `${i * 0.12}s` }"
            >
              <span class="stat__number">{{ counters[i] }}{{ stat.suffix }}</span>
              <span class="stat__label">{{ $t(stat.labelKey) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
