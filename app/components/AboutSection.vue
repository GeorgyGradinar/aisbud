<script setup lang="ts">
const { el: headerRef, revealed: headerRevealed } = useReveal()
const { el: imageRef, revealed: imageRevealed } = useReveal()
const { el: textRef, revealed: textRevealed } = useReveal()
const { el: statsRef, revealed: statsRevealed } = useReveal({ threshold: 0.3 })

const stats = [
  { end: 3, suffix: '+', label: 'лет опыта' },
  { end: 50, suffix: '+', label: 'проектов' },
  { end: 100, suffix: '%', label: 'гарантия' },
]

const counters = ref(stats.map(() => 0))

watch(statsRevealed, (isRevealed) => {
  if (!isRevealed) return
  stats.forEach((stat, i) => {
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
            <p class="section-label">05 / О нас</p>
            <h2 class="section-title">Больше 3 лет<br>работы в Грузии</h2>
          </div>
          <div ref="imageRef" class="about__image image-reveal" :class="{ revealed: imageRevealed }">
            <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=700&q=80" alt="Команда AisBud за работой" loading="lazy">
          </div>
        </div>
        <div class="about__right">
          <div ref="textRef" class="section-reveal" :class="{ revealed: textRevealed }" style="transition-delay: 0.15s">
            <p class="about__text">
              Мы работаем в Грузии уже более 3 лет. За это время нашли качественные
              материалы, у нас появились надёжные партнёры и сформировали команду
              опытных профессионалов.
            </p>
            <p class="about__text">
              Мы работаем, чтобы ремонт становился прозрачным и понятным процессом,
              а результат радовал вас и оставался в памяти как приятное
              и увлекательное событие.
            </p>
          </div>
          <div ref="statsRef" class="about__stats">
            <div
              v-for="(stat, i) in stats"
              :key="i"
              class="stat section-reveal"
              :class="{ revealed: statsRevealed }"
              :style="{ transitionDelay: `${i * 0.12}s` }"
            >
              <span class="stat__number">{{ counters[i] }}{{ stat.suffix }}</span>
              <span class="stat__label">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
