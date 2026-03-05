<script setup lang="ts">
const { el: headerRef, revealed: headerRevealed } = useReveal()

const serviceIcons = ['home', 'layout', 'zap', 'tool', 'grid', 'clock', 'tiles', 'floor', 'door', 'file', 'cloud', 'sun', 'star']
</script>

<template>
  <section id="services" class="services">
    <div class="container">
      <div ref="headerRef" class="section-header section-reveal" :class="{ revealed: headerRevealed }">
        <p class="section-label">{{ $t('services.label') }}</p>
        <h2 class="section-title">{{ $t('services.title1') }}<br>{{ $t('services.title2') }}</h2>
      </div>
      <div class="services__grid">
        <RevealCard v-for="(icon, i) in serviceIcons" :key="i" class="service-card" :delay="i * 0.05">
          <div class="service-card__icon">
            <ServiceIcon :name="icon" />
          </div>
          <h3 class="service-card__title">{{ $t(`services.items[${i}].title`) }}</h3>
          <p class="service-card__desc">{{ $t(`services.items[${i}].desc`) }}</p>
        </RevealCard>
      </div>
    </div>
  </section>
</template>
