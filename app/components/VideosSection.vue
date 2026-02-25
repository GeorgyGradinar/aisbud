<script setup lang="ts">
const { el: headerRef, revealed: headerRevealed } = useReveal()

const videos = [
  { id: 'mMTzNIOKAJk', title: 'Итоги 2025г', desc: 'Подводим итоги года: проекты, команда и планы на будущее' },
  { id: '9l7MFmcqzm0', title: 'Подкаст №1', desc: 'Первый выпуск: о ремонте, материалах и жизни в Грузии' },
]
</script>

<template>
  <section id="videos" class="videos">
    <div class="container">
      <div ref="headerRef" class="section-header section-reveal" :class="{ revealed: headerRevealed }">
        <p class="section-label">03 / Подкасты</p>
        <h2 class="section-title">Подкасты</h2>
      </div>
      <div class="videos__grid">
        <RevealCard v-for="(video, i) in videos" :key="video.id" class="video-card" :delay="i * 0.15">
          <div class="video-card__wrapper">
            <iframe
              class="video-card__iframe"
              :src="`https://www.youtube.com/embed/${video.id}`"
              :title="video.title"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            />
          </div>
          <div class="video-card__info">
            <span class="video-card__tag">Подкаст</span>
            <h3 class="video-card__title">{{ video.title }}</h3>
            <p class="video-card__desc">{{ video.desc }}</p>
          </div>
        </RevealCard>
      </div>
    </div>
  </section>
</template>
