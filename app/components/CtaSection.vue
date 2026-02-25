<script setup lang="ts">
const { el: ctaRef, revealed: ctaRevealed } = useReveal({ threshold: 0.2 })
</script>

<template>
  <section class="cta">
    <div class="container">
      <div ref="ctaRef" class="cta__inner cta-reveal" :class="{ revealed: ctaRevealed }">
        <h2 class="cta__title">Готовы начать ремонт?</h2>
        <p class="cta__desc">Свяжитесь с нами для бесплатной консультации и расчёта стоимости</p>
        <div class="cta__actions">
          <a href="tel:+995595067420" class="btn btn--primary btn--lg">Позвонить</a>
          <a href="https://wa.me/995595067420" class="btn btn--outline btn--lg" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </div>
  </section>
</template>
